#!/usr/bin/env python3
"""
South African NSC Exam Papers Scraper
=====================================
Scrapes past exam papers from official government sources (ecexams.co.za)
for educational use in edtech platforms.

Source: Eastern Cape Department of Education (www.ecexams.co.za)
These are official government exam papers freely available for educational purposes.

Usage:
    python scripts/scrape-sa-exams.py --output ./exam-papers
    python scripts/scrape-sa-exams.py --output ./exam-papers --years 2024,2023,2022
    python scripts/scrape-sa-exams.py --output ./exam-papers --grades 12 --dry-run
"""

import argparse
import json
import os
import re
import sys
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, unquote
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "http://www.ecexams.co.za/"

# Session index pages that list exam papers
EXAM_SESSIONS = {
    # Grade 12 NSC Exams - November (Final)
    "2024_november_gr12_nsc": "2024_November_Gr_12_NSC_DBE_Exams.htm",
    "2024_september_gr12_prep": "2024_September_Gr_12_Preparatory_Exams.htm",
    "2024_mayjune_gr12_nsc_dbe": "2024_MayJune_Gr_12_NSC_DBE_Exams.htm",
    "2024_mayjune_gr12_nsc_ec": "2024_MayJune_Gr_12_NSC_Eastern_Cape_Exams25.htm",
    
    "2023_november_gr12": "2023_November_Gr_12_Exams.htm",
    "2023_september_gr12_prep": "2023_September_Gr_12_Preparatory_Exams.htm",
    "2023_mayjune_gr12_nsc_dbe": "2023_MayJune_Gr_12_NSC_DBE_Exams.htm",
    "2023_june_gr12_common": "2023_June_Gr_12_Common_Exams.htm",
    
    "2022_november_nsc": "2022_November_NSC_Examinations.htm",
    "2022_mayjune_gr12_nsc_dbe": "2022_MayJune_Gr_12_NSC_DBE_Exams.htm",
    "2022_september_gr12_prep": "2022_September_Gr_12_Preparatory_Exams.htm",
    "2022_june_gr12_common": "2022_June_Gr_12_Common_Exams.htm",
    
    "2021_november_nsc": "2021_November_NSC_Exams.htm",
    "2021_june_nsc": "2021_June_NSC__Exams.htm",
    "2021_september_gr12_prep": "2021_September_Gr_12_Preparatory_Exams.htm",
    "2021_june_gr12_exemplars": "2021_Grade_12_June_Exemplars.htm",
    
    "2020_november_nsc": "2020_November_NSC_Exams.htm",
    "2020_september_gr12_prep": "2020_September_Gr_12_Preparatory_Exams.htm",
    
    "2019_november_nsc": "2019_November_NSC_Exams.htm",
    "2019_mayjune_nsc": "2019_MayJune_NSC_Exams.htm",
    "2019_september_gr12_prep": "2019_September_Gr_12_Preparatory_Exams.htm",
    "2019_june_gr12_common": "2019_June_Gr_12_Common_Exams.htm",
    
    "2018_november_nsc": "2018_November_NSC_Exams.htm",
    "2018_june_nsc": "2018_June_NSC_Exams.htm",
    "2018_september_gr12_prep": "2018_September_Gr_12_Preparatory_Exams.htm",
    "2018_febmarch_supplementary": "2018_FebMarch_Supplementary_Exams.htm",
    "2018_june_gr12": "2018_June_Gr_12_Exams.htm",
    "2018_exemplars_gr12": "2018_Exemplars_Gr_12.htm",
    
    "2017_november_nsc": "2017_November_NSC_Exams.htm",
    "2017_september_trial": "2017_September_Trial_Exams.htm",
    "2017_febmarch_supplementary": "2017_FebMarch_Supplementary_Exams.htm",
    "2017_june_gr12": "2017_June_Exams_Gr_12.htm",
    
    "2016_november_nsc": "2016_November_NSC_Exams.htm",
    "2016_september_trial": "2016_September_Trial_Exams.htm",
    "2016_june_gr12": "2016_June_Exams_Gr_12.htm",
    "2016_febmarch_supplementary": "2016_FebMarch_Supplementary_Exams.htm",
    
    "2015_november_nsc": "2015_November_NSC_Exams.htm",
}

