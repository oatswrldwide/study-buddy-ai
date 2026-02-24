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
  "Social Sciences",
  "General / Multiple Fields",
] as const;

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
    applicationUrl: "https://www.sasol.com/careers/bursaries",
    websiteUrl: "https://www.sasol.com/careers/bursaries",
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
    applicationUrl: "https://www.debeersgroup.com/careers/bursaries",
    websiteUrl: "https://www.debeersgroup.com/careers/bursaries",
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
    applicationUrl: "https://www.saica.co.za/thuthuka-bursary-fund",
    websiteUrl: "https://www.saica.co.za/thuthuka-bursary-fund",
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
    applicationUrl: "https://www.pwc.co.za/en/careers/students/bursaries.html",
    websiteUrl: "https://www.pwc.co.za/en/careers/students/bursaries.html",
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
    applicationUrl: "https://www.dimensiondata.com/en-za/careers/graduates/bursaries",
    websiteUrl: "https://www.dimensiondata.com/en-za/careers/graduates/bursaries",
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
    applicationUrl: "https://www.funzalushaka.doe.gov.za/",
    websiteUrl: "https://www.funzalushaka.doe.gov.za/",
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
    applicationUrl: "https://www.nrf.ac.za/opportunities/",
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
    applicationUrl: "https://www.mqa.org.za/bursaries",
    websiteUrl: "https://www.mqa.org.za/bursaries",
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
    applicationUrl: "https://www.nsfas.org.za/content/apply.html",
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
    applicationUrl: "https://www.oldmutualfoundation.co.za/bursaries",
    websiteUrl: "https://www.oldmutualfoundation.co.za/bursaries",
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
    applicationUrl: "https://www.angloamerican.com/careers/bursaries",
    websiteUrl: "https://www.angloamerican.com/careers/bursaries",
    active: true,
  },
];
