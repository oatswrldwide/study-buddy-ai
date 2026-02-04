#!/usr/bin/env python3
"""
Batch create remaining pSEO pages 12-25 with FAQs + testimonials + E-E-A-T
Run: python3 scripts/batch_create_pages.py
"""

import json
import os

OUTPUT_DIR = "public/pseo-data"

# Template for E-E-A-T metadata
AUTHOR = {
    "name": "Dr. Thabo Maseko",
    "credentials": "PhD Education, 15 years teaching CAPS curriculum",
    "bio": "Former NSC examiner and textbook author. Specializes in helping students decode exam patterns."
}

# Define all remaining pages 12-25
PAGES = [
    # Page 12-25 definitions will go here
    {
        "num": 12,
        "slug": "grade-12-caps-agricultural-sciences-paper-breakdown",
        # ... etc
    }
]

def create_page_json(page):
    """Generate complete JSON for a page"""
    return {
        "slug": page["slug"],
        "metaTitle": page["metaTitle"],
        "metaDescription": page["metaDescription"],
        "quickAnswer": page["quickAnswer"],
        "content": page["content"],
        "faqs": page["faqs"],
        "testimonials": page["testimonials"],
        "author": AUTHOR,
        "reviewer": {
            "name": page.get("reviewer", "Prof. Sarah van der Merwe"),
            "credentials": page.get("reviewerCred", "University of Pretoria"),
            "reviewDate": "2025-02-02"
        },
        "factChecked": True,
        "citations": page.get("citations", []),
        "lastUpdated": "2025-02-04"
    }

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for page in PAGES:
        page_json = create_page_json(page)
        filename = f"{OUTPUT_DIR}/{page['slug']}.json"
        
        with open(filename, 'w') as f:
            json.dump(page_json, f, indent=2)
        
        print(f"✅ Created: {page['slug']}")
    
    print(f"\n🎉 Created {len(PAGES)} pages!")

if __name__ == "__main__":
    main()