# Subject normalization mapping
SUBJECT_MAPPINGS = {
    "accounting": "Accounting",
    "afrikaans": "Afrikaans",
    "agricultural management": "Agricultural Management Practices",
    "agricultural sciences": "Agricultural Sciences",
    "agricultural technology": "Agricultural Technology",
    "business studies": "Business Studies",
    "cat": "Computer Applications Technology",
    "computer applications technology": "Computer Applications Technology",
    "civil technology": "Civil Technology",
    "consumer studies": "Consumer Studies",
    "dance studies": "Dance Studies",
    "design": "Design",
    "dramatic arts": "Dramatic Arts",
    "economics": "Economics",
    "electrical technology": "Electrical Technology",
    "engineering graphics": "Engineering Graphics & Design",
    "egd": "Engineering Graphics & Design",
    "english": "English",
    "geography": "Geography",
    "history": "History",
    "hospitality studies": "Hospitality Studies",
    "information technology": "Information Technology",
    "it": "Information Technology",
    "life orientation": "Life Orientation",
    "lo": "Life Orientation",
    "life sciences": "Life Sciences",
    "mathematical literacy": "Mathematical Literacy",
    "maths lit": "Mathematical Literacy",
    "mathematics": "Mathematics",
    "maths": "Mathematics",
    "mechanical technology": "Mechanical Technology",
    "music": "Music",
    "physical sciences": "Physical Sciences",
    "physics": "Physical Sciences",
    "religion studies": "Religion Studies",
    "sepedi": "Sepedi",
    "sesotho": "Sesotho",
    "setswana": "Setswana",
    "siswati": "SiSwati",
    "technical mathematics": "Technical Mathematics",
    "technical sciences": "Technical Sciences",
    "tourism": "Tourism",
    "tshivenda": "Tshivenda",
    "visual arts": "Visual Arts",
    "xhosa": "IsiXhosa",
    "isixhosa": "IsiXhosa",
    "zulu": "IsiZulu",
    "isizulu": "IsiZulu",
    "ndebele": "IsiNdebele",
    "isindebele": "IsiNdebele",
    "xitsonga": "Xitsonga",
    "tsonga": "Xitsonga",
}


@dataclass
class ExamPaper:
    """Represents a single exam paper file."""
    year: int
    session: str  # november, june, september, febmarch
    grade: int
    subject: str
    paper_number: Optional[int]
    language: str  # english, afrikaans
    paper_type: str  # exam, memo, addendum, data
    file_url: str
    file_name: str
    file_size: Optional[int] = None
    downloaded: bool = False
    local_path: Optional[str] = None


def parse_filename(filename: str, session_key: str) -> Optional[ExamPaper]:
    """Parse a filename to extract exam paper metadata."""
    # Decode URL encoding
    filename = unquote(filename)
    
    # Extract year from session key
    year_match = re.search(r'(\d{4})', session_key)
    year = int(year_match.group(1)) if year_match else 2024
    
    # Determine session type
    session = "november"
    if "june" in session_key.lower() or "mayjune" in session_key.lower():
        session = "june"
    elif "september" in session_key.lower():
        session = "september"
    elif "febmarch" in session_key.lower():
        session = "february"
    elif "exemplar" in session_key.lower():
        session = "exemplar"
    
    # Default grade from session key
    grade = 12
    grade_match = re.search(r'gr[_\s]*(\d+)', session_key.lower())
    if grade_match:
        grade = int(grade_match.group(1))
    
    # Determine paper type
    paper_type = "exam"
    if "mg" in filename.lower() or "memo" in filename.lower():
        paper_type = "memo"
    elif "addendum" in filename.lower():
        paper_type = "addendum"
    elif "data" in filename.lower():
        paper_type = "data"
    elif "answer" in filename.lower():
        paper_type = "answer_book"
    
    # Extract paper number
    paper_number = None
    paper_match = re.search(r'p[_\s]*(\d)', filename.lower())
    if paper_match:
        paper_number = int(paper_match.group(1))
    
    # Determine language
    language = "english"
    if "afr" in filename.lower():
        language = "afrikaans"
    
    # Extract subject
    subject = extract_subject(filename)
    
    return ExamPaper(
        year=year,
        session=session,
        grade=grade,
        subject=subject,
        paper_number=paper_number,
        language=language,
        paper_type=paper_type,
        file_url="",  # Set later
        file_name=filename,
    )


def extract_subject(filename: str) -> str:
    """Extract and normalize subject name from filename."""
    filename_lower = filename.lower()
    
    # Check against known subjects
    for key, value in SUBJECT_MAPPINGS.items():
        if key in filename_lower:
            return value
    
    # Fallback: use first part of filename
    base_name = re.sub(r'\.(zip|pdf|exe)$', '', filename, flags=re.IGNORECASE)
    base_name = re.sub(r'(p[12]|mg|nov|june|sept|2\d{3}|english|afrikaans)', '', base_name, flags=re.IGNORECASE)
    base_name = re.sub(r'[_\-\s]+', ' ', base_name).strip()
    
    return base_name.title() if base_name else "Unknown"


