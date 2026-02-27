export interface Bursary {
  id: string;
  name: string;
  provider: string;
  field: string;
  description: string;
  eligibility: string;
  value: string;
  applicationUrl: string;
  websiteUrl: string;
  active: boolean;
  /** Provinces where this bursary is specifically available. Absent or empty = nationwide. */
  provinces?: string[];
}

export const BURSARY_FIELDS = [
  "Engineering & Technology",
  "Finance & Accounting",
  "Information Technology",
  "Health Sciences",
  "Education",
  "Law & Justice",
  "Mining & Resources",
  "Agriculture & Environment",
  "Built Environment & Construction",
  "Arts & Creative Industries",
  "Social Sciences",
  "General / Multiple Fields",
] as const;

/** URL-safe slug for each bursary field */
export const BURSARY_FIELD_SLUGS: Record<string, string> = {
  "Engineering & Technology": "engineering-technology",
  "Finance & Accounting": "finance-accounting",
  "Information Technology": "information-technology",
  "Health Sciences": "health-sciences",
  "Education": "education",
  "Law & Justice": "law-justice",
  "Mining & Resources": "mining-resources",
  "Agriculture & Environment": "agriculture-environment",
  "Built Environment & Construction": "built-environment",
  "Arts & Creative Industries": "arts-creative",
  "Social Sciences": "social-sciences",
  "General / Multiple Fields": "general",
};

/** Reverse map: slug → field display name */
export const BURSARY_SLUG_TO_FIELD: Record<string, string> = Object.fromEntries(
  Object.entries(BURSARY_FIELD_SLUGS).map(([field, slug]) => [slug, field])
);

/** Map from university course category → closest bursary field */
export const COURSE_CATEGORY_TO_BURSARY_FIELD: Record<string, string> = {
  "Health Sciences": "Health Sciences",
  "Engineering": "Engineering & Technology",
  "Law": "Law & Justice",
  "Commerce & Business": "Finance & Accounting",
  "Information Technology": "Information Technology",
  "Education": "Education",
  "Natural Sciences": "Agriculture & Environment",
  "Humanities & Social Sciences": "Social Sciences",
  "Built Environment": "Built Environment & Construction",
};