def fetch_session_papers(session_key: str, session_url: str) -> list[ExamPaper]:
    """Fetch all exam papers from a session page."""
    full_url = urljoin(BASE_URL, session_url)
    papers = []
    
    try:
        response = requests.get(full_url, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  ⚠️  Failed to fetch {session_url}: {e}")
        return papers
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all downloadable file links
    for link in soup.find_all('a', href=True):
        href = link['href']
        
        # Only process downloadable files
        if not any(ext in href.lower() for ext in ['.zip', '.pdf', '.exe']):
            continue
        
        # Skip external links
        if href.startswith(('http://', 'https://')) and 'ecexams.co.za' not in href:
            continue
        
        file_url = urljoin(full_url, href)
        filename = os.path.basename(unquote(href))
        
        paper = parse_filename(filename, session_key)
        if paper:
            paper.file_url = file_url
            papers.append(paper)
    
    return papers


def download_file(paper: ExamPaper, output_dir: Path, dry_run: bool = False) -> bool:
    """Download a single exam paper file."""
    # Create organized folder structure
    folder = output_dir / str(paper.year) / paper.session / f"grade_{paper.grade}" / paper.subject
    folder.mkdir(parents=True, exist_ok=True)
    
    # Determine filename
    local_filename = paper.file_name
    local_path = folder / local_filename
    
    paper.local_path = str(local_path)
    
    if dry_run:
        print(f"  [DRY-RUN] Would download: {paper.file_name}")
        return True
    
    if local_path.exists():
        paper.downloaded = True
        paper.file_size = local_path.stat().st_size
        return True
    
    try:
        response = requests.get(paper.file_url, timeout=120, stream=True)
        response.raise_for_status()
        
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        paper.downloaded = True
        paper.file_size = local_path.stat().st_size
        return True
        
    except requests.RequestException as e:
        print(f"  ⚠️  Failed to download {paper.file_name}: {e}")
        return False


def scrape_all_exams(
    output_dir: Path,
    years: Optional[list[int]] = None,
    grades: Optional[list[int]] = None,
    dry_run: bool = False,
    max_workers: int = 4,
) -> list[ExamPaper]:
    """Scrape all exam papers from ecexams.co.za."""
    all_papers = []
    
    print("\n📚 South African NSC Exam Papers Scraper")
    print("=" * 50)
    print(f"Source: {BASE_URL}")
    print(f"Output: {output_dir}")
    if years:
        print(f"Years: {', '.join(map(str, years))}")
    if grades:
        print(f"Grades: {', '.join(map(str, grades))}")
    if dry_run:
        print("Mode: DRY RUN (no downloads)")
    print("=" * 50)
    
    # Filter sessions by year if specified
    sessions_to_process = EXAM_SESSIONS.copy()
    if years:
        sessions_to_process = {
            k: v for k, v in EXAM_SESSIONS.items()
            if any(str(year) in k for year in years)
        }
    
    if grades:
        sessions_to_process = {
            k: v for k, v in sessions_to_process.items()
            if any(f"gr{grade}" in k.lower() or f"gr_{grade}" in k.lower() for grade in grades)
        }
    
    print(f"\n📋 Processing {len(sessions_to_process)} exam sessions...\n")
    
    # Fetch papers from each session
    for session_key, session_url in sessions_to_process.items():
        print(f"📁 {session_key}")
        papers = fetch_session_papers(session_key, session_url)
        print(f"   Found {len(papers)} files")
        all_papers.extend(papers)
        time.sleep(0.5)  # Be polite to the server
    
    print(f"\n📊 Total files found: {len(all_papers)}")
    
    if not all_papers:
        print("No papers found to download.")
        return []
    
    # Download files
    print(f"\n⬇️  Downloading files...")
    
    downloaded = 0
    failed = 0
    
    # Use sequential downloads to be server-friendly
    for i, paper in enumerate(all_papers, 1):
        print(f"  [{i}/{len(all_papers)}] {paper.file_name}", end="")
        if download_file(paper, output_dir, dry_run):
            downloaded += 1
            if paper.file_size:
                print(f" ✓ ({paper.file_size / 1024:.1f} KB)")
            else:
                print(" ✓")
        else:
            failed += 1
            print(" ✗")
        
        if not dry_run:
            time.sleep(0.2)  # Throttle downloads
    
    print(f"\n✅ Downloaded: {downloaded}")
    print(f"❌ Failed: {failed}")
    
    # Save metadata index
    index_path = output_dir / "exam_papers_index.json"
    with open(index_path, 'w') as f:
        json.dump([asdict(p) for p in all_papers], f, indent=2)
    print(f"\n📝 Index saved to: {index_path}")
    
    return all_papers


def main():
    parser = argparse.ArgumentParser(
        description="Scrape South African NSC exam papers from official sources"
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=Path("./exam-papers"),
        help="Output directory for downloaded papers"
    )
    parser.add_argument(
        "--years", "-y",
        type=str,
        help="Comma-separated list of years to download (e.g., 2024,2023,2022)"
    )
    parser.add_argument(
        "--grades", "-g",
        type=str,
        help="Comma-separated list of grades to download (e.g., 12,11,10)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Don't download files, just list what would be downloaded"
    )
    parser.add_argument(
        "--workers", "-w",
        type=int,
        default=4,
        help="Number of parallel download workers"
    )
    
    args = parser.parse_args()
    
    # Parse years/grades
    years = None
    if args.years:
        years = [int(y.strip()) for y in args.years.split(",")]
    
    grades = None
    if args.grades:
        grades = [int(g.strip()) for g in args.grades.split(",")]
    
    # Create output directory
    args.output.mkdir(parents=True, exist_ok=True)
    
    # Run scraper
    papers = scrape_all_exams(
        output_dir=args.output,
        years=years,
        grades=grades,
        dry_run=args.dry_run,
        max_workers=args.workers,
    )
    
    print(f"\n🎓 Done! {len(papers)} exam papers processed.")
    

if __name__ == "__main__":
    main()