export const BURSARIES: Bursary[] = [
  // ── Engineering & Technology ──────────────────────────────────────────────
  {
    id: "eskom-bursary",
    name: "Eskom Bursary",
    provider: "Eskom",
    field: "Engineering & Technology",
    description:
      "Eskom offers bursaries to full-time undergraduate students in engineering and related fields to address the skills shortage in the energy sector.",
    eligibility:
      "South African citizens with a strong matric pass; studying Electrical, Mechanical, Civil, Chemical or Industrial Engineering (and related fields) at a recognised SA university.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.eskom.co.za/careers/bursaries/",
    websiteUrl: "https://www.eskom.co.za/careers/bursaries/",
    active: true,
  },
  {
    id: "sasol-bursary",
    name: "Sasol Bursary Programme",
    provider: "Sasol",
    field: "Engineering & Technology",
    description:
      "Sasol awards bursaries to outstanding students in engineering, science and technology disciplines to build a talent pipeline for the energy and chemicals industry.",
    eligibility:
      "South African citizens; minimum 70% average in Grade 12 Maths and Physical Science; studying Engineering, Chemistry, Geology or Metallurgy.",
    value: "Full tuition, accommodation, books and a monthly stipend",
    applicationUrl: "https://www.sasolbursaries.com",
    websiteUrl: "https://www.sasolbursaries.com",
    active: true,
  },
  {
    id: "transnet-bursary",
    name: "Transnet Bursary Programme",
    provider: "Transnet",
    field: "Engineering & Technology",
    description:
      "Transnet supports students pursuing careers in transport, logistics and engineering through its annual bursary programme.",
    eligibility:
      "South African citizens aged 17–25; studying Civil, Electrical, Mechanical or Industrial Engineering at accredited SA universities; minimum 65% in Maths.",
    value: "Full tuition, books, accommodation and a monthly allowance",
    applicationUrl: "https://www.transnet.net/Careers/Pages/bursaries.aspx",
    websiteUrl: "https://www.transnet.net/Careers/Pages/bursaries.aspx",
    active: true,
  },
  {
    id: "sappi-bursary",
    name: "Sappi Bursary Programme",
    provider: "Sappi South Africa",
    field: "Engineering & Technology",
    description:
      "Sappi funds undergraduate bursaries in engineering and forestry sciences to develop skills for the pulp, paper and packaging sector.",
    eligibility:
      "South African citizens; studying Chemical, Mechanical, Electrical or Forestry Engineering at a public SA university.",
    value: "Tuition, accommodation and a monthly stipend",
    applicationUrl: "https://www.sappi.com/careers/bursaries",
    websiteUrl: "https://www.sappi.com/careers/bursaries",
    active: true,
  },
  {
    id: "arcelormittal-bursary",
    name: "ArcelorMittal South Africa Bursary",
    provider: "ArcelorMittal South Africa",
    field: "Engineering & Technology",
    description:
      "ArcelorMittal SA provides bursaries to encourage young South Africans to pursue engineering and metallurgy qualifications.",
    eligibility:
      "South African citizens; studying Metallurgical, Mechanical, Electrical or Chemical Engineering; minimum 60% average in Grade 12.",
    value: "Tuition, residence and living allowance",
    applicationUrl: "https://southafrica.arcelormittal.com/Careers/Bursaries",
    websiteUrl: "https://southafrica.arcelormittal.com/Careers/Bursaries",
    active: true,
  },
  {
    id: "debeers-bursary",
    name: "De Beers Group Bursary",
    provider: "De Beers Group",
    field: "Engineering & Technology",
    description:
      "De Beers awards bursaries to support engineering and geoscience students, building capability for the mining and diamonds industry.",
    eligibility:
      "South African citizens; studying Mining, Geological, Electrical, Mechanical or Civil Engineering.",
    value: "Full tuition plus allowances",
    applicationUrl: "https://www.debeersgroup.com/careers",
    websiteUrl: "https://www.debeersgroup.com/careers",
    active: true,
  },
  {
    id: "vodacom-bursary",
    name: "Vodacom Bursary",
    provider: "Vodacom",
    field: "Engineering & Technology",
    description:
      "Vodacom's bursary programme targets engineering and technology students who will contribute to the digital economy.",
    eligibility:
      "South African citizens; studying Electrical, Electronic or Computer Engineering or ICT-related degrees.",
    value: "Tuition, books and a monthly stipend",
    applicationUrl: "https://www.vodacom.co.za/vodacom/careers/bursaries",
    websiteUrl: "https://www.vodacom.co.za/vodacom/careers/bursaries",
    active: true,
  },
  {
    id: "mtn-foundation-bursary",
    name: "MTN Foundation Bursary",
    provider: "MTN Foundation",
    field: "Engineering & Technology",
    description:
      "The MTN Foundation offers bursaries primarily in ICT, engineering and related STEM fields to support the development of South Africa's digital talent.",
    eligibility:
      "South African citizens from financially disadvantaged backgrounds; studying ICT, Engineering or related STEM fields.",
    value: "Tuition and study materials",
    applicationUrl: "https://foundation.mtn.com/bursaries/",
    websiteUrl: "https://foundation.mtn.com/bursaries/",
    active: true,
  },
  // ── Finance & Accounting ──────────────────────────────────────────────────
  {
    id: "saica-bursary",
    name: "SAICA Thuthuka Bursary",
    provider: "South African Institute of Chartered Accountants (SAICA)",
    field: "Finance & Accounting",
    description:
      "The Thuthuka Bursary Fund supports Black African and Coloured students pursuing Chartered Accountancy to transform the profession.",
    eligibility:
      "South African citizens who are Black African or Coloured; pursuing a CA(SA) qualification at a SAICA-accredited university; minimum 70% for Maths and English.",
    value: "Full tuition, accommodation, meals, books, and a monthly allowance",
    applicationUrl: "https://www.thuthukabursaryfund.co.za",
    websiteUrl: "https://www.thuthukabursaryfund.co.za",
    active: true,
  },
  {
    id: "absa-bursary",
    name: "Absa Bursary Programme",
    provider: "Absa Group",
    field: "Finance & Accounting",
    description:
      "Absa offers bursaries to high-achieving students in finance, accounting, actuarial science and related fields to grow future banking talent.",
    eligibility:
      "South African citizens; studying Accounting, Finance, Actuarial Science, Risk Management or related fields; strong academic record.",
    value: "Tuition and a monthly living allowance",
    applicationUrl: "https://www.absa.co.za/about-absa/careers/bursaries/",
    websiteUrl: "https://www.absa.co.za/about-absa/careers/bursaries/",
    active: true,
  },
  {
    id: "standard-bank-bursary",
    name: "Standard Bank Bursary",
    provider: "Standard Bank",
    field: "Finance & Accounting",
    description:
      "Standard Bank awards bursaries to students in commerce, finance and technology disciplines, with a view to employing recipients after graduation.",
    eligibility:
      "South African citizens; studying BCom, Accounting, Finance, IT or Engineering at a recognised SA university.",
    value: "Tuition, books and a monthly allowance",
    applicationUrl: "https://www.standardbank.co.za/standalonepages/bursary-programme",
    websiteUrl: "https://www.standardbank.co.za/standalonepages/bursary-programme",
    active: true,
  },
  {
    id: "firstrand-bursary",
    name: "FirstRand Foundation Bursary",
    provider: "FirstRand Foundation (FNB / RMB / WesBank)",
    field: "Finance & Accounting",
    description:
      "The FirstRand Foundation funds bursaries in Accounting, Finance and Actuarial Science, supporting historically disadvantaged students.",
    eligibility:
      "South African citizens from previously disadvantaged backgrounds; studying Accounting, Finance, Actuarial Science or related disciplines.",
    value: "Full tuition plus a monthly stipend",
    applicationUrl: "https://www.firstrandfoundation.co.za/bursaries",
    websiteUrl: "https://www.firstrandfoundation.co.za/bursaries",
    active: true,
  },
  {
    id: "nedbank-bursary",
    name: "Nedbank Foundation Bursary",
    provider: "Nedbank",
    field: "Finance & Accounting",
    description:
      "Nedbank's bursary programme develops future finance and banking professionals through funding and mentorship.",
    eligibility:
      "South African citizens; studying Finance, Accounting, Economics, Risk or Actuarial Science; strong academic performance.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.nedbankgroup.co.za/social/social-investment/bursaries",
    websiteUrl: "https://www.nedbankgroup.co.za/social/social-investment/bursaries",
    active: true,
  },
  {
    id: "deloitte-bursary",
    name: "Deloitte Bursary Programme",
    provider: "Deloitte South Africa",
    field: "Finance & Accounting",
    description:
      "Deloitte offers bursaries to BCom Accounting students who demonstrate academic excellence and leadership potential.",
    eligibility:
      "South African citizens; studying BCom Accounting or equivalent at an accredited SA university; minimum 65% average.",
    value: "Tuition plus a study allowance",
    applicationUrl: "https://www2.deloitte.com/za/en/pages/careers/articles/bursary.html",
    websiteUrl: "https://www2.deloitte.com/za/en/pages/careers/articles/bursary.html",
    active: true,
  },
  {
    id: "kpmg-bursary",
    name: "KPMG Bursary",
    provider: "KPMG South Africa",
    field: "Finance & Accounting",
    description:
      "KPMG SA funds bursaries for Accounting and Auditing students, with recipients gaining vacation work experience at KPMG offices.",
    eligibility:
      "South African citizens; studying BCom Accounting, Auditing or Financial Management; minimum 60% in all subjects.",
    value: "Tuition and vacation work allowance",
    applicationUrl: "https://kpmg.com/za/en/home/careers/students/bursaries.html",
    websiteUrl: "https://kpmg.com/za/en/home/careers/students/bursaries.html",
    active: true,
  },
  {
    id: "pwc-bursary",
    name: "PwC Bursary",
    provider: "PricewaterhouseCoopers South Africa",
    field: "Finance & Accounting",
    description:
      "PwC SA offers bursaries to accounting and finance students at selected South African universities.",
    eligibility:
      "South African citizens; studying towards a CA(SA) qualification or BCom Accounting; strong academic and leadership record.",
    value: "Tuition and a monthly study allowance",
    applicationUrl: "https://www.pwc.co.za/en/careers/learners/learners-bursaries.html",
    websiteUrl: "https://www.pwc.co.za/en/careers/learners/learners-bursaries.html",
    active: true,
  },
  // ── Information Technology ────────────────────────────────────────────────
  {
    id: "dimension-data-bursary",
    name: "Dimension Data Bursary",
    provider: "Dimension Data (NTT)",
    field: "Information Technology",
    description:
      "Dimension Data funds bursaries for IT and computer science students who have the potential to become future technology leaders.",
    eligibility:
      "South African citizens; studying Computer Science, Information Systems, IT Engineering or related ICT fields.",
    value: "Tuition, books and a monthly allowance",
    applicationUrl: "https://za.ntt.com/careers",
    websiteUrl: "https://za.ntt.com/careers",
    active: true,
  },
  {
    id: "accenture-bursary",
    name: "Accenture Bursary",
    provider: "Accenture South Africa",
    field: "Information Technology",
    description:
      "Accenture SA awards bursaries to IT and technology students, providing mentorship and the possibility of employment after graduation.",
    eligibility:
      "South African citizens from financially disadvantaged backgrounds; studying IT, Computer Science, Engineering or related fields.",
    value: "Tuition and a monthly living allowance",
    applicationUrl: "https://www.accenture.com/za-en/careers/bursaries",
    websiteUrl: "https://www.accenture.com/za-en/careers/bursaries",
    active: true,
  },
  {
    id: "mict-seta-bursary",
    name: "MICT SETA Bursary",
    provider: "Media, Information and Communication Technologies SETA (MICT SETA)",
    field: "Information Technology",
    description:
      "MICT SETA provides bursaries for students in the media, information and communications technology sectors to address critical skills needs.",
    eligibility:
      "South African citizens; studying ICT, Computer Science, Media, Broadcasting, Film or related fields at a public SA university or TVET college.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.mict.org.za/bursaries",
    websiteUrl: "https://www.mict.org.za/bursaries",
    active: true,
  },
  // ── Health Sciences ───────────────────────────────────────────────────────
  {
    id: "national-doh-bursary",
    name: "National Department of Health Bursary",
    provider: "National Department of Health",
    field: "Health Sciences",
    description:
      "The National DoH offers bursaries to students in health sciences to address the shortage of healthcare workers in the public sector.",
    eligibility:
      "South African citizens; studying Medicine, Nursing, Pharmacy, Physiotherapy, Occupational Therapy, Dentistry or other health sciences; commitment to work in the public health sector after graduation.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.health.gov.za/bursaries/",
    websiteUrl: "https://www.health.gov.za/bursaries/",
    active: true,
  },
  {
    id: "gauteng-doh-bursary",
    name: "Gauteng Department of Health Bursary",
    provider: "Gauteng Department of Health",
    field: "Health Sciences",
    description:
      "The Gauteng DoH funds bursaries for health science students in exchange for a commitment to work in Gauteng public health facilities.",
    eligibility:
      "South African citizens; residing in Gauteng; studying Nursing, Medicine, Pharmacy, Allied Health Sciences; commitment to public service bond.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl:
      "https://www.gauteng.gov.za/departments/health/bursaries",
    websiteUrl: "https://www.gauteng.gov.za/departments/health/bursaries",
    active: true,
  },
  {
    id: "mediclinic-bursary",
    name: "Mediclinic Bursary",
    provider: "Mediclinic Southern Africa",
    field: "Health Sciences",
    description:
      "Mediclinic supports nursing and other health science students through bursaries, with opportunities to work at Mediclinic hospitals.",
    eligibility:
      "South African citizens; studying Nursing (B Cur or higher) or Allied Health Sciences; commitment to work at Mediclinic after completing studies.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.mediclinic.co.za/en/about-us/careers/bursaries.html",
    websiteUrl: "https://www.mediclinic.co.za/en/about-us/careers/bursaries.html",
    active: true,
  },
  {
    id: "discovery-health-bursary",
    name: "Discovery Foundation Bursary",
    provider: "Discovery Foundation",
    field: "Health Sciences",
    description:
      "The Discovery Foundation offers clinical specialist training awards and bursaries for post-graduate medical students to address the specialist shortage.",
    eligibility:
      "South African citizens or permanent residents; registered medical practitioners completing specialist training; study at accredited SA institutions.",
    value: "Funding for specialist training including tuition and research costs",
    applicationUrl: "https://www.discovery.co.za/corporate/discovery-foundation",
    websiteUrl: "https://www.discovery.co.za/corporate/discovery-foundation",
    active: true,
  },
  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: "funza-lushaka-bursary",
    name: "Funza Lushaka Bursary",
    provider: "Department of Basic Education",
    field: "Education",
    description:
      "The Funza Lushaka Bursary is the government's flagship bursary for student teachers, covering all costs in exchange for teaching in public schools.",
    eligibility:
      "South African citizens; studying towards a B.Ed or PGCE at an accredited SA university; commitment to teach in a public school for the same number of years as the bursary period.",
    value: "Full tuition, accommodation, meals, books and a monthly allowance",
    applicationUrl: "https://www.eservices.gov.za",
    websiteUrl: "https://www.education.gov.za/Programmes/FunzaLushaka.aspx",
    active: true,
  },
  {
    id: "nrf-bursary",
    name: "NRF Bursary & Scholarship",
    provider: "National Research Foundation (NRF)",
    field: "Education",
    description:
      "The NRF funds postgraduate studies (Honours, Masters, Doctoral and Postdoctoral) across all disciplines to develop South Africa's research capacity.",
    eligibility:
      "South African citizens or permanent residents; registered for a full-time postgraduate degree at an accredited SA university; strong academic record.",
    value: "Annual stipend and research support",
    applicationUrl: "https://nrfconnect.nrf.ac.za",
    websiteUrl: "https://www.nrf.ac.za/opportunities/",
    active: true,
  },
  // ── Law & Justice ─────────────────────────────────────────────────────────
  {
    id: "doj-bursary",
    name: "Department of Justice Bursary",
    provider: "Department of Justice and Constitutional Development",
    field: "Law & Justice",
    description:
      "The DoJ offers bursaries to law students to help build capacity in the justice system, with a bond of service after graduation.",
    eligibility:
      "South African citizens; studying LLB at an accredited SA university; commitment to work for the DoJ for a prescribed period after graduation.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.justice.gov.za/master/bursaries.html",
    websiteUrl: "https://www.justice.gov.za/master/bursaries.html",
    active: true,
  },
  {
    id: "legal-aid-sa-bursary",
    name: "Legal Aid SA Bursary",
    provider: "Legal Aid South Africa",
    field: "Law & Justice",
    description:
      "Legal Aid SA provides bursaries to final-year LLB students who wish to pursue a career in public-interest law, especially in underserved communities.",
    eligibility:
      "South African citizens; registered for LLB at an accredited SA university; demonstrated interest in public-interest law.",
    value: "Tuition subsidy and a monthly allowance",
    applicationUrl: "https://www.legal-aid.co.za/careers/bursaries/",
    websiteUrl: "https://www.legal-aid.co.za/careers/bursaries/",
    active: true,
  },
  {
    id: "npa-bursary",
    name: "National Prosecuting Authority Bursary",
    provider: "National Prosecuting Authority (NPA)",
    field: "Law & Justice",
    description:
      "The NPA offers bursaries to aspiring prosecutors studying LLB, with a view to recruiting recipients as prosecutors upon graduation.",
    eligibility:
      "South African citizens; studying LLB; strong academic record; commitment to a career in prosecution.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.npa.gov.za/bursaries",
    websiteUrl: "https://www.npa.gov.za/bursaries",
    active: true,
  },
  // ── Mining & Resources ────────────────────────────────────────────────────
  {
    id: "sibanye-bursary",
    name: "Sibanye-Stillwater Bursary",
    provider: "Sibanye-Stillwater",
    field: "Mining & Resources",
    description:
      "Sibanye-Stillwater offers bursaries to undergraduate mining and engineering students to develop talent for the gold and platinum mining industry.",
    eligibility:
      "South African citizens from mining communities; studying Mining Engineering, Metallurgy, Geology, Mechanical or Electrical Engineering.",
    value: "Full tuition, accommodation and a monthly stipend",
    applicationUrl: "https://www.sibanyestillwater.com/careers/bursaries/",
    websiteUrl: "https://www.sibanyestillwater.com/careers/bursaries/",
    active: true,
  },
  {
    id: "harmony-gold-bursary",
    name: "Harmony Gold Bursary",
    provider: "Harmony Gold Mining",
    field: "Mining & Resources",
    description:
      "Harmony Gold awards bursaries in mining and engineering to develop future skills for the South African gold mining industry.",
    eligibility:
      "South African citizens; studying Mining Engineering, Metallurgy or related engineering fields.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.harmony.co.za/careers/bursaries",
    websiteUrl: "https://www.harmony.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "impala-platinum-bursary",
    name: "Impala Platinum Bursary",
    provider: "Impala Platinum (Implats)",
    field: "Mining & Resources",
    description:
      "Implats provides bursaries to engineering and mining science students to support the development of skills in the platinum mining sector.",
    eligibility:
      "South African citizens; studying Mining, Metallurgical, Mechanical, Electrical or Chemical Engineering; minimum 60% in Grade 12.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.implats.co.za/careers/bursaries",
    websiteUrl: "https://www.implats.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "glencore-bursary",
    name: "Glencore Bursary",
    provider: "Glencore South Africa",
    field: "Mining & Resources",
    description:
      "Glencore funds bursaries for mining engineering and related disciplines to grow skills for South African mining and smelting operations.",
    eligibility:
      "South African citizens; studying Mining, Chemical, Metallurgical or Mechanical Engineering or Geology.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.glencore.com/careers/bursaries",
    websiteUrl: "https://www.glencore.com/careers/bursaries",
    active: true,
  },
  {
    id: "MQA-bursary",
    name: "MQA Bursary",
    provider: "Mining Qualifications Authority (MQA)",
    field: "Mining & Resources",
    description:
      "The MQA offers bursaries to students in mining and mineral processing fields to address critical skills shortages in the sector.",
    eligibility:
      "South African citizens; studying Mining Engineering, Metallurgy, Mine Survey, Geology or Rock Engineering at a public SA university.",
    value: "Tuition and study materials",
    applicationUrl: "https://mqa.org.za/bursaries",
    websiteUrl: "https://mqa.org.za/bursaries",
    active: true,
  },
  // ── Agriculture & Environment ─────────────────────────────────────────────
  {
    id: "daff-bursary",
    name: "DFFE Bursary (Agriculture, Forestry, Fisheries & Environment)",
    provider:
      "Department of Forestry, Fisheries and the Environment (DFFE)",
    field: "Agriculture & Environment",
    description:
      "The DFFE offers bursaries to students in environmental, fisheries, forestry and nature conservation fields to address capacity needs.",
    eligibility:
      "South African citizens; studying Environmental Science, Nature Conservation, Forestry, Fisheries, Marine Biology or related fields.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.dffe.gov.za/content/bursaries",
    websiteUrl: "https://www.dffe.gov.za/content/bursaries",
    active: true,
  },
  {
    id: "dalrrd-bursary",
    name: "DALRRD Bursary",
    provider: "Department of Agriculture, Land Reform and Rural Development (DALRRD)",
    field: "Agriculture & Environment",
    description:
      "DALRRD provides bursaries for students in agriculture and related sciences to help develop a new generation of agricultural professionals.",
    eligibility:
      "South African citizens; studying Agriculture, Agricultural Economics, Soil Science, Animal Science or related fields.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.dalrrd.gov.za/bursaries",
    websiteUrl: "https://www.dalrrd.gov.za/bursaries",
    active: true,
  },
  // ── Social Sciences ───────────────────────────────────────────────────────
  {
    id: "dsd-bursary",
    name: "Department of Social Development Bursary",
    provider: "Department of Social Development (DSD)",
    field: "Social Sciences",
    description:
      "The DSD awards bursaries to social work students to address the critical shortage of qualified social workers in South Africa.",
    eligibility:
      "South African citizens; studying Social Work or Child and Youth Care at an accredited SA institution; commitment to work for the DSD after graduation.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.dsd.gov.za/index.php/bursaries",
    websiteUrl: "https://www.dsd.gov.za/index.php/bursaries",
    active: true,
  },
  // ── General / Multiple Fields ─────────────────────────────────────────────
  {
    id: "nsfas",
    name: "NSFAS (National Student Financial Aid Scheme)",
    provider: "National Student Financial Aid Scheme",
    field: "General / Multiple Fields",
    description:
      "NSFAS is the government's main financial aid scheme for students at public universities and TVET colleges. It covers tuition, accommodation, transport, meals and books.",
    eligibility:
      "South African citizens; household income below R350 000 per year; studying at a public university or TVET college; not receiving another government bursary.",
    value: "Full tuition, accommodation, meals, transport and book allowances",
    applicationUrl: "https://my.nsfas.org.za",
    websiteUrl: "https://www.nsfas.org.za",
    active: true,
  },
  {
    id: "national-treasury-bursary",
    name: "National Treasury Bursary",
    provider: "National Treasury",
    field: "General / Multiple Fields",
    description:
      "National Treasury provides bursaries across a range of disciplines including Finance, Economics, Law and IT to build public-sector capacity.",
    eligibility:
      "South African citizens; studying Finance, Accounting, Economics, Law, IT or related fields at a public SA university; commitment to serve the public sector.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.treasury.gov.za/careers/bursaries.aspx",
    websiteUrl: "https://www.treasury.gov.za/careers/bursaries.aspx",
    active: true,
  },
  {
    id: "sars-bursary",
    name: "SARS Bursary",
    provider: "South African Revenue Service (SARS)",
    field: "General / Multiple Fields",
    description:
      "SARS offers bursaries in finance, tax, accounting, law, IT and related fields to grow capacity within South Africa's revenue authority.",
    eligibility:
      "South African citizens; studying Accounting, Tax, Finance, IT, Law or related disciplines; commitment to work at SARS after graduation.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.sars.gov.za/about/careers/bursaries/",
    websiteUrl: "https://www.sars.gov.za/about/careers/bursaries/",
    active: true,
  },
  {
    id: "statssa-bursary",
    name: "Statistics South Africa Bursary",
    provider: "Statistics South Africa (Stats SA)",
    field: "General / Multiple Fields",
    description:
      "Stats SA awards bursaries in statistics, mathematics, demography and related disciplines to build South Africa's national statistics capacity.",
    eligibility:
      "South African citizens; studying Statistics, Demography, Mathematics, Economics, Geography or Actuarial Science.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.statssa.gov.za/careers/bursaries/",
    websiteUrl: "https://www.statssa.gov.za/careers/bursaries/",
    active: true,
  },
  {
    id: "dpsa-bursary",
    name: "DPSA Bursary",
    provider: "Department of Public Service and Administration (DPSA)",
    field: "General / Multiple Fields",
    description:
      "The DPSA provides bursaries to students studying towards qualifications relevant to the public service, covering a broad range of disciplines.",
    eligibility:
      "South African citizens; studying Public Administration, Human Resources, Finance, IT, Law or related fields; must be committed to a public-sector career.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.dpsa.gov.za/dpsa2g/vacancies.asp",
    websiteUrl: "https://www.dpsa.gov.za",
    active: true,
  },
  {
    id: "old-mutual-bursary",
    name: "Old Mutual Foundation Bursary",
    provider: "Old Mutual Foundation",
    field: "General / Multiple Fields",
    description:
      "The Old Mutual Foundation offers bursaries across commerce, mathematics, actuarial science and other related fields to support economic transformation.",
    eligibility:
      "South African citizens from historically disadvantaged backgrounds; studying Actuarial Science, Finance, BCom, Mathematics or related fields.",
    value: "Tuition and a monthly living allowance",
    applicationUrl: "https://www.oldmutual.co.za/careers/bursaries/",
    websiteUrl: "https://www.oldmutual.co.za/careers/bursaries/",
    active: true,
  },
  {
    id: "anglo-american-bursary",
    name: "Anglo American Bursary",
    provider: "Anglo American",
    field: "General / Multiple Fields",
    description:
      "Anglo American offers bursaries across engineering, finance, IT and geosciences to build skills for its South African mining and corporate operations.",
    eligibility:
      "South African citizens; studying Engineering, Finance, IT, Geology or related fields; strong academic performance.",
    value: "Full tuition, accommodation and a monthly stipend",
    applicationUrl: "https://southafrica.angloamerican.com/careers/graduates-and-bursaries",
    websiteUrl: "https://southafrica.angloamerican.com/careers/graduates-and-bursaries",
    active: true,
  },

  // ── Engineering & Technology (additional) ────────────────────────────────
  {
    id: "rand-water-bursary",
    name: "Rand Water Bursary",
    provider: "Rand Water",
    field: "Engineering & Technology",
    description:
      "Rand Water offers bursaries to engineering and science students to develop skills for South Africa's water sector and ensure water security.",
    eligibility:
      "South African citizens; studying Civil, Chemical, Electrical or Mechanical Engineering, or Chemistry/Microbiology at a recognised SA university.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.randwater.co.za/CorporateInfo/Pages/Bursaries.aspx",
    websiteUrl: "https://www.randwater.co.za/CorporateInfo/Pages/Bursaries.aspx",
    active: true,
    provinces: ["Gauteng", "Free State"],
  },
  {
    id: "prasa-bursary",
    name: "PRASA Bursary",
    provider: "Passenger Rail Agency of South Africa (PRASA)",
    field: "Engineering & Technology",
    description:
      "PRASA funds bursaries for engineering students to build capability for rail and public transport infrastructure in South Africa.",
    eligibility:
      "South African citizens; studying Electrical, Mechanical, Civil or Electronic Engineering; commitment to work for PRASA after graduation.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.prasa.com/careers/bursaries",
    websiteUrl: "https://www.prasa.com/careers/bursaries",
    active: true,
  },
  {
    id: "acsa-bursary",
    name: "ACSA Bursary",
    provider: "Airports Company South Africa (ACSA)",
    field: "Engineering & Technology",
    description:
      "ACSA awards bursaries to engineering and built-environment students to develop the skills needed for airport infrastructure and operations.",
    eligibility:
      "South African citizens; studying Civil, Electrical, Mechanical or Industrial Engineering, or Quantity Surveying; strong academic record.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.airports.co.za/careers/bursaries",
    websiteUrl: "https://www.airports.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "telkom-bursary",
    name: "Telkom Bursary",
    provider: "Telkom",
    field: "Engineering & Technology",
    description:
      "Telkom offers bursaries to engineering and IT students to grow talent for South Africa's telecommunications and technology sector.",
    eligibility:
      "South African citizens; studying Electrical/Electronic Engineering, Computer Science, IT or related disciplines; minimum 65% in Grade 12 Maths and Science.",
    value: "Tuition, books and a monthly stipend",
    applicationUrl: "https://www.telkom.co.za/today/careers/bursaries",
    websiteUrl: "https://www.telkom.co.za/today/careers/bursaries",
    active: true,
  },
  {
    id: "merseta-bursary",
    name: "MERSETA Bursary",
    provider: "Manufacturing, Engineering and Related Services SETA (MERSETA)",
    field: "Engineering & Technology",
    description:
      "MERSETA provides bursaries for students in manufacturing, engineering and related services to address critical skills shortages in the sector.",
    eligibility:
      "South African citizens; studying Mechanical, Electrical, Industrial or Manufacturing Engineering or related trades at a public SA university or TVET college.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.merseta.org.za/skills-development/bursaries/",
    websiteUrl: "https://www.merseta.org.za/skills-development/bursaries/",
    active: true,
  },
  {
    id: "chieta-bursary",
    name: "CHIETA Bursary",
    provider: "Chemical Industries Education and Training Authority (CHIETA)",
    field: "Engineering & Technology",
    description:
      "CHIETA funds bursaries for students in the chemical, petroleum, plastics and pharmaceutical industries to meet sector skills needs.",
    eligibility:
      "South African citizens; studying Chemical Engineering, Chemistry, Pharmacy, Petrochemical Engineering or related fields at an accredited SA institution.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.chieta.org.za/bursaries",
    websiteUrl: "https://www.chieta.org.za/bursaries",
    active: true,
  },
  {
    id: "petro-sa-bursary",
    name: "PetroSA Bursary",
    provider: "PetroSA (South African National Oil Company)",
    field: "Engineering & Technology",
    description:
      "PetroSA offers bursaries for engineering and geoscience students to develop skills for the South African oil and gas industry.",
    eligibility:
      "South African citizens; studying Chemical, Mechanical, Electrical or Petroleum Engineering, or Geology/Geophysics; minimum 65% in Maths and Science.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.petrosa.co.za/careers/bursaries",
    websiteUrl: "https://www.petrosa.co.za/careers/bursaries",
    active: true,
  },

  // ── Finance & Accounting (additional) ────────────────────────────────────
  {
    id: "ey-bursary",
    name: "EY South Africa Bursary",
    provider: "Ernst & Young (EY) South Africa",
    field: "Finance & Accounting",
    description:
      "EY SA offers bursaries to accounting and finance students who show academic excellence and the potential to become future chartered accountants.",
    eligibility:
      "South African citizens; studying BCom Accounting or equivalent CA(SA) pathway at an accredited SA university; minimum 65% in all subjects.",
    value: "Tuition and a monthly study allowance",
    applicationUrl: "https://www.ey.com/en_za/careers/students/bursary",
    websiteUrl: "https://www.ey.com/en_za/careers/students/bursary",
    active: true,
  },
  {
    id: "sanlam-bursary",
    name: "Sanlam Bursary",
    provider: "Sanlam",
    field: "Finance & Accounting",
    description:
      "Sanlam offers bursaries to support students in finance, actuarial science and mathematics, with the aim of building South Africa's financial services talent.",
    eligibility:
      "South African citizens from previously disadvantaged backgrounds; studying Actuarial Science, Finance, Mathematics or BCom at a recognised SA university.",
    value: "Tuition and a monthly living allowance",
    applicationUrl: "https://www.sanlam.co.za/about/corporate-information/social-responsibility/bursaries",
    websiteUrl: "https://www.sanlam.co.za/about/corporate-information/social-responsibility/bursaries",
    active: true,
  },
  {
    id: "investec-bursary",
    name: "Investec Bursary",
    provider: "Investec",
    field: "Finance & Accounting",
    description:
      "Investec provides bursaries to exceptional students in finance, accounting and engineering, coupled with mentorship and vacation work programmes.",
    eligibility:
      "South African citizens; studying BCom Accounting, Finance, Actuarial Science, Engineering or related fields; strong academic and leadership record.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.investec.com/en_za/welcome-to-investec/careers/students/bursary.html",
    websiteUrl: "https://www.investec.com/en_za/welcome-to-investec/careers/students/bursary.html",
    active: true,
  },
  {
    id: "liberty-bursary",
    name: "Liberty Group Bursary",
    provider: "Liberty Group",
    field: "Finance & Accounting",
    description:
      "Liberty offers bursaries to actuarial science and finance students to help develop talent for the South African insurance and investment sector.",
    eligibility:
      "South African citizens; studying Actuarial Science, Finance, Statistics or related fields; strong performance in Mathematics.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.liberty.co.za/about-us/careers/bursaries",
    websiteUrl: "https://www.liberty.co.za/about-us/careers/bursaries",
    active: true,
  },
  {
    id: "bdo-bursary",
    name: "BDO South Africa Bursary",
    provider: "BDO South Africa",
    field: "Finance & Accounting",
    description:
      "BDO SA awards bursaries to BCom Accounting students, providing mentorship and guaranteed vacation work as part of the programme.",
    eligibility:
      "South African citizens; studying BCom Accounting towards CA(SA) qualification; minimum 65% average.",
    value: "Tuition and a vacation work allowance",
    applicationUrl: "https://www.bdo.co.za/en-za/careers/students/bursaries",
    websiteUrl: "https://www.bdo.co.za/en-za/careers/students/bursaries",
    active: true,
  },
  {
    id: "grant-thornton-bursary",
    name: "Grant Thornton Bursary",
    provider: "Grant Thornton South Africa",
    field: "Finance & Accounting",
    description:
      "Grant Thornton SA funds bursaries for accounting students, with recipients gaining practical work experience through structured vacation programmes.",
    eligibility:
      "South African citizens; studying BCom Accounting or equivalent; strong academic record and leadership potential.",
    value: "Tuition and a vacation work allowance",
    applicationUrl: "https://www.grantthornton.co.za/careers/students/bursaries/",
    websiteUrl: "https://www.grantthornton.co.za/careers/students/bursaries/",
    active: true,
  },

  // ── Information Technology (additional) ──────────────────────────────────
  {
    id: "telkom-foundation-ict-bursary",
    name: "Telkom Foundation ICT Bursary",
    provider: "Telkom Foundation",
    field: "Information Technology",
    description:
      "The Telkom Foundation focuses specifically on ICT and computer science bursaries to grow South Africa's digital talent pipeline, especially from underprivileged backgrounds.",
    eligibility:
      "South African citizens from financially disadvantaged backgrounds; studying Computer Science, Information Systems, Software Engineering or IT-related fields.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://foundation.telkom.co.za/bursaries",
    websiteUrl: "https://foundation.telkom.co.za/bursaries",
    active: true,
  },
  {
    id: "bcx-bursary",
    name: "BCX Bursary",
    provider: "BCX (Business Connexion)",
    field: "Information Technology",
    description:
      "BCX awards bursaries to IT and computer science students to build skills for South Africa's technology services industry.",
    eligibility:
      "South African citizens; studying Computer Science, Information Technology, Software Engineering or related fields at an accredited SA university.",
    value: "Tuition and a monthly stipend",
    applicationUrl: "https://www.bcx.co.za/careers/bursaries",
    websiteUrl: "https://www.bcx.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "sap-bursary",
    name: "SAP South Africa Bursary",
    provider: "SAP South Africa",
    field: "Information Technology",
    description:
      "SAP SA offers bursaries and internships to IT and software engineering students, with a strong focus on enterprise technology skills.",
    eligibility:
      "South African citizens; studying Computer Science, Information Systems, Software Engineering or Business Informatics at a recognised SA university.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.sap.com/africa/about/careers/student-programs.html",
    websiteUrl: "https://www.sap.com/africa/about/careers/student-programs.html",
    active: true,
  },

  // ── Health Sciences (additional) ──────────────────────────────────────────
  {
    id: "netcare-bursary",
    name: "Netcare Bursary",
    provider: "Netcare",
    field: "Health Sciences",
    description:
      "Netcare offers bursaries to nursing and allied health students with the expectation that recipients will join Netcare hospitals after qualifying.",
    eligibility:
      "South African citizens; studying Nursing (B Cur or equivalent), Pharmacy, Physiotherapy, Occupational Therapy or related Allied Health Sciences; commitment to work at Netcare after graduation.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.netcare.co.za/careers/bursaries",
    websiteUrl: "https://www.netcare.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "life-healthcare-bursary",
    name: "Life Healthcare Bursary",
    provider: "Life Healthcare",
    field: "Health Sciences",
    description:
      "Life Healthcare provides bursaries to nursing and allied health science students, supporting the development of healthcare professionals for private hospitals.",
    eligibility:
      "South African citizens; studying Nursing, Physiotherapy, Occupational Therapy or other Allied Health disciplines; commitment to work for Life Healthcare after graduation.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.lifehealthcare.co.za/working-with-us/bursaries",
    websiteUrl: "https://www.lifehealthcare.co.za/working-with-us/bursaries",
    active: true,
  },
  {
    id: "western-cape-doh-bursary",
    name: "Western Cape Department of Health Bursary",
    provider: "Western Cape Department of Health",
    field: "Health Sciences",
    description:
      "The Western Cape DoH funds bursaries for health science students in exchange for a bond of service at Western Cape public health facilities.",
    eligibility:
      "South African citizens preferably residing in the Western Cape; studying Medicine, Nursing, Pharmacy, Radiography, Physiotherapy or Allied Health Sciences; commitment to public health service.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.westerncape.gov.za/dept/health/bursaries",
    websiteUrl: "https://www.westerncape.gov.za/dept/health/bursaries",
    active: true,
    provinces: ["Western Cape"],
  },
  {
    id: "kzn-doh-bursary",
    name: "KwaZulu-Natal Department of Health Bursary",
    provider: "KwaZulu-Natal Department of Health",
    field: "Health Sciences",
    description:
      "The KZN DoH offers bursaries to health science students who commit to working in KwaZulu-Natal public health facilities after graduation.",
    eligibility:
      "South African citizens preferably from KwaZulu-Natal; studying Nursing, Medicine, Pharmacy, Physiotherapy, Radiography or other health science disciplines; bond of service required.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.kznhealth.gov.za/bursary.asp",
    websiteUrl: "https://www.kznhealth.gov.za/bursary.asp",
    active: true,
    provinces: ["KwaZulu-Natal"],
  },
  {
    id: "hwseta-bursary",
    name: "HWSETA Bursary",
    provider: "Health and Welfare Sector Education and Training Authority (HWSETA)",
    field: "Health Sciences",
    description:
      "HWSETA funds bursaries for students in the health, social development and welfare sectors to address critical skills gaps.",
    eligibility:
      "South African citizens; studying Nursing, Social Work, Occupational Therapy, Pharmacy, or related Health and Welfare disciplines at an accredited SA institution.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.hwseta.org.za/bursaries/",
    websiteUrl: "https://www.hwseta.org.za/bursaries/",
    active: true,
  },

  // ── Education (additional) ────────────────────────────────────────────────
  {
    id: "zenex-bursary",
    name: "Zenex Foundation Bursary",
    provider: "Zenex Foundation",
    field: "Education",
    description:
      "The Zenex Foundation supports student teachers through bursaries, with a focus on improving Maths and Science teacher quality in South African schools.",
    eligibility:
      "South African citizens; studying B.Ed or PGCE with a specialisation in Mathematics, Physical Science or Technology education at an accredited SA university.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.zenexfoundation.org.za/bursaries",
    websiteUrl: "https://www.zenexfoundation.org.za/bursaries",
    active: true,
  },
  {
    id: "etdp-seta-bursary",
    name: "ETDP SETA Bursary",
    provider: "Education, Training and Development Practices SETA (ETDP SETA)",
    field: "Education",
    description:
      "ETDP SETA provides bursaries for students in education, training and development to improve the quality of practitioners in the sector.",
    eligibility:
      "South African citizens; studying B.Ed, Education Management, Adult Education, Early Childhood Development or related education qualifications.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.etdpseta.org.za/bursaries",
    websiteUrl: "https://www.etdpseta.org.za/bursaries",
    active: true,
  },

  // ── Mining & Resources (additional) ──────────────────────────────────────
  {
    id: "gold-fields-bursary",
    name: "Gold Fields Bursary",
    provider: "Gold Fields",
    field: "Mining & Resources",
    description:
      "Gold Fields offers bursaries to engineering and mining students to develop skills for its South African gold mining operations.",
    eligibility:
      "South African citizens; studying Mining, Metallurgical, Electrical or Mechanical Engineering; preference for candidates from mining communities.",
    value: "Full tuition, accommodation and a monthly stipend",
    applicationUrl: "https://www.goldfields.com/careers/bursaries",
    websiteUrl: "https://www.goldfields.com/careers/bursaries",
    active: true,
  },
  {
    id: "amplats-bursary",
    name: "Anglo American Platinum (Amplats) Bursary",
    provider: "Anglo American Platinum (Amplats)",
    field: "Mining & Resources",
    description:
      "Amplats provides bursaries for engineering and mining students to build a pipeline of skills for the platinum mining industry.",
    eligibility:
      "South African citizens; studying Mining, Metallurgical, Mechanical, Electrical or Chemical Engineering at a public SA university.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://southafrica.angloamerican.com/careers/graduates-and-bursaries",
    websiteUrl: "https://southafrica.angloamerican.com/careers/graduates-and-bursaries",
    active: true,
  },
  {
    id: "arm-bursary",
    name: "African Rainbow Minerals (ARM) Bursary",
    provider: "African Rainbow Minerals (ARM)",
    field: "Mining & Resources",
    description:
      "ARM awards bursaries to mining and engineering students to grow capability across its diversified mining operations.",
    eligibility:
      "South African citizens; studying Mining, Metallurgical, Electrical, Mechanical or Chemical Engineering; strong matric results in Maths and Science.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.arm.co.za/careers",
    websiteUrl: "https://www.arm.co.za/careers",
    active: true,
  },
  {
    id: "northam-platinum-bursary",
    name: "Northam Platinum Bursary",
    provider: "Northam Platinum",
    field: "Mining & Resources",
    description:
      "Northam Platinum provides bursaries to mining and engineering students to develop talent for the platinum group metals industry.",
    eligibility:
      "South African citizens; studying Mining Engineering, Metallurgy, Mechanical or Electrical Engineering at an accredited SA university.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.northam.co.za/careers/bursaries",
    websiteUrl: "https://www.northam.co.za/careers/bursaries",
    active: true,
  },

  // ── Agriculture & Environment (additional) ───────────────────────────────
  {
    id: "arc-bursary",
    name: "Agricultural Research Council (ARC) Bursary",
    provider: "Agricultural Research Council (ARC)",
    field: "Agriculture & Environment",
    description:
      "The ARC funds bursaries for postgraduate students in agriculture and related natural sciences to advance South Africa's agricultural research capacity.",
    eligibility:
      "South African citizens; registered for a postgraduate degree in Agriculture, Plant Pathology, Animal Science, Food Science, Soil Science or related disciplines at an accredited SA university.",
    value: "Annual stipend and research support",
    applicationUrl: "https://www.arc.agric.za/Pages/Bursaries.aspx",
    websiteUrl: "https://www.arc.agric.za/Pages/Bursaries.aspx",
    active: true,
  },
  {
    id: "afgri-bursary",
    name: "AFGRI Bursary",
    provider: "AFGRI Group",
    field: "Agriculture & Environment",
    description:
      "AFGRI offers bursaries to agriculture and agri-business students to build skills for the commercial agricultural sector in South Africa.",
    eligibility:
      "South African citizens; studying Agriculture, Agronomy, Agricultural Economics, Food Technology or Agribusiness Management.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.afgri.co.za/bursaries",
    websiteUrl: "https://www.afgri.co.za/bursaries",
    active: true,
  },
  {
    id: "sappi-forestry-bursary",
    name: "Sappi Forestry Bursary",
    provider: "Sappi South Africa",
    field: "Agriculture & Environment",
    description:
      "Sappi funds bursaries specifically for forestry and forest science students to develop skills for the sustainable forestry sector.",
    eligibility:
      "South African citizens; studying Forestry Science, Conservation Ecology, Environmental Management or Silviculture at an accredited SA university.",
    value: "Tuition, accommodation and a monthly stipend",
    applicationUrl: "https://www.sappi.com/careers/bursaries",
    websiteUrl: "https://www.sappi.com/careers/bursaries",
    active: true,
  },

  // ── Built Environment & Construction ─────────────────────────────────────
  {
    id: "cidb-bursary",
    name: "CIDB Bursary",
    provider: "Construction Industry Development Board (CIDB)",
    field: "Built Environment & Construction",
    description:
      "The CIDB offers bursaries to students in the construction and built environment disciplines to develop skills for South Africa's infrastructure development.",
    eligibility:
      "South African citizens; studying Civil Engineering, Quantity Surveying, Architecture, Building Science, Construction Management or related built-environment fields.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.cidb.org.za/bursaries",
    websiteUrl: "https://www.cidb.org.za/bursaries",
    active: true,
  },
  {
    id: "sacap-bursary",
    name: "SACAP Bursary",
    provider: "South African Council for the Architectural Profession (SACAP)",
    field: "Built Environment & Construction",
    description:
      "SACAP provides bursaries to architecture and built-environment students to encourage diversity and excellence in the architectural profession.",
    eligibility:
      "South African citizens from previously disadvantaged backgrounds; studying Architecture, Architectural Technology or Interior Architecture at an accredited SA institution.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.sacapsa.com/bursaries",
    websiteUrl: "https://www.sacapsa.com/bursaries",
    active: true,
  },
  {
    id: "ppc-bursary",
    name: "PPC Cement Bursary",
    provider: "PPC Limited",
    field: "Built Environment & Construction",
    description:
      "PPC Limited offers bursaries to civil engineering and construction management students to support infrastructure skills development in South Africa.",
    eligibility:
      "South African citizens; studying Civil Engineering, Construction Management, Quantity Surveying or related built-environment fields.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.ppc.co.za/careers/bursaries",
    websiteUrl: "https://www.ppc.co.za/careers/bursaries",
    active: true,
  },
  {
    id: "asaqs-bursary",
    name: "ASAQS Bursary",
    provider: "Association of South African Quantity Surveyors (ASAQS)",
    field: "Built Environment & Construction",
    description:
      "ASAQS funds bursaries to quantity surveying students to promote and grow the profession across South Africa.",
    eligibility:
      "South African citizens; enrolled for a Quantity Surveying degree at an accredited SA university; demonstrated financial need and academic merit.",
    value: "Partial tuition subsidy",
    applicationUrl: "https://www.asaqs.co.za/bursaries",
    websiteUrl: "https://www.asaqs.co.za/bursaries",
    active: true,
  },

  // ── Arts & Creative Industries ────────────────────────────────────────────
  {
    id: "nac-bursary",
    name: "National Arts Council Bursary",
    provider: "National Arts Council of South Africa (NAC)",
    field: "Arts & Creative Industries",
    description:
      "The NAC provides bursaries to South African artists and arts students to develop talent in the visual arts, performing arts, literature and craft sectors.",
    eligibility:
      "South African citizens; pursuing formal studies or structured training in Visual Arts, Music, Dance, Theatre, Literature, Craft or related creative disciplines.",
    value: "Tuition and a study allowance",
    applicationUrl: "https://www.nac.org.za/bursary-programme/",
    websiteUrl: "https://www.nac.org.za/bursary-programme/",
    active: true,
  },
  {
    id: "nfvf-bursary",
    name: "NFVF Bursary",
    provider: "National Film and Video Foundation (NFVF)",
    field: "Arts & Creative Industries",
    description:
      "The NFVF funds bursaries for South African film and television students to develop creative and technical talent for the local screen industry.",
    eligibility:
      "South African citizens; studying Film Production, Screenwriting, Directing, Cinematography, Animation, Post-Production or related screen-industry disciplines.",
    value: "Tuition and a monthly stipend",
    applicationUrl: "https://www.nfvf.co.za/bursaries",
    websiteUrl: "https://www.nfvf.co.za/bursaries",
    active: true,
  },
  {
    id: "sabc-foundation-bursary",
    name: "SABC Education Bursary",
    provider: "South African Broadcasting Corporation (SABC)",
    field: "Arts & Creative Industries",
    description:
      "The SABC offers bursaries for broadcasting, journalism and media production students to build skills for the public broadcasting sector.",
    eligibility:
      "South African citizens; studying Journalism, Broadcasting, Media Production, Communication or Film Studies at a recognised SA institution.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.sabc.co.za/sabc/bursaries/",
    websiteUrl: "https://www.sabc.co.za/sabc/bursaries/",
    active: true,
  },

  // ── Social Sciences (additional) ─────────────────────────────────────────
  {
    id: "hsrc-bursary",
    name: "HSRC Bursary",
    provider: "Human Sciences Research Council (HSRC)",
    field: "Social Sciences",
    description:
      "The HSRC offers postgraduate bursaries in social sciences to develop South Africa's research capacity in areas such as poverty, education, health and democracy.",
    eligibility:
      "South African citizens; registered for an Honours, Masters or Doctoral degree in Social Sciences, Economics, Psychology, Sociology, Political Science or related fields at a public SA university.",
    value: "Annual stipend and research support",
    applicationUrl: "https://www.hsrc.ac.za/en/departments/bursaries",
    websiteUrl: "https://www.hsrc.ac.za/en/departments/bursaries",
    active: true,
  },
  {
    id: "lgseta-bursary",
    name: "LGSETA Bursary",
    provider: "Local Government Sector Education and Training Authority (LGSETA)",
    field: "Social Sciences",
    description:
      "LGSETA funds bursaries for students in local government and public administration to improve skills in municipal service delivery.",
    eligibility:
      "South African citizens; studying Public Administration, Local Government Management, Town Planning, Urban Studies or related fields.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.lgseta.org.za/bursaries",
    websiteUrl: "https://www.lgseta.org.za/bursaries",
    active: true,
  },

  // ── General / Multiple Fields (additional) ───────────────────────────────
  {
    id: "allan-gray-orbis-fellowship",
    name: "Allan Gray Orbis Foundation Fellowship",
    provider: "Allan Gray Orbis Foundation",
    field: "General / Multiple Fields",
    description:
      "The Allan Gray Orbis Foundation Fellowship is one of South Africa's most prestigious awards, supporting exceptional young South Africans who have entrepreneurial potential across any field of study.",
    eligibility:
      "South African citizens in Grade 11 or 12, or first-year university students; demonstrated entrepreneurial thinking, academic excellence and leadership; any field of study.",
    value: "Full tuition, accommodation, meals, books and a living allowance for the full degree",
    applicationUrl: "https://www.allangrayorbis.org",
    websiteUrl: "https://www.allangrayorbis.org",
    active: true,
  },
  {
    id: "city-of-cape-town-bursary",
    name: "City of Cape Town Bursary",
    provider: "City of Cape Town",
    field: "General / Multiple Fields",
    description:
      "The City of Cape Town offers bursaries across a range of disciplines to build skills for municipal service delivery, with a bond of service after graduation.",
    eligibility:
      "South African citizens; preferably residing in Cape Town; studying Civil/Electrical Engineering, IT, Finance, Urban Planning, Social Work or other disciplines relevant to the City.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.capetown.gov.za/work-and-business/find-a-job/bursaries",
    websiteUrl: "https://www.capetown.gov.za/work-and-business/find-a-job/bursaries",
    active: true,
    provinces: ["Western Cape"],
  },
  {
    id: "ethekwini-bursary",
    name: "eThekwini Municipality Bursary",
    provider: "eThekwini Municipality (Durban)",
    field: "General / Multiple Fields",
    description:
      "eThekwini Municipality awards bursaries across engineering, finance, IT and social services to grow capacity for municipal service delivery in KwaZulu-Natal.",
    eligibility:
      "South African citizens preferably residing in eThekwini; studying Engineering, Finance, IT, Town Planning, Social Work or other municipal disciplines.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.durban.gov.za/City_Government/Human_Capital/Pages/Bursaries.aspx",
    websiteUrl: "https://www.durban.gov.za/City_Government/Human_Capital/Pages/Bursaries.aspx",
    active: true,
    provinces: ["KwaZulu-Natal"],
  },
  {
    id: "city-of-johannesburg-bursary",
    name: "City of Johannesburg Bursary",
    provider: "City of Johannesburg",
    field: "General / Multiple Fields",
    description:
      "The City of Joburg provides bursaries to students in disciplines relevant to municipal operations, with the expectation that recipients will contribute to city development.",
    eligibility:
      "South African citizens preferably residing in Johannesburg; studying Civil Engineering, Electrical Engineering, Urban Planning, Finance, IT or related fields.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.joburg.org.za/jobs/Pages/Bursaries.aspx",
    websiteUrl: "https://www.joburg.org.za/jobs/Pages/Bursaries.aspx",
    active: true,
    provinces: ["Gauteng"],
  },
  {
    id: "wrseta-bursary",
    name: "W&RSETA Bursary",
    provider: "Wholesale and Retail Sector Education and Training Authority (W&RSETA)",
    field: "General / Multiple Fields",
    description:
      "W&RSETA funds bursaries in retail management, supply chain and commerce for students who intend to build careers in the wholesale and retail sector.",
    eligibility:
      "South African citizens; studying Retail Management, Supply Chain Management, Logistics, Commerce or related fields at an accredited SA institution.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.wrseta.org.za/bursaries",
    websiteUrl: "https://www.wrseta.org.za/bursaries",
    active: true,
  },
  {
    id: "samsa-bursary",
    name: "SAMSA Bursary",
    provider: "South African Maritime Safety Authority (SAMSA)",
    field: "General / Multiple Fields",
    description:
      "SAMSA provides bursaries for maritime studies to develop skills for the South African shipping, fishing and coastal management sectors.",
    eligibility:
      "South African citizens; studying Maritime Studies, Nautical Science, Marine Engineering or Ocean Sciences at an accredited SA institution.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.samsa.org.za/bursaries",
    websiteUrl: "https://www.samsa.org.za/bursaries",
    active: true,
  },
  {
    id: "momentum-bursary",
    name: "Momentum Metropolitan Bursary",
    provider: "Momentum Metropolitan",
    field: "General / Multiple Fields",
    description:
      "Momentum Metropolitan offers bursaries in actuarial science, finance and mathematics to support transformation in the financial services sector.",
    eligibility:
      "South African citizens from previously disadvantaged backgrounds; studying Actuarial Science, Finance, Mathematics, Statistics or BCom at a recognised SA university.",
    value: "Tuition and a monthly living allowance",
    applicationUrl: "https://www.momentummetropolitan.co.za/careers/bursaries",
    websiteUrl: "https://www.momentummetropolitan.co.za/careers/bursaries",
    active: true,
  },

  // ── Engineering & Technology (from comprehensive list) ────────────────────
  {
    id: "csir-bursary",
    name: "CSIR Bursary Programme",
    provider: "Council for Scientific and Industrial Research (CSIR)",
    field: "Engineering & Technology",
    description:
      "The CSIR offers bursaries to undergraduate and postgraduate students in science, engineering and technology to build South Africa's research and innovation capacity.",
    eligibility:
      "South African citizens; studying Engineering, Natural Sciences, Computer Science or related STEM fields at an accredited SA university; strong academic record.",
    value: "Tuition and a monthly stipend",
    applicationUrl: "https://www.csir.co.za/careers/students-graduates",
    websiteUrl: "https://www.csir.co.za/careers/students-graduates",
    active: true,
  },
  {
    id: "dsi-csir-bursary",
    name: "DSI-CSIR Inter-Bursary Support Programme",
    provider: "Department of Science and Innovation (DSI) & CSIR",
    field: "Engineering & Technology",
    description:
      "The DSI-CSIR Inter-Bursary Support Programme provides financial and research support to postgraduate students hosted at CSIR research units.",
    eligibility:
      "South African citizens; registered for a postgraduate degree (Honours, Masters or PhD) at a public SA university; conducting research aligned with CSIR priorities.",
    value: "Monthly stipend and research support",
    applicationUrl: "https://www.csir.auraams.app",
    websiteUrl: "https://www.csir.co.za/careers/students-graduates",
    active: true,
  },
  {
    id: "bmw-bursary",
    name: "BMW Group South Africa Bursary",
    provider: "BMW Group South Africa",
    field: "Engineering & Technology",
    description:
      "BMW Group SA offers bursaries to engineering and technology students to develop skills for the automotive and advanced manufacturing sector.",
    eligibility:
      "South African citizens; studying Mechanical, Electrical, Industrial or Mechatronic Engineering, or related technology fields at an accredited SA university.",
    value: "Tuition and a monthly stipend",
    applicationUrl: "https://www.bmw.co.za",
    websiteUrl: "https://www.bmw.co.za",
    active: true,
  },
  {
    id: "siemens-bursary",
    name: "Siemens Bursary",
    provider: "Siemens South Africa",
    field: "Engineering & Technology",
    description:
      "Siemens SA funds bursaries for engineering and technology students to build skills for industry automation, energy and smart infrastructure sectors.",
    eligibility:
      "South African citizens; studying Electrical, Electronic, Mechanical or Industrial Engineering, or Computer Science at an accredited SA university.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.siemens.co.za",
    websiteUrl: "https://www.siemens.co.za",
    active: true,
  },
  {
    id: "abb-bursary",
    name: "ABB South Africa Bursary",
    provider: "ABB South Africa",
    field: "Engineering & Technology",
    description:
      "ABB SA provides bursaries for electrical and instrumentation engineering students to develop talent for energy and automation technology sectors.",
    eligibility:
      "South African citizens; studying Electrical, Instrumentation, Mechatronic or Electronic Engineering at an accredited SA university.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.abb.co.za",
    websiteUrl: "https://www.abb.co.za",
    active: true,
  },
  {
    id: "sitfe-bursary",
    name: "SITFE Bursary",
    provider: "Sugar Industry Trust Fund for Education (SITFE)",
    field: "Engineering & Technology",
    description:
      "SITFE provides bursaries to students in engineering, agriculture and related fields to develop skills for the South African sugar industry.",
    eligibility:
      "South African citizens; studying Chemical, Mechanical or Agricultural Engineering, or Agriculture at an accredited SA university; preference for students from sugar-growing communities.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.sitfe.co.za/bursaries/",
    websiteUrl: "https://www.sitfe.co.za/bursaries/",
    active: true,
  },

  // ── Mining & Resources (from comprehensive list) ──────────────────────────
  {
    id: "exxaro-bursary",
    name: "Exxaro Bursary",
    provider: "Exxaro Resources",
    field: "Mining & Resources",
    description:
      "Exxaro Resources offers bursaries to mining and engineering students to develop skills for South Africa's coal and other minerals sector.",
    eligibility:
      "South African citizens; studying Mining Engineering, Metallurgy, Geology, Electrical or Mechanical Engineering; strong academic performance in Maths and Science.",
    value: "Full tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.exxaro.com/careers",
    websiteUrl: "https://www.exxaro.com/careers",
    active: true,
  },
  {
    id: "bhp-bursary",
    name: "BHP Billiton Bursary",
    provider: "BHP",
    field: "Mining & Resources",
    description:
      "BHP offers bursaries to engineering and geoscience students for careers in its South African mining operations.",
    eligibility:
      "South African citizens; studying Mining, Geological, Metallurgical, Mechanical or Electrical Engineering at an accredited SA university.",
    value: "Tuition, accommodation and a monthly allowance",
    applicationUrl: "https://www.bhp.com/careers",
    websiteUrl: "https://www.bhp.com/careers",
    active: true,
  },

  // ── Built Environment & Construction (from comprehensive list) ─────────────
  {
    id: "hatch-bursary",
    name: "Hatch Engineering Bursary",
    provider: "Hatch Africa",
    field: "Built Environment & Construction",
    description:
      "Hatch offers bursaries to engineering students, supporting future professionals in mining, energy, infrastructure and manufacturing sectors.",
    eligibility:
      "South African citizens; studying Civil, Mechanical, Electrical, Chemical or Mining Engineering at an accredited SA university; strong academic record.",
    value: "Tuition and a study allowance",
    applicationUrl: "https://www.hatch.com/careers",
    websiteUrl: "https://www.hatch.com/careers",
    active: true,
  },
  {
    id: "aurecon-bursary",
    name: "Aurecon Bursary",
    provider: "Aurecon Group",
    field: "Built Environment & Construction",
    description:
      "Aurecon provides bursaries to built-environment and engineering students to develop the next generation of professionals in infrastructure design and consulting.",
    eligibility:
      "South African citizens; studying Civil, Structural, Mechanical, Electrical or Industrial Engineering, or related built-environment disciplines.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.aurecongroup.com/careers",
    websiteUrl: "https://www.aurecongroup.com/careers",
    active: true,
  },

  // ── Finance & Accounting (from comprehensive list) ────────────────────────
  {
    id: "shoprite-bursary",
    name: "Shoprite Checkers Accounting Bursary",
    provider: "Shoprite Group",
    field: "Finance & Accounting",
    description:
      "Shoprite Checkers funds accounting and finance bursaries to develop the next generation of financial professionals for South Africa's largest food retailer.",
    eligibility:
      "South African citizens; studying BCom Accounting, Finance or related qualifications at an accredited SA university; strong academic record.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.setacareers.co.za",
    websiteUrl: "https://www.setacareers.co.za",
    active: true,
  },
  {
    id: "agsa-bursary",
    name: "Auditor-General SA (AGSA) Bursary",
    provider: "Auditor-General of South Africa (AGSA)",
    field: "Finance & Accounting",
    description:
      "The Auditor-General SA offers bursaries to accounting and auditing students who aspire to work in public-sector auditing and accountability.",
    eligibility:
      "South African citizens; studying BCom Accounting, Auditing or equivalent CA(SA) pathway; minimum 65% average; commitment to work for AGSA after graduation.",
    value: "Full tuition and a monthly allowance",
    applicationUrl:
      "https://www.agsa.co.za/Careers/GraduateRecruitmentProgramme/Bursaries.aspx",
    websiteUrl:
      "https://www.agsa.co.za/Careers/GraduateRecruitmentProgramme/Bursaries.aspx",
    active: true,
  },

  // ── Law & Justice (from comprehensive list) ───────────────────────────────
  {
    id: "lpff-bursary",
    name: "Legal Practitioners Fidelity Fund Bursary",
    provider: "Legal Practitioners Fidelity Fund (LPFF)",
    field: "Law & Justice",
    description:
      "The Legal Practitioners Fidelity Fund awards bursaries to aspiring attorneys to encourage entry into the legal profession, particularly from previously disadvantaged backgrounds.",
    eligibility:
      "South African citizens; studying LLB at an accredited SA university; demonstrated financial need and academic merit.",
    value: "Partial to full tuition subsidy",
    applicationUrl: "https://www.fidfund.co.za/bursaries/",
    websiteUrl: "https://www.fidfund.co.za/bursaries/",
    active: true,
  },

  // ── Health Sciences (from comprehensive list) ─────────────────────────────
  {
    id: "aspen-bursary",
    name: "Aspen Pharmacare Bursary",
    provider: "Aspen Pharmacare",
    field: "Health Sciences",
    description:
      "Aspen Pharmacare offers bursaries to pharmacy and health sciences students to develop talent for South Africa's pharmaceutical manufacturing sector.",
    eligibility:
      "South African citizens; studying Pharmacy, Pharmaceutical Sciences, Chemical Engineering, Biochemistry or related health sciences at an accredited SA university.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.aspenpharma.com/bursary-applications/",
    websiteUrl: "https://www.aspenpharma.com/bursary-applications/",
    active: true,
  },

  // ── Agriculture & Environment (from comprehensive list) ───────────────────
  {
    id: "hortgro-bursary",
    name: "Hortgro Services Bursary",
    provider: "Hortgro",
    field: "Agriculture & Environment",
    description:
      "Hortgro Services funds bursaries for students in horticulture and deciduous fruit production to develop skills for the South African fruit industry.",
    eligibility:
      "South African citizens; studying Horticulture, Agronomy, Plant Science, Agricultural Management or related disciplines at an accredited SA institution.",
    value: "Tuition and study materials",
    applicationUrl: "https://bit.ly/41jfemm",
    websiteUrl: "https://www.hortgro.co.za",
    active: true,
  },

  // ── Social Sciences (from comprehensive list) ─────────────────────────────
  {
    id: "nihss-bursary",
    name: "NIHSS Doctoral Scholarships",
    provider: "National Institute for the Humanities and Social Sciences (NIHSS)",
    field: "Social Sciences",
    description:
      "The NIHSS awards doctoral scholarships to support high-quality research in the humanities and social sciences to transform South Africa's academic landscape.",
    eligibility:
      "South African citizens or permanent residents; registered for a doctoral degree in Humanities, Social Sciences, Languages, Education, Law or related fields; demonstrated research potential.",
    value: "Annual stipend and research support",
    applicationUrl: "https://www.nihss.ac.za/doctoral-scholarships-programmes",
    websiteUrl: "https://www.nihss.ac.za/doctoral-scholarships-programmes",
    active: true,
  },

  // ── Education (from comprehensive list) ──────────────────────────────────
  {
    id: "jakes-gerwel-fellowship",
    name: "Jakes Gerwel Fellowship",
    provider: "Jakes Gerwel Foundation",
    field: "Education",
    description:
      "The Jakes Gerwel Fellowship supports exceptional postgraduate students committed to contributing to equity, social justice and public service in South Africa.",
    eligibility:
      "South African citizens; registered for a postgraduate degree; demonstrated commitment to social justice and public leadership; strong academic excellence.",
    value: "Annual fellowship stipend",
    applicationUrl: "https://www.jgf.org.za",
    websiteUrl: "https://www.jgf.org.za",
    active: true,
  },
  {
    id: "kagiso-trust-bursary",
    name: "Kagiso Trust Bursary",
    provider: "Kagiso Trust",
    field: "Education",
    description:
      "Kagiso Trust provides bursaries focused on education, community development and social transformation, with priority for students from disadvantaged backgrounds.",
    eligibility:
      "South African citizens from previously disadvantaged backgrounds; studying Education, Social Work, Community Development, Engineering or Health Sciences.",
    value: "Tuition and a monthly allowance",
    applicationUrl: "https://www.kagisotrust.org",
    websiteUrl: "https://www.kagisotrust.org",
    active: true,
  },
  {
    id: "sace-bursary",
    name: "SACE Teaching Bursary",
    provider: "South African Council for Educators (SACE)",
    field: "Education",
    description:
      "SACE supports student teachers through bursaries to strengthen the quality and quantity of qualified educators in South Africa's schooling system.",
    eligibility:
      "South African citizens; studying B.Ed or PGCE at an accredited SA university; commitment to teaching in South African schools.",
    value: "Tuition subsidy and study materials",
    applicationUrl: "https://www.sace.org.za",
    websiteUrl: "https://www.sace.org.za",
    active: true,
  },

  // ── General / Multiple Fields (from comprehensive list) ───────────────────
  {
    id: "sa-navy-bursary",
    name: "South African Navy Bursary",
    provider: "South African National Defence Force (SANDF) – Navy",
    field: "General / Multiple Fields",
    description:
      "The South African Navy offers bursaries and cadetships to students pursuing careers in naval sciences and engineering, with a commitment to serve in the Navy after graduation.",
    eligibility:
      "South African citizens; physically fit; studying Engineering, Maritime Studies, Computer Science or related fields; willing to serve in the Navy after graduation.",
    value: "Full tuition, accommodation, meals, uniform and a salary",
    applicationUrl: "https://www.navy.mil.za",
    websiteUrl: "https://www.navy.mil.za",
    active: true,
  },
  {
    id: "sa-air-force-bursary",
    name: "South African Air Force Bursary",
    provider: "South African National Defence Force (SANDF) – Air Force",
    field: "General / Multiple Fields",
    description:
      "The SA Air Force offers bursaries and cadetships for students in aviation, engineering and related fields, with a commitment to serve in the SAAF after graduation.",
    eligibility:
      "South African citizens; physically fit; studying Aeronautical, Mechanical or Electronic Engineering, Computer Science or Aviation-related fields; willing to serve in the SAAF.",
    value: "Full tuition, accommodation, meals, uniform and a salary",
    applicationUrl: "https://www.af.mil.za",
    websiteUrl: "https://www.af.mil.za",
    active: true,
  },
  {
    id: "hollywood-foundation-bursary",
    name: "Hollywood Foundation Bursary",
    provider: "Hollywood Foundation",
    field: "General / Multiple Fields",
    description:
      "The Hollywood Foundation offers bursaries to financially deserving South African students across a range of study fields through its dedicated online bursary portal.",
    eligibility:
      "South African citizens from financially disadvantaged backgrounds; studying at an accredited SA university or TVET college; any field of study.",
    value: "Tuition and study materials",
    applicationUrl: "https://mycommunity.devman.co.za/devman/bursary/portal/signin/",
    websiteUrl: "https://mycommunity.devman.co.za/devman/bursary/portal/signin/",
    active: true,
  },
  {
    id: "blind-sa-bursary",
    name: "Blind SA Bursary",
    provider: "Blind SA (SA National Council for the Blind)",
    field: "General / Multiple Fields",
    description:
      "Blind SA provides bursaries to South African students who are blind or visually impaired to support their higher education in any field of study.",
    eligibility:
      "South African citizens who are blind or visually impaired; studying at an accredited SA university or TVET college; any field of study.",
    value: "Tuition and study materials",
    applicationUrl: "https://www.blindsa.org.za",
    websiteUrl: "https://www.blindsa.org.za",
    active: true,
  },
  {
    id: "sanzaf-bursary",
    name: "SANZAF Bursary Programme",
    provider: "South African National Zakah Fund (SANZAF)",
    field: "General / Multiple Fields",
    description:
      "SANZAF awards bursaries to financially deserving Muslim students in South Africa across a range of disciplines, funded through Islamic charitable giving (Zakah).",
    eligibility:
      "South African Muslim citizens from financially disadvantaged backgrounds; studying at an accredited SA university or TVET college; any field of study.",
    value: "Tuition and study materials",
    applicationUrl: "https://sanzaf.org.za/projects/bursary-program",
    websiteUrl: "https://sanzaf.org.za/projects/bursary-program",
    active: true,
  },
  {
    id: "isfap-bursary",
    name: "ISFAP Bursary",
    provider: "Ikusasa Student Financial Aid Programme (ISFAP)",
    field: "General / Multiple Fields",
    description:
      "ISFAP provides funding to 'missing middle' students — those from households too wealthy for NSFAS but unable to afford university fees — studying high-demand fields.",
    eligibility:
      "South African citizens from households with income between R350,000 and R600,000 per year; studying high-priority fields at an accredited SA university.",
    value: "Tuition, accommodation and a living allowance",
    applicationUrl: "https://www.isfap.org.za",
    websiteUrl: "https://www.isfap.org.za",
    active: true,
  },
  {
    id: "feenix-bursary",
    name: "Feenix Student Crowdfunding",
    provider: "Feenix",
    field: "General / Multiple Fields",
    description:
      "Feenix is a crowdfunding platform that connects South African students with donors who want to fund higher education, enabling students to raise funds for their studies.",
    eligibility:
      "South African citizens studying at an accredited SA university; any field of study; students create a personal campaign profile on the platform.",
    value: "Crowdfunded tuition contributions (amount varies by campaign)",
    applicationUrl: "https://www.feenix.org",
    websiteUrl: "https://www.feenix.org",
    active: true,
  },
];

/**
 * Returns bursaries relevant to a specific province.
 * Province-specific bursaries for that province come first, then nationwide bursaries.
 */
export function getBursariesForProvince(province: string, limit = 6): Bursary[] {
  const specific = BURSARIES.filter(
    (b) => b.provinces && b.provinces.includes(province)
  );
  const national = BURSARIES.filter((b) => !b.provinces || b.provinces.length === 0);
  return [...specific, ...national].slice(0, limit);
}
