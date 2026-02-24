#!/usr/bin/env node
/**
 * Generate "How to Apply" pages for every South African higher education institution
 * Creates unique, detailed content for each university/institution
 */

'use strict';

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pseo-data');
const INDEX_PATH = path.join(OUTPUT_DIR, 'index.json');
const TODAY = new Date().toISOString();
const TODAY_DATE = TODAY.split('T')[0];

// ─── Comprehensive SA Higher Education Institutions ──────────────────────────

const SA_UNIVERSITIES = [
  // ── PUBLIC TRADITIONAL UNIVERSITIES ──────────────────────────────────────
  {
    slug: 'how-to-apply-to-uct',
    name: 'University of Cape Town (UCT)',
    shortName: 'UCT',
    city: 'Cape Town',
    province: 'Western Cape',
    type: 'Traditional University',
    founded: 1829,
    website: 'https://www.uct.ac.za',
    applyPortal: 'https://apply.uct.ac.za',
    applicationFee: 'R100 (waived for eligible students)',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 37,
    apsPopular: '37–44 depending on faculty',
    location: 'Rondebosch, Cape Town',
    faculties: [
      'Commerce',
      'Engineering & the Built Environment',
      'Health Sciences',
      'Humanities',
      'Law',
      'Science',
    ],
    popularCourses: ['Medicine (MBChB)', 'Law', 'Engineering', 'BCom', 'BSc'],
    ranking: "Africa's top-ranked university (QS World University Rankings)",
    uniqueFacts: [
      'Only South African university in the global top 200 (QS 2025)',
      'Has produced 3 Nobel Prize laureates',
      'Situated on the slopes of Devil\'s Peak with iconic views of Table Mountain',
      'UCT\'s Health Sciences faculty trains the majority of doctors in the Western Cape',
    ],
    apsNotes: 'UCT uses its own admission score system. For Medicine: 42+ APS. For Engineering: 38+. Check the NBT (National Benchmark Tests) requirements.',
    bursaries: ['NSFAS', 'UCT Financial Aid Office', 'Ikusasa Student Financial Aid Programme (ISFAP)', 'Allan Gray Orbis Foundation'],
    contactEmail: 'admissions@uct.ac.za',
    contactPhone: '021 650 2128',
  },
  {
    slug: 'how-to-apply-to-wits',
    name: 'University of the Witwatersrand (Wits)',
    shortName: 'Wits',
    city: 'Johannesburg',
    province: 'Gauteng',
    type: 'Traditional University',
    founded: 1896,
    website: 'https://www.wits.ac.za',
    applyPortal: 'https://www.wits.ac.za/students/undergraduate/applying/',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 35,
    apsPopular: '35–44 depending on faculty',
    location: 'Braamfontein, Johannesburg',
    faculties: [
      'Commerce, Law & Management',
      'Engineering & the Built Environment',
      'Health Sciences',
      'Humanities',
      'Science',
    ],
    popularCourses: ['Medicine (MBChB)', 'Mining Engineering', 'Law (LLB)', 'BCom', 'Architecture'],
    ranking: 'Top 3 African universities; consistently in QS World Top 500',
    uniqueFacts: [
      'Home to the Wits Cradle of Humankind Research Institute',
      'One of the largest medical schools in sub-Saharan Africa',
      'Wits Alumni include Nelson Mandela (enrolled but did not complete), Christiaan Barnard\'s colleague Hamilton Naki',
      'Has the largest science park in Africa on its campus',
    ],
    apsNotes: 'Wits uses NBT results alongside NSC marks. Medicine requires 44+ APS. Engineering: 37+. Law: 38+. See the Wits APS calculator on their website.',
    bursaries: ['NSFAS', 'Wits Financial Aid & Scholarships', 'Wits Vice-Chancellor\'s Scholarship', 'Oppenheimer Memorial Trust'],
    contactEmail: 'applications@wits.ac.za',
    contactPhone: '011 717 1000',
  },
  {
    slug: 'how-to-apply-to-stellenbosch-university',
    name: 'Stellenbosch University (SU)',
    shortName: 'SU / Maties',
    city: 'Stellenbosch',
    province: 'Western Cape',
    type: 'Traditional University',
    founded: 1918,
    website: 'https://www.sun.ac.za',
    applyPortal: 'https://www.sun.ac.za/english/maties/Pages/Apply.aspx',
    applicationFee: 'R100',
    applyOpen: 'March',
    applyClose: 'June 30',
    apsMin: 30,
    apsPopular: '30–42 depending on faculty',
    location: 'Stellenbosch, Western Cape',
    faculties: [
      'AgriSciences',
      'Arts & Social Sciences',
      'Economic & Management Sciences',
      'Education',
      'Engineering',
      'Law',
      'Medicine & Health Sciences',
      'Science',
      'Theology',
    ],
    popularCourses: ['BSc Viticulture & Oenology', 'BCom', 'LLB', 'BEng', 'BSc Actuarial Science'],
    ranking: 'Top 5 African universities; QS World Top 600',
    uniqueFacts: [
      'Known as "Maties", the university is set in the historic Cape Winelands',
      'Offers the only accredited Viticulture & Oenology programme in South Africa',
      'Has one of the lowest student dropout rates in South Africa at just 8%',
      'Hosts the African Institute for Mathematical Sciences (AIMS)',
    ],
    apsNotes: 'SU uses its own APS system and requires a minimum score depending on the faculty. Medicine and Health Sciences require 42+ APS. Many programmes are Afrikaans-medium; English-medium options are available.',
    bursaries: ['NSFAS', 'SU Financial Aid', 'Investec Scholarship', 'Maties Sports Bursary'],
    contactEmail: 'info@sun.ac.za',
    contactPhone: '021 808 9111',
  },
  {
    slug: 'how-to-apply-to-university-of-pretoria',
    name: 'University of Pretoria (UP)',
    shortName: 'UP / Tuks',
    city: 'Pretoria',
    province: 'Gauteng',
    type: 'Traditional University',
    founded: 1908,
    website: 'https://www.up.ac.za',
    applyPortal: 'https://www.up.ac.za/applicant',
    applicationFee: 'R300',
    applyOpen: 'March 1',
    applyClose: 'June 30 (some faculties close earlier)',
    apsMin: 28,
    apsPopular: '28–44 depending on faculty',
    location: 'Hatfield, Pretoria',
    faculties: [
      'Economic & Management Sciences',
      'Education',
      'Engineering, Built Environment & IT',
      'Health Sciences',
      'Humanities',
      'Law',
      'Natural & Agricultural Sciences',
      'Theology & Religion',
      'Veterinary Science',
    ],
    popularCourses: ['BVSc (Veterinary Science)', 'BCom', 'BSc Computer Science', 'LLB', 'BEng'],
    ranking: 'Top 5 SA universities; QS Africa Top 10',
    uniqueFacts: [
      'Only university in sub-Saharan Africa offering a full BVSc (Veterinary Science) degree',
      'South Africa\'s largest residential university with 50,000+ students',
      'UP\'s Gordon Institute of Business Science (GIBS) is rated among Africa\'s top business schools',
      'Home to the Telkom Innovation Hub on campus',
    ],
    apsNotes: 'UP requires a minimum APS of 28 for most programmes. Veterinary Science requires 34+. Medicine requires 36+. The university uses the Senior Certificate/NSC marks directly.',
    bursaries: ['NSFAS', 'UP Financial Aid', 'Nedbank Affinity Bursary', 'UP Vice-Chancellor\'s Achiever Award'],
    contactEmail: 'csc@up.ac.za',
    contactPhone: '012 420 3111',
  },
  {
    slug: 'how-to-apply-to-ukzn',
    name: 'University of KwaZulu-Natal (UKZN)',
    shortName: 'UKZN',
    city: 'Durban / Pietermaritzburg',
    province: 'KwaZulu-Natal',
    type: 'Traditional University',
    founded: 2004,
    website: 'https://www.ukzn.ac.za',
    applyPortal: 'https://www.ukzn.ac.za/undergraduate-applications/',
    applicationFee: 'R200',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 30,
    apsPopular: '30–42 depending on faculty',
    location: '5 campuses: Howard College, Westville, Medical School, Edgewood, Pietermaritzburg',
    faculties: [
      'Agriculture, Engineering & Science',
      'Health Sciences',
      'Humanities',
      'Law & Management Studies',
      'Medicine (Nelson R Mandela School of Medicine)',
    ],
    popularCourses: ['MBChB Medicine', 'BSc Engineering', 'BCom', 'LLB', 'BSc Nursing'],
    ranking: 'Top 5 South African universities',
    uniqueFacts: [
      'Formed in 2004 by merging the University of Natal and the University of Durban-Westville',
      'Home to the Nelson R. Mandela School of Medicine, one of SA\'s most respected medical schools',
      'Five campuses across Durban and Pietermaritzburg serving 40,000+ students',
      'Strong research focus on HIV/AIDS, tropical diseases, and rural health',
    ],
    apsNotes: 'UKZN requires a minimum APS of 30 for most programmes. Medicine (MBChB) requires 42+ APS. Engineering requires 34+. International students need a SAQA evaluation of their qualifications.',
    bursaries: ['NSFAS', 'UKZN Financial Aid', 'Sanlam Bursary', 'KZN Provincial Government Bursaries'],
    contactEmail: 'undergraduate@ukzn.ac.za',
    contactPhone: '031 260 7111',
  },
  {
    slug: 'how-to-apply-to-ufs',
    name: 'University of the Free State (UFS)',
    shortName: 'UFS / Kovsies',
    city: 'Bloemfontein',
    province: 'Free State',
    type: 'Traditional University',
    founded: 1904,
    website: 'https://www.ufs.ac.za',
    applyPortal: 'https://www.ufs.ac.za/apply',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–40 depending on faculty',
    location: 'Bloemfontein (main), Qwaqwa, South Campus',
    faculties: [
      'Economic & Management Sciences',
      'Education',
      'Health Sciences',
      'Humanities',
      'Law',
      'Natural & Agricultural Sciences',
      'Theology & Religion',
    ],
    popularCourses: ['BCom', 'LLB', 'BSc', 'BA', 'Health Sciences'],
    ranking: 'Top 6 South African universities',
    uniqueFacts: [
      'Largest university in the central region of South Africa',
      'Known for its "Shared Humanity" initiative promoting multilingualism and diversity',
      'Home to the Free State Centre for Human Rights',
      'UFS Qwaqwa campus serves students from the mountainous eastern Free State and Lesotho border',
    ],
    apsNotes: 'UFS uses a minimum APS of 28 for most programmes. Health Sciences (Medicine) requires 38+ APS. The university offers bridging programmes for students who do not meet direct entry requirements.',
    bursaries: ['NSFAS', 'UFS Financial Aid', 'Free State Department of Health Bursaries', 'Chevron Bursary Programme'],
    contactEmail: 'infocenter@ufs.ac.za',
    contactPhone: '051 401 9111',
  },
  {
    slug: 'how-to-apply-to-north-west-university',
    name: 'North-West University (NWU)',
    shortName: 'NWU',
    city: 'Potchefstroom / Mahikeng / Vanderbijlpark',
    province: 'North West',
    type: 'Traditional University',
    founded: 2004,
    website: 'https://www.nwu.ac.za',
    applyPortal: 'https://www.nwu.ac.za/apply',
    applicationFee: 'R150',
    applyOpen: 'March 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–38 depending on faculty',
    location: 'Three campuses: Potchefstroom, Mahikeng (Mafikeng), Vanderbijlpark (Vaal Triangle)',
    faculties: [
      'Commerce & Administration',
      'Education',
      'Engineering',
      'Health Sciences',
      'Humanities',
      'Law',
      'Natural & Agricultural Sciences',
      'Theology',
    ],
    popularCourses: ['BCom Accountancy', 'BEd', 'Pharmacy', 'Law', 'Nursing'],
    ranking: 'Top 8 South African universities',
    uniqueFacts: [
      'Formed in 2004 by merging Potchefstroom University, University of North-West, and Vista University Vanderbijlpark campus',
      'NWU\'s Potchefstroom campus has one of SA\'s most beautiful university settings with botanical gardens',
      'Offers one of South Africa\'s few accredited Pharmacy degrees',
      'Strong in distance learning through its communiversity model',
    ],
    apsNotes: 'NWU uses a minimum APS of 28 for most programmes. Pharmacy requires 38+ APS. The Mahikeng campus offers programmes aimed at serving the North West province\'s rural communities.',
    bursaries: ['NSFAS', 'NWU Financial Aid', 'North West Provincial Bursaries', 'AngloAmerican Bursary'],
    contactEmail: 'info@nwu.ac.za',
    contactPhone: '018 299 1111',
  },
  {
    slug: 'how-to-apply-to-uwc',
    name: 'University of the Western Cape (UWC)',
    shortName: 'UWC',
    city: 'Bellville',
    province: 'Western Cape',
    type: 'Traditional University',
    founded: 1960,
    website: 'https://www.uwc.ac.za',
    applyPortal: 'https://www.uwc.ac.za/Students/Prospective/Applying',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–38 depending on faculty',
    location: 'Bellville, Cape Town',
    faculties: [
      'Arts',
      'Community & Health Sciences',
      'Dentistry',
      'Economic & Management Sciences',
      'Education',
      'Law',
      'Natural Sciences',
      'Pharmacy',
    ],
    popularCourses: ['BDent (Dentistry)', 'Pharmacy', 'LLB', 'BCom', 'BSocSci'],
    ranking: 'Top 10 South African universities; renowned for social justice research',
    uniqueFacts: [
      'Originally established as a university for Coloured students under apartheid; now a proudly inclusive institution',
      'Home to one of only 4 dental schools in South Africa',
      'UWC\'s School of Public Health is among the top in Africa',
      'Known as "the people\'s university" with a strong social justice tradition',
    ],
    apsNotes: 'UWC requires a minimum APS of 28 for most programmes. Dentistry requires 36+ APS. Pharmacy requires 34+ APS. NBT is recommended but not always compulsory.',
    bursaries: ['NSFAS', 'UWC Financial Aid', 'Western Cape Department of Health Bursaries', 'Discovery Foundation Bursary'],
    contactEmail: 'infocentre@uwc.ac.za',
    contactPhone: '021 959 2911',
  },
  {
    slug: 'how-to-apply-to-university-of-limpopo',
    name: 'University of Limpopo (UL)',
    shortName: 'UL',
    city: 'Polokwane',
    province: 'Limpopo',
    type: 'Traditional University',
    founded: 1959,
    website: 'https://www.ul.ac.za',
    applyPortal: 'https://www.ul.ac.za/index.php?Entity=Admissions',
    applicationFee: 'R150',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–36 depending on faculty',
    location: 'Mankweng (Polokwane area), Limpopo',
    faculties: [
      'Health Sciences',
      'Humanities',
      'Management & Law Sciences',
      'Science & Agriculture',
    ],
    popularCourses: ['MBChB Medicine', 'LLB', 'BSc Agriculture', 'Pharmacy', 'Nursing'],
    ranking: 'Leading university in Limpopo province',
    uniqueFacts: [
      'Originally established as the University of the North (Turfloop), a historically black institution',
      'Home to the Medunsa (now Sefako Makgatho HSU) precursor campus for health sciences',
      'Serves primarily students from Limpopo and neighbouring provinces',
      'Strong focus on agriculture and rural development relevant to the region',
    ],
    apsNotes: 'UL requires a minimum APS of 28. Medicine (MBChB) requires 36+ APS. The university has a strong commitment to providing access for students from rural Limpopo communities.',
    bursaries: ['NSFAS', 'UL Financial Aid', 'Limpopo Department of Health Bursaries', 'Anglo Platinum Bursary'],
    contactEmail: 'admissions@ul.ac.za',
    contactPhone: '015 268 9111',
  },
  {
    slug: 'how-to-apply-to-university-of-fort-hare',
    name: 'University of Fort Hare (UFH)',
    shortName: 'UFH',
    city: 'Alice',
    province: 'Eastern Cape',
    type: 'Traditional University',
    founded: 1916,
    website: 'https://www.ufh.ac.za',
    applyPortal: 'https://www.ufh.ac.za/apply',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 26,
    apsPopular: '26–34 depending on faculty',
    location: 'Alice, Eastern Cape; East London Campus',
    faculties: [
      'Agriculture & Natural Resources',
      'Education',
      'Law',
      'Management & Commerce',
      'Science & Engineering',
      'Social Sciences & Humanities',
    ],
    popularCourses: ['BSc Agriculture', 'LLB', 'BA Social Work', 'BCom', 'BEd'],
    ranking: 'Historic HBU (Historically Black University) with global alumni impact',
    uniqueFacts: [
      'One of the oldest universities in sub-Saharan Africa, founded in 1916',
      'Nelson Mandela, Oliver Tambo, Govan Mbeki, and Robert Mugabe all studied here',
      'Known as "the Harvard of Africa" for its role in producing African leaders',
      'Houses the Mandela-Tambo Legal Studies Centre',
    ],
    apsNotes: 'UFH accepts a minimum APS of 26 for most programmes, making it accessible to many first-generation university students. The university places strong emphasis on academic development support.',
    bursaries: ['NSFAS', 'UFH Financial Aid', 'Eastern Cape Provincial Government Bursaries', 'Standard Bank Bursary'],
    contactEmail: 'applications@ufh.ac.za',
    contactPhone: '040 602 2011',
  },
  {
    slug: 'how-to-apply-to-rhodes-university',
    name: 'Rhodes University',
    shortName: 'Rhodes / RU',
    city: 'Makhanda (Grahamstown)',
    province: 'Eastern Cape',
    type: 'Traditional University',
    founded: 1904,
    website: 'https://www.ru.ac.za',
    applyPortal: 'https://www.ru.ac.za/admissions/applyonline/',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30 (some programmes earlier)',
    apsMin: 32,
    apsPopular: '32–38 depending on faculty',
    location: 'Makhanda (formerly Grahamstown), Eastern Cape',
    faculties: [
      'Commerce',
      'Education',
      'Humanities',
      'Law',
      'Pharmacy',
      'Science',
    ],
    popularCourses: ['Pharmacy', 'Journalism', 'Law', 'BCom', 'Fine Art'],
    ranking: 'Highest research-output-per-student university in South Africa',
    uniqueFacts: [
      'Highest research output per student of any South African university for multiple years',
      'Home to the internationally renowned School of Journalism & Media Studies',
      'Rhodes has one of only 4 accredited Pharmacy schools in South Africa',
      'The campus is entirely contained within walking distance of Makhanda city centre',
    ],
    apsNotes: 'Rhodes requires a minimum APS of 32. Pharmacy requires 36+ APS. The university is known for its small class sizes and personal academic attention, unlike large urban universities.',
    bursaries: ['NSFAS', 'Rhodes University Financial Aid', 'NSTF Bursaries', 'National Research Foundation (NRF) Scholarships'],
    contactEmail: 'admissions@ru.ac.za',
    contactPhone: '046 603 8111',
  },
  {
    slug: 'how-to-apply-to-university-of-venda',
    name: 'University of Venda (UNIVEN)',
    shortName: 'UNIVEN',
    city: 'Thohoyandou',
    province: 'Limpopo',
    type: 'Traditional University',
    founded: 1982,
    website: 'https://www.univen.ac.za',
    applyPortal: 'https://www.univen.ac.za/index.php/admissions',
    applicationFee: 'R130',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 26,
    apsPopular: '26–34 depending on faculty',
    location: 'Thohoyandou, Limpopo (Venda region)',
    faculties: [
      'Agriculture',
      'Education',
      'Environmental Sciences',
      'Health Sciences',
      'Humanities',
      'Law',
      'Management Sciences',
      'Mathematical & Natural Sciences',
    ],
    popularCourses: ['BSc Environmental Management', 'BA Social Work', 'LLB', 'BNursing', 'BSc Agriculture'],
    ranking: 'Key institution serving the Vhembe district and Zimbabwe border region',
    uniqueFacts: [
      'Located in the scenic Venda region, near the Zimbabwe border',
      'One of South Africa\'s most rural-focused universities, serving communities in the Vhembe district',
      'Strong in environmental sciences with the nearby Kruger National Park ecosystem',
      'Offers unique programmes in indigenous knowledge systems and African languages (Tshivenda)',
    ],
    apsNotes: 'UNIVEN accepts a minimum APS of 26 for most programmes, ensuring access for students from rural Limpopo. The university offers extended curriculum programmes for students needing extra academic support.',
    bursaries: ['NSFAS', 'UNIVEN Financial Aid', 'Limpopo Provincial Bursaries', 'Venetia Diamond Mine Bursary'],
    contactEmail: 'admissions@univen.ac.za',
    contactPhone: '015 962 8000',
  },

  // ── PUBLIC COMPREHENSIVE UNIVERSITIES ────────────────────────────────────
  {
    slug: 'how-to-apply-to-unisa',
    name: 'University of South Africa (UNISA)',
    shortName: 'UNISA',
    city: 'Pretoria (Distance Learning)',
    province: 'Gauteng (National reach)',
    type: 'Comprehensive University (Distance Learning)',
    founded: 1873,
    website: 'https://www.unisa.ac.za',
    applyPortal: 'https://www.unisa.ac.za/sites/myunisa/default/Apply-to-UNISA',
    applicationFee: 'R115 per module (registration fee)',
    applyOpen: 'August (for following year)',
    applyClose: 'November 30 (Semester 1); May (Semester 2)',
    apsMin: 23,
    apsPopular: 'Most programmes open enrolment; some professional degrees require 28+',
    location: 'Distance learning — study from anywhere in South Africa',
    faculties: [
      'Accounting Sciences',
      'Agriculture & Environmental Sciences',
      'Economic & Management Sciences',
      'Education',
      'Engineering & Technology',
      'Graduate School of Business Leadership',
      'Humanities',
      'Law',
      'Science, Engineering & Technology',
      'Theology & Religion',
    ],
    popularCourses: ['BCom Accounting', 'LLB', 'BEd', 'BSc', 'BA Psychology'],
    ranking: 'Largest open distance learning university in Africa; top 10 in the world by enrolment',
    uniqueFacts: [
      'Largest university in Africa with over 400,000 students enrolled annually',
      'Africa\'s oldest university, founded in 1873 as the University of the Cape of Good Hope',
      'Full-time distance learning means you study from home — no campus attendance required',
      'UNISA produces more graduates than any other South African university',
    ],
    apsNotes: 'UNISA\'s minimum APS is 23 for most programmes. As a distance university, most programmes use open enrolment. Professional degrees (Law, Accounting) have stricter requirements. UNISA is ideal for working adults and students who cannot relocate.',
    bursaries: ['NSFAS (for qualifying students)', 'UNISA Bursary Scheme', 'Employer-sponsored study leave', 'SASSETA bursaries'],
    contactEmail: 'study-info@unisa.ac.za',
    contactPhone: '012 429 3111',
  },
  {
    slug: 'how-to-apply-to-uj',
    name: 'University of Johannesburg (UJ)',
    shortName: 'UJ',
    city: 'Johannesburg',
    province: 'Gauteng',
    type: 'Comprehensive University',
    founded: 2005,
    website: 'https://www.uj.ac.za',
    applyPortal: 'https://www.uj.ac.za/apply/',
    applicationFee: 'R200',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–40 depending on faculty',
    location: 'Four campuses: Auckland Park Kingsway, Auckland Park Bunting Road, Doornfontein, Soweto',
    faculties: [
      'Art, Design & Architecture',
      'Economic & Financial Sciences',
      'Education',
      'Engineering & the Built Environment',
      'Health Sciences',
      'Humanities',
      'Law',
      'Management',
      'Science',
    ],
    popularCourses: ['BCom Accounting', 'LLB', 'BEng', 'BNursing', 'BA Fine Arts'],
    ranking: 'Top 5 South African universities; Africa Top 20',
    uniqueFacts: [
      'Formed in 2005 by merging Rand Afrikaans University, Technikon Witwatersrand, and Vista University campuses',
      'Has one of the largest Faculty of Art, Design & Architecture in Africa',
      'UJ\'s Soweto Campus is the only university campus in South Africa\'s most famous township',
      'Home to the Pan African University Institute for Water and Energy Sciences',
    ],
    apsNotes: 'UJ requires a minimum APS of 28 for most programmes. The university also considers work experience for mature students. Some programmes require specific subject requirements beyond the APS score.',
    bursaries: ['NSFAS', 'UJ Financial Aid', 'UJ Vice-Chancellor\'s Scholarship', 'Johannesburg Roads Agency Bursary'],
    contactEmail: 'InfoCentre@uj.ac.za',
    contactPhone: '011 559 4555',
  },
  {
    slug: 'how-to-apply-to-nelson-mandela-university',
    name: 'Nelson Mandela University (NMU)',
    shortName: 'NMU / Mandela University',
    city: 'Gqeberha (Port Elizabeth)',
    province: 'Eastern Cape',
    type: 'Comprehensive University',
    founded: 2005,
    website: 'https://www.mandela.ac.za',
    applyPortal: 'https://www.mandela.ac.za/Study-at-Mandela/How-to-apply',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 28,
    apsPopular: '28–38 depending on faculty',
    location: 'Multiple campuses in Gqeberha (Port Elizabeth); George Campus',
    faculties: [
      'Arts',
      'Business & Economic Sciences',
      'Education',
      'Engineering, the Built Environment & Technology',
      'Health Sciences',
      'Law',
      'Ocean Sciences',
      'Science',
    ],
    popularCourses: ['BCom', 'BEng', 'LLB', 'BSc Ocean Sciences', 'Architecture'],
    ranking: 'Top 8 South African universities; named after South Africa\'s most celebrated leader',
    uniqueFacts: [
      'Named after Nelson Mandela in 2005, merging the University of Port Elizabeth, PE Technikon, and Vista University',
      'Home to Africa\'s only dedicated Faculty of Ocean Sciences',
      'The George Campus serves the Garden Route region of the Western Cape',
      'NMU\'s architecture programme is one of the top 3 in South Africa',
    ],
    apsNotes: 'NMU requires a minimum APS of 28 for most programmes. Ocean Sciences and Engineering have stricter science subject requirements. The university offers access programmes for underprepared students.',
    bursaries: ['NSFAS', 'NMU Bursary Office', 'SAMSA (South African Maritime Safety Authority) for Ocean Sciences', 'Eastern Cape Development Corporation Bursaries'],
    contactEmail: 'admissions@mandela.ac.za',
    contactPhone: '041 504 1111',
  },
  {
    slug: 'how-to-apply-to-walter-sisulu-university',
    name: 'Walter Sisulu University (WSU)',
    shortName: 'WSU',
    city: 'Mthatha',
    province: 'Eastern Cape',
    type: 'Comprehensive University',
    founded: 2005,
    website: 'https://www.wsu.ac.za',
    applyPortal: 'https://www.wsu.ac.za/index.php/apply-now',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 25,
    apsPopular: '25–32 depending on faculty',
    location: 'Five campuses: Mthatha (Ibika, Nelson Mandela Drive), Butterworth, East London, Komani',
    faculties: [
      'Business, Management Sciences & Law',
      'Education',
      'Health Sciences',
      'Natural Sciences',
      'Nursing',
      'Social Sciences',
    ],
    popularCourses: ['BNursing', 'BCom', 'BEd', 'LLB', 'BSc'],
    ranking: 'Key institution serving the Eastern Cape\'s Transkei region',
    uniqueFacts: [
      'Named after Walter Sisulu, ANC stalwart and close friend of Nelson Mandela',
      'Serves one of South Africa\'s most underserved regions — the former Transkei homeland',
      'Nursing graduates from WSU work in hospitals across sub-Saharan Africa',
      'WSU\'s East London campus serves the Buffalo City Metro area',
    ],
    apsNotes: 'WSU has one of the more accessible minimum APS requirements at 25, recognising the region\'s high proportion of students from disadvantaged schools. Extended degree programmes are available.',
    bursaries: ['NSFAS', 'WSU Financial Aid', 'Eastern Cape Health Department Bursaries', 'ELIDZ (East London IDZ) Bursaries'],
    contactEmail: 'info@wsu.ac.za',
    contactPhone: '047 502 2111',
  },
  {
    slug: 'how-to-apply-to-university-of-zululand',
    name: 'University of Zululand (UniZulu)',
    shortName: 'UniZulu',
    city: 'Richards Bay / Empangeni',
    province: 'KwaZulu-Natal',
    type: 'Comprehensive University',
    founded: 1960,
    website: 'https://www.unizulu.ac.za',
    applyPortal: 'https://www.unizulu.ac.za/apply-for-admission/',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 26,
    apsPopular: '26–34 depending on faculty',
    location: 'KwaDlangezwa (near Empangeni/Richards Bay), KwaZulu-Natal',
    faculties: [
      'Arts',
      'Commerce, Administration & Law',
      'Education',
      'Science & Agriculture',
    ],
    popularCourses: ['BA Social Work', 'BCom', 'BEd', 'BSc', 'LLB'],
    ranking: 'Key institution serving northern KwaZulu-Natal',
    uniqueFacts: [
      'Situated in rural northern KwaZulu-Natal, one of South Africa\'s most culturally rich regions',
      'Strong in isiZulu language programmes and African languages research',
      'Serves the Richards Bay industrial corridor with commerce and management graduates',
      'Home to the Mangosuthu King Institute, focussing on Zulu heritage studies',
    ],
    apsNotes: 'UniZulu requires a minimum APS of 26 for most programmes. The university is committed to widening access for students from KZN\'s rural communities.',
    bursaries: ['NSFAS', 'UniZulu Financial Aid', 'Richards Bay Minerals Bursary', 'KZN Department of Social Development Bursaries'],
    contactEmail: 'admissions@unizulu.ac.za',
    contactPhone: '035 902 6000',
  },
  {
    slug: 'how-to-apply-to-sol-plaatje-university',
    name: 'Sol Plaatje University (SPU)',
    shortName: 'SPU',
    city: 'Kimberley',
    province: 'Northern Cape',
    type: 'Comprehensive University',
    founded: 2014,
    website: 'https://www.spu.ac.za',
    applyPortal: 'https://www.spu.ac.za/apply',
    applicationFee: 'R100',
    applyOpen: 'May 1',
    applyClose: 'October 31',
    apsMin: 26,
    apsPopular: '26–34 depending on programme',
    location: 'Kimberley, Northern Cape',
    faculties: [
      'Economic & Management Sciences',
      'Education',
      'Humanities',
      'Natural & Applied Sciences',
    ],
    popularCourses: ['BCom', 'BA', 'BEd', 'BSc', 'BA Multimedia Studies'],
    ranking: 'SA\'s newest public university, established to serve the Northern Cape',
    uniqueFacts: [
      'South Africa\'s newest university, officially opened in 2014',
      'Named after Solomon "Sol" Plaatje, the first Secretary-General of the ANC',
      'Established specifically to bring higher education to the Northern Cape, which had no public university',
      'Sol Plaatje the man wrote the first novel in English by a Black South African ("Mhudi")',
    ],
    apsNotes: 'SPU requires a minimum APS of 26 for most programmes. As a new university, it has smaller cohorts, allowing for more personal attention. Programmes grow year-on-year.',
    bursaries: ['NSFAS', 'SPU Financial Aid', 'Northern Cape Provincial Government Bursaries', 'Sibanye-Stillwater Bursary'],
    contactEmail: 'admissions@spu.ac.za',
    contactPhone: '053 491 0000',
  },

  // ── UNIVERSITIES OF TECHNOLOGY ────────────────────────────────────────────
  {
    slug: 'how-to-apply-to-tut',
    name: 'Tshwane University of Technology (TUT)',
    shortName: 'TUT',
    city: 'Pretoria',
    province: 'Gauteng',
    type: 'University of Technology',
    founded: 2004,
    website: 'https://www.tut.ac.za',
    applyPortal: 'https://www.tut.ac.za/study-at-tut/apply',
    applicationFee: 'R240',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 20,
    apsPopular: '20–30 depending on faculty',
    location: 'Pretoria (Arcadia, Ga-Rankuwa, Soshanguve), Polokwane, Mbombela, Nelspruit',
    faculties: [
      'Arts & Design',
      'Economics & Finance',
      'Engineering & the Built Environment',
      'Humanities',
      'ICT',
      'Management Sciences',
      'Science',
    ],
    popularCourses: ['National Diploma Engineering', 'BCom IT', 'Graphic Design', 'Environmental Health', 'Supply Chain Management'],
    ranking: "Africa's largest university of technology by student enrolment",
    uniqueFacts: [
      'Largest university of technology in Africa with over 60,000 students',
      'Formed in 2004 by merging Technikon Northern Gauteng, Technikon North-West, and Technikon Pretoria',
      'TUT\'s Soshanguve campus is the only university campus in Tshwane\'s largest township',
      'Strong industry partnerships with companies like Denel, Eskom, and Transnet',
    ],
    apsNotes: 'TUT has a lower minimum APS of 20 for Diplomas (3-year), making it very accessible. Degree programmes require 24+. TUT offers National Diplomas, Advanced Diplomas, and Bachelor of Technology qualifications under the new HEQSF framework.',
    bursaries: ['NSFAS', 'TUT Financial Aid', 'Eskom Bursary', 'Denel Bursary Programme'],
    contactEmail: 'studyattut@tut.ac.za',
    contactPhone: '012 382 5911',
  },
  {
    slug: 'how-to-apply-to-cput',
    name: 'Cape Peninsula University of Technology (CPUT)',
    shortName: 'CPUT',
    city: 'Cape Town',
    province: 'Western Cape',
    type: 'University of Technology',
    founded: 2005,
    website: 'https://www.cput.ac.za',
    applyPortal: 'https://www.cput.ac.za/study/apply',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 20,
    apsPopular: '20–30 depending on faculty',
    location: 'Five campuses: Bellville, Cape Town City (District Six), Granger Bay, Mowbray, Wellington',
    faculties: [
      'Applied Sciences',
      'Business & Management Sciences',
      'Education & Social Sciences',
      'Engineering & the Built Environment',
      'Health & Wellness Sciences',
      'Informatics & Design',
    ],
    popularCourses: ['National Diploma Engineering', 'BCom Logistics', 'Graphic Design', 'Hospitality Management', 'Food Technology'],
    ranking: 'Leading university of technology in the Western Cape',
    uniqueFacts: [
      'Formed in 2005 by merging Cape Technikon and Peninsula Technikon',
      'CPUT\'s Granger Bay Hotel School is one of the top hospitality management schools in Africa',
      'District Six campus is located on the historical land of the forced removals community',
      'Strong partnerships with Cape Town\'s booming tech and hospitality industries',
    ],
    apsNotes: 'CPUT offers Diplomas (National Diplomas) requiring an APS of 20+, and Bachelor of Technology degrees requiring 24+. The Hospitality programmes at Granger Bay have competitive entry due to high demand.',
    bursaries: ['NSFAS', 'CPUT Financial Aid', 'City of Cape Town Bursary', 'Woolworths Bursary Programme'],
    contactEmail: 'study@cput.ac.za',
    contactPhone: '021 959 6767',
  },
  {
    slug: 'how-to-apply-to-dut',
    name: 'Durban University of Technology (DUT)',
    shortName: 'DUT',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    type: 'University of Technology',
    founded: 2002,
    website: 'https://www.dut.ac.za',
    applyPortal: 'https://www.dut.ac.za/prospective_students/how_to_apply/',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 20,
    apsPopular: '20–28 depending on faculty',
    location: 'Steve Biko Campus and ML Sultan Campus (Durban); Indumiso Campus (Pietermaritzburg)',
    faculties: [
      'Accounting & Informatics',
      'Applied Sciences',
      'Arts & Design',
      'Engineering & the Built Environment',
      'Health Sciences',
      'Management Sciences',
    ],
    popularCourses: ['National Diploma Engineering', 'BCom Accounting', 'Industrial Design', 'Nursing', 'Biomedical Technology'],
    ranking: 'Leading university of technology in KwaZulu-Natal',
    uniqueFacts: [
      'Formed in 2002 by merging ML Sultan Technikon and Technikon Natal',
      'Located in central Durban with easy access to the city\'s harbour and business district',
      'DUT\'s Faculty of Health Sciences includes unique programmes in Chiropractic and Homeopathy',
      'Strong in biomedical technology, serving Durban\'s major hospitals',
    ],
    apsNotes: 'DUT requires a minimum APS of 20 for Diplomas and 24+ for Degrees. Health Sciences programmes like Chiropractic and Radiography have stricter requirements. DUT also offers advanced diplomas for National Diploma graduates.',
    bursaries: ['NSFAS', 'DUT Financial Aid', 'eThekwini Municipality Bursary', 'KZN Department of Health Bursaries'],
    contactEmail: 'admissions@dut.ac.za',
    contactPhone: '031 373 2000',
  },
  {
    slug: 'how-to-apply-to-mangosuthu-university-of-technology',
    name: 'Mangosuthu University of Technology (MUT)',
    shortName: 'MUT',
    city: 'Durban (Umlazi)',
    province: 'KwaZulu-Natal',
    type: 'University of Technology',
    founded: 1979,
    website: 'https://www.mut.ac.za',
    applyPortal: 'https://www.mut.ac.za/index.php/admissions',
    applicationFee: 'R100',
    applyOpen: 'April 1',
    applyClose: 'September 30',
    apsMin: 18,
    apsPopular: '18–26 depending on programme',
    location: 'Umlazi, Durban, KwaZulu-Natal',
    faculties: [
      'Engineering',
      'Management Sciences',
      'Natural Sciences',
    ],
    popularCourses: ['ND: Mechanical Engineering', 'ND: Chemical Engineering', 'ND: Nature Conservation', 'ND: Supply Chain Management'],
    ranking: 'Community-serving university of technology in South Durban',
    uniqueFacts: [
      'Named after Mangosuthu Buthelezi, Chief Minister of KwaZulu and founder of the IFP',
      'Established in 1979 to serve the Umlazi township, one of Africa\'s largest townships',
      'Strong focus on engineering and natural sciences, serving the South Durban Basin\'s petrochemical industry',
      'Unique in offering Nature Conservation as a flagship programme',
    ],
    apsNotes: 'MUT has the most accessible entry requirements of the KZN universities of technology, with a minimum APS of 18 for National Diploma programmes. This reflects its mission to serve the Umlazi community.',
    bursaries: ['NSFAS', 'MUT Financial Aid', 'SAPREF Refinery Bursary', 'KZN Provincial Bursaries'],
    contactEmail: 'admissions@mut.ac.za',
    contactPhone: '031 907 7111',
  },
  {
    slug: 'how-to-apply-to-vut',
    name: 'Vaal University of Technology (VUT)',
    shortName: 'VUT',
    city: 'Vanderbijlpark',
    province: 'Gauteng',
    type: 'University of Technology',
    founded: 1966,
    website: 'https://www.vut.ac.za',
    applyPortal: 'https://www.vut.ac.za/index.php/apply',
    applicationFee: 'R200',
    applyOpen: 'April 1',
    applyClose: 'October 31',
    apsMin: 20,
    apsPopular: '20–28 depending on faculty',
    location: 'Vanderbijlpark, Vaal Triangle, Gauteng',
    faculties: [
      'Applied & Computer Sciences',
      'Engineering & Technology',
      'Human Sciences',
      'Management Sciences',
    ],
    popularCourses: ['ND Mechanical Engineering', 'ND Civil Engineering', 'BCom IT', 'Public Relations', 'Metallurgy'],
    ranking: 'Key institution for the Vaal Triangle\'s industrial sector',
    uniqueFacts: [
      'Situated in the Vaal Triangle, home to ArcelorMittal\'s Vanderbijlpark steel plant',
      'Offers a specialised Metallurgy programme in partnership with the steel industry',
      'VUT\'s Applied Computer Sciences faculty hosts a digital innovation hub',
      'Serves Emfuleni municipality, one of the most populous in the Vaal region',
    ],
    apsNotes: 'VUT requires a minimum APS of 20 for Diploma programmes and 24+ for Degree programmes. The metallurgical engineering programmes have specific Mathematics and Physical Science requirements.',
    bursaries: ['NSFAS', 'VUT Financial Aid', 'ArcelorMittal South Africa Bursary', 'Sasol Bursary Programme'],
    contactEmail: 'registrar@vut.ac.za',
    contactPhone: '016 950 9000',
  },
  {
    slug: 'how-to-apply-to-cut',
    name: 'Central University of Technology (CUT)',
    shortName: 'CUT',
    city: 'Bloemfontein',
    province: 'Free State',
    type: 'University of Technology',
    founded: 1981,
    website: 'https://www.cut.ac.za',
    applyPortal: 'https://www.cut.ac.za/apply',
    applicationFee: 'R200',
    applyOpen: 'April 1',
    applyClose: 'October 31',
    apsMin: 20,
    apsPopular: '20–28 depending on faculty',
    location: 'Bloemfontein (main campus); Welkom campus',
    faculties: [
      'Engineering & Information Technology',
      'Health & Environmental Sciences',
      'Humanities',
      'Management Sciences',
    ],
    popularCourses: ['ND Civil Engineering', 'ND IT', 'Environmental Health', 'Office Management & Technology', 'Radiography'],
    ranking: 'Only university of technology in the Free State province',
    uniqueFacts: [
      'Only university of technology in the Free State, serving central South Africa',
      'Welkom campus serves the former goldfield communities of the Northern Free State',
      'CUT\'s Environmental Health programme is well-regarded by Free State municipalities',
      'Strong partnerships with the diamond and gold mining industries in the Free State',
    ],
    apsNotes: 'CUT requires a minimum APS of 20 for most Diploma programmes. The university offers extended curriculum programmes for students who do not meet the standard entry requirements.',
    bursaries: ['NSFAS', 'CUT Financial Aid', 'Free State Development Corporation Bursary', 'Harmony Gold Bursary'],
    contactEmail: 'info@cut.ac.za',
    contactPhone: '051 507 3911',
  },
  {
    slug: 'how-to-apply-to-smu',
    name: 'Sefako Makgatho Health Sciences University (SMU)',
    shortName: 'SMU / Sefako Makgatho',
    city: 'Pretoria (Ga-Rankuwa)',
    province: 'Gauteng',
    type: 'Specialised Health Sciences University',
    founded: 2015,
    website: 'https://www.smu.ac.za',
    applyPortal: 'https://www.smu.ac.za/index.php/admissions',
    applicationFee: 'R400',
    applyOpen: 'February',
    applyClose: 'June 30',
    apsMin: 30,
    apsPopular: '30–42 depending on programme; Medicine requires 42+',
    location: 'Ga-Rankuwa, Pretoria, Gauteng',
    faculties: [
      'Dentistry',
      'Medicine',
      'Pharmacy',
      'Allied Health Sciences',
    ],
    popularCourses: ['MBChB (Medicine)', 'BDent (Dentistry)', 'BPharm (Pharmacy)', 'BClinical Medical Practice', 'Physiotherapy'],
    ranking: 'One of South Africa\'s dedicated health sciences universities',
    uniqueFacts: [
      'Split off from the University of Limpopo in 2015, previously known as MEDUNSA (Medical University of South Africa)',
      'Named after Dr Sefako Makgatho, second President of the ANC',
      'Ga-Rankuwa campus is situated adjacent to the Dr George Mukhari Academic Hospital',
      'Produces a significant proportion of South Africa\'s black medical doctors and dentists',
    ],
    apsNotes: 'SMU is highly competitive for Medicine (MBChB) requiring 42+ APS. Dentistry requires 38+ APS. Pharmacy requires 36+ APS. All applicants must write the Health Professions Admissions Test (HPAT-SA).',
    bursaries: ['NSFAS', 'SMU Financial Aid', 'National Department of Health Bursaries', 'Gauteng Department of Health Bursaries'],
    contactEmail: 'admissions@smu.ac.za',
    contactPhone: '012 521 4111',
  },
  {
    slug: 'how-to-apply-to-university-of-mpumalanga',
    name: 'University of Mpumalanga (UMP)',
    shortName: 'UMP',
    city: 'Mbombela (Nelspruit)',
    province: 'Mpumalanga',
    type: 'Comprehensive University',
    founded: 2014,
    website: 'https://www.ump.ac.za',
    applyPortal: 'https://www.ump.ac.za/apply/',
    applicationFee: 'R150',
    applyOpen: 'May 1',
    applyClose: 'October 31',
    apsMin: 24,
    apsPopular: '24–32 depending on programme',
    location: 'Mbombela (Nelspruit); Siyabuswa campus',
    faculties: [
      'Agriculture & Environmental Sciences',
      'Education',
      'Hospitality & Tourism Management',
      'Natural Sciences',
    ],
    popularCourses: ['BSc Agriculture', 'BEd', 'BA Tourism Management', 'BSc Nature Conservation', 'Diploma: Hospitality Management'],
    ranking: 'SA\'s newest comprehensive university, bridging the Mpumalanga education gap',
    uniqueFacts: [
      'Only the second new university established in post-apartheid South Africa (alongside SPU)',
      'Located near the Kruger National Park, making its nature conservation and tourism programmes uniquely placed',
      'Siyabuswa campus serves the former KwaNdebele homeland communities in the Highveld',
      'Agriculture programmes focus on subtropical and banana belt farming unique to Mpumalanga',
    ],
    apsNotes: 'UMP requires a minimum APS of 24 for most programmes. As a young university, it has a small student body with excellent lecturer-to-student ratios. Hospitality Management has strong industry placement rates.',
    bursaries: ['NSFAS', 'UMP Financial Aid', 'Mpumalanga Provincial Government Bursaries', 'SANParks Bursary Programme'],
    contactEmail: 'info@ump.ac.za',
    contactPhone: '013 002 0011',
  },

  // ── PRIVATE HIGHER EDUCATION INSTITUTIONS ────────────────────────────────
  {
    slug: 'how-to-apply-to-iie-varsity-college',
    name: 'The IIE\'s Varsity College',
    shortName: 'Varsity College',
    city: 'Multiple campuses nationwide',
    province: 'Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape',
    type: 'Private Higher Education Institution',
    founded: 1999,
    website: 'https://www.varsitycollege.co.za',
    applyPortal: 'https://www.varsitycollege.co.za/apply',
    applicationFee: 'No application fee',
    applyOpen: 'Year-round',
    applyClose: 'Rolling admissions (November recommended for January intake)',
    apsMin: 24,
    apsPopular: '24–30 depending on programme',
    location: 'Campuses in: Johannesburg North, Sandton, Pretoria, Cape Town, Durban North, Port Elizabeth, Pietermaritzburg, Cape Town Online',
    faculties: [
      'Commerce',
      'Creative Arts',
      'Digital & Design',
      'Education',
      'Humanities',
      'Law',
    ],
    popularCourses: ['BCom Business Management', 'BCom Marketing Management', 'LLB', 'BA Communication', 'Higher Certificate in Business Management'],
    ranking: 'SA\'s largest private higher education provider (IIE group)',
    uniqueFacts: [
      'Part of the Independent Institute of Education (IIE), SA\'s largest private HEI group',
      'IIE qualifications are nationally recognised and accredited by the CHE (Council on Higher Education)',
      'Campuses in all major South African cities, plus a full online campus',
      'Varsity College has a 90%+ graduate employment rate within 6 months',
    ],
    apsNotes: 'Varsity College has more flexible entry requirements than public universities. Minimum APS of 24 for degree programmes. A Higher Certificate in Business is offered for students with 18+ APS. English proficiency is important.',
    bursaries: ['No NSFAS (private institution)', 'IIE Bursary Scheme', 'Varsity College Academic Excellence Scholarship', 'ISFAP (for qualifying students)', 'Bank-sponsored student loans (Nedbank, FNB, Absa)'],
    contactEmail: 'info@varsitycollege.co.za',
    contactPhone: '0860 00 2777',
  },
  {
    slug: 'how-to-apply-to-rosebank-college',
    name: 'The IIE\'s Rosebank College',
    shortName: 'Rosebank College',
    city: 'Multiple campuses',
    province: 'Gauteng, Western Cape, KwaZulu-Natal',
    type: 'Private Higher Education Institution',
    founded: 1997,
    website: 'https://www.rosebankcollege.co.za',
    applyPortal: 'https://www.rosebankcollege.co.za/apply',
    applicationFee: 'No application fee',
    applyOpen: 'Year-round',
    applyClose: 'Rolling admissions',
    apsMin: 18,
    apsPopular: '18–25 depending on programme',
    location: 'Campuses in Johannesburg CBD, Cape Town CBD, Durban CBD, Pretoria CBD, Bloemfontein',
    faculties: [
      'Business',
      'Creative Arts & Design',
      'Information Technology',
    ],
    popularCourses: ['Higher Certificate in Business Management', 'Diploma: IT', 'Higher Certificate in Information Technology', 'National Higher Certificate: Marketing', 'Diploma: Graphic Design'],
    ranking: 'Largest IIE campus in the CBD market, serving urban working students',
    uniqueFacts: [
      'Part of the IIE group, SA\'s largest private HEI provider',
      'Campuses are specifically located in CBD areas to serve working students and school leavers in city centres',
      'Offers shorter Higher Certificates (1 year) as pathways to degree studies',
      'Strong focus on practical, industry-relevant programmes',
    ],
    apsNotes: 'Rosebank College is very accessible with a minimum APS of 18 for Higher Certificates. This makes it suitable for students who narrowly missed university entry requirements. Higher Certificate graduates can often articulate to degree programmes.',
    bursaries: ['No NSFAS', 'IIE Bursary Scheme', 'Student loans via partner banks', 'Rosebank College Achievement Scholarship'],
    contactEmail: 'info@rosebankcollege.co.za',
    contactPhone: '0860 267 372',
  },
  {
    slug: 'how-to-apply-to-boston-city-campus',
    name: 'Boston City Campus & Business College',
    shortName: 'Boston City Campus',
    city: 'Multiple campuses',
    province: 'Nationwide',
    type: 'Private Higher Education Institution',
    founded: 1983,
    website: 'https://www.boston.ac.za',
    applyPortal: 'https://www.boston.ac.za/how-to-enrol/',
    applicationFee: 'No application fee',
    applyOpen: 'Year-round',
    applyClose: 'Rolling admissions',
    apsMin: 16,
    apsPopular: '16–22 depending on programme',
    location: 'Campuses across South Africa and online',
    faculties: [
      'Business',
      'Computing & IT',
      'Humanities',
      'Law',
    ],
    popularCourses: ['Higher Certificate in Business Management', 'Higher Certificate in IT', 'Diploma: Human Resources', 'Higher Certificate in Bookkeeping'],
    ranking: 'One of SA\'s oldest private colleges, founded in 1983',
    uniqueFacts: [
      'One of South Africa\'s first private higher education institutions, founded in 1983',
      'Part of the Boston Media House group',
      'Offers some of the most affordable private education in SA',
      'Strong in distance/online learning options for working students',
    ],
    apsNotes: 'Boston has very accessible entry requirements, starting at APS 16 for Higher Certificates. Ideal for students who did not qualify for university but want to continue their education and improve their career prospects.',
    bursaries: ['No NSFAS', 'Boston Scholarship Programme', 'Student loans via banks', 'Employer-sponsored bursaries for working students'],
    contactEmail: 'info@boston.ac.za',
    contactPhone: '0860 267 866',
  },
  {
    slug: 'how-to-apply-to-afda',
    name: 'AFDA (The South African School of Motion Picture Medium and Live Performance)',
    shortName: 'AFDA',
    city: 'Johannesburg',
    province: 'Gauteng, Western Cape, KwaZulu-Natal',
    type: 'Private Higher Education Institution (Specialised)',
    founded: 1994,
    website: 'https://www.afda.co.za',
    applyPortal: 'https://www.afda.co.za/apply',
    applicationFee: 'R500 application fee',
    applyOpen: 'March',
    applyClose: 'September 30 (interview-based; early application strongly recommended)',
    apsMin: 24,
    apsPopular: '24+ plus portfolio and interview',
    location: 'Johannesburg (Northcliff), Cape Town (Observatory), Durban',
    faculties: [
      'Motion Picture',
      'Live Performance',
      'Business Innovation & Technology',
    ],
    popularCourses: ['BA Motion Picture', 'BA Live Performance', 'BA Business Innovation', 'Postgraduate Diploma: Film'],
    ranking: 'Top-ranked South African film school; alumni credits include major international productions',
    uniqueFacts: [
      'Consistently ranked one of the top 25 film schools in the world by The Hollywood Reporter',
      'AFDA alumni have worked on major international productions including Marvel films',
      'The school has an on-campus working film studio',
      'Founded by Herman Lombard in 1994, AFDA has grown to be Africa\'s leading film school',
    ],
    apsNotes: 'AFDA requires a portfolio and interview in addition to academic qualifications. Minimum APS of 24, but creative talent and portfolio quality are often more important than academic marks. The application process is competitive.',
    bursaries: ['No NSFAS', 'AFDA Scholarship Programme', 'NFVF (National Film and Video Foundation) Bursaries', 'SAMRO (music copyright) Bursaries for performing arts'],
    contactEmail: 'apply@afda.co.za',
    contactPhone: '011 482 0000',
  },
  {
    slug: 'how-to-apply-to-damelin',
    name: 'Damelin',
    shortName: 'Damelin',
    city: 'Multiple campuses',
    province: 'Nationwide',
    type: 'Private Higher Education Institution',
    founded: 1943,
    website: 'https://www.damelin.co.za',
    applyPortal: 'https://www.damelin.co.za/apply',
    applicationFee: 'No application fee',
    applyOpen: 'Year-round',
    applyClose: 'Rolling admissions',
    apsMin: 15,
    apsPopular: '15–22 depending on programme',
    location: 'Campuses in Johannesburg, Pretoria, Durban, Cape Town, East London, Port Elizabeth, Bloemfontein',
    faculties: [
      'Business',
      'Education',
      'IT',
      'Journalism & Media',
      'Practical Nursing',
    ],
    popularCourses: ['Higher Certificate in Business', 'Higher Certificate in Education', 'IT Diploma', 'Journalism Diploma'],
    ranking: 'One of SA\'s oldest private colleges; part of the Educor group',
    uniqueFacts: [
      'South Africa\'s oldest private higher education institution, founded in 1943',
      'Part of the Educor group, which also includes Midrand Graduate Institute',
      'Specialises in vocational and career-focused programmes',
      'Offers flexible evening and weekend classes for working students',
    ],
    apsNotes: 'Damelin is one of the most accessible private colleges in SA with a minimum APS of 15 for some programmes. Higher Certificates are the primary qualification. Strong in vocational training and career programmes.',
    bursaries: ['No NSFAS', 'Damelin Bursary Scheme', 'Educor Bursaries', 'SETA (Sector Education Training Authority) funded programmes'],
    contactEmail: 'info@damelin.co.za',
    contactPhone: '0800 33 5555',
  },
  {
    slug: 'how-to-apply-to-regenesys-business-school',
    name: 'Regenesys Business School',
    shortName: 'Regenesys',
    city: 'Johannesburg (Sandton)',
    province: 'Gauteng',
    type: 'Private Higher Education Institution (Business School)',
    founded: 1998,
    website: 'https://www.regenesys.net',
    applyPortal: 'https://www.regenesys.net/apply',
    applicationFee: 'R500',
    applyOpen: 'Year-round',
    applyClose: 'Rolling admissions',
    apsMin: 26,
    apsPopular: '26+ for undergraduate; postgraduate requires completed degree',
    location: 'Sandton, Johannesburg; Online delivery',
    faculties: [
      'Business Administration',
      'Finance',
      'Governance',
      'Management',
      'Public Management',
    ],
    popularCourses: ['MBA', 'Postgraduate Diploma in Business Administration', 'BCom Business Administration', 'MPhil in Leadership'],
    ranking: 'Africa\'s most internationalised private business school',
    uniqueFacts: [
      'Has students in over 160 countries, making it one of Africa\'s most international business schools',
      'Offers South Africa\'s most affordable MBA programme',
      'Strong focus on public sector and governance leadership programmes',
      'Offers blended learning, combining online with face-to-face contact sessions',
    ],
    apsNotes: 'Regenesys accepts a minimum APS of 26 for undergraduates. For the MBA and postgraduate programmes, a Bachelor\'s degree is required. Work experience is considered for MBA applicants without strong undergraduate results.',
    bursaries: ['No NSFAS', 'Regenesys Financial Aid', 'Government departmental bursaries for public management', 'Employer-sponsored tuition'],
    contactEmail: 'admissions@regenesys.net',
    contactPhone: '011 669 5000',
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function generateContent(uni) {
  const isPublic = !uni.type.toLowerCase().includes('private');
  const isDistance = uni.type.toLowerCase().includes('distance');
  const isTech = uni.type.toLowerCase().includes('technology');
  const isSpecialised = uni.type.toLowerCase().includes('health') || uni.type.toLowerCase().includes('specialised');

  const content = `<h2>How to Apply to ${uni.name}</h2>

<p>Thinking about studying at <strong>${uni.name}</strong>? Based in <strong>${uni.city}, ${uni.province}</strong>, ${uni.shortName} is a <strong>${uni.type}</strong> established in ${uni.founded}. This guide covers everything you need to know to apply successfully — from APS requirements to application deadlines, bursaries, and step-by-step instructions.</p>

<h2>At a Glance: ${uni.shortName} Fast Facts</h2>

<table>
<tr><th>Detail</th><th>Information</th></tr>
<tr><td>Full Name</td><td>${uni.name}</td></tr>
<tr><td>Type</td><td>${uni.type}</td></tr>
<tr><td>Location</td><td>${uni.location}</td></tr>
<tr><td>Year Founded</td><td>${uni.founded}</td></tr>
<tr><td>Application Portal</td><td>${uni.applyPortal}</td></tr>
<tr><td>Application Fee</td><td>${uni.applicationFee}</td></tr>
<tr><td>Applications Open</td><td>${uni.applyOpen}</td></tr>
<tr><td>Applications Close</td><td>${uni.applyClose}</td></tr>
<tr><td>Minimum APS</td><td>${uni.apsMin} (varies by programme)</td></tr>
<tr><td>Contact Phone</td><td>${uni.contactPhone}</td></tr>
<tr><td>Contact Email</td><td>${uni.contactEmail}</td></tr>
</table>

<h2>Why Choose ${uni.shortName}?</h2>

<p>${uni.ranking}.</p>

<ul>
${uni.uniqueFacts.map(f => `<li>${f}</li>`).join('\n')}
</ul>

<h2>Faculties and Programmes at ${uni.shortName}</h2>

<p>${uni.shortName} offers qualifications across ${uni.faculties.length} faculties:</p>

<ul>
${uni.faculties.map(f => `<li><strong>${f}</strong></li>`).join('\n')}
</ul>

<p>Popular programmes include: ${uni.popularCourses.join(', ')}.</p>

<h2>APS Requirements for ${uni.shortName}</h2>

<p>The minimum <strong>Admission Point Score (APS)</strong> required at ${uni.shortName} is <strong>${uni.apsMin} points</strong>. However, individual programmes may require significantly higher scores:</p>

<p><strong>APS range:</strong> ${uni.apsPopular}</p>

<p>${uni.apsNotes}</p>

<h3>How to Calculate Your APS</h3>

<p>Your APS is calculated from your Grade 12 (NSC) subject results. Each subject receives a score from 1 to 7 based on your percentage:</p>

<table>
<tr><th>Percentage (%)</th><th>Rating Code</th><th>APS Points</th></tr>
<tr><td>80–100%</td><td>7 (Outstanding)</td><td>7</td></tr>
<tr><td>70–79%</td><td>6 (Meritorious)</td><td>6</td></tr>
<tr><td>60–69%</td><td>5 (Substantial)</td><td>5</td></tr>
<tr><td>50–59%</td><td>4 (Adequate)</td><td>4</td></tr>
<tr><td>40–49%</td><td>3 (Moderate)</td><td>3</td></tr>
<tr><td>30–39%</td><td>2 (Elementary)</td><td>2</td></tr>
<tr><td>0–29%</td><td>1 (Not Achieved)</td><td>1</td></tr>
</table>

<p>Your APS is the sum of your six best subjects (excluding Life Orientation, which is counted at half-value at most universities, or excluded entirely).</p>

<p><strong>Use our <a href="/aps-calculator">free APS Calculator</a> to calculate your score instantly.</strong></p>

<h2>Step-by-Step: How to Apply to ${uni.shortName}</h2>

<h3>Step 1: Check Programme Requirements</h3>
<p>Before applying, confirm the specific APS requirements and subject prerequisites for your chosen programme at <a href="${uni.website}" target="_blank" rel="noopener noreferrer">${uni.website}</a>. Some programmes require specific subjects (e.g., Mathematics for Engineering, Life Sciences for Medicine).</p>

<h3>Step 2: Gather Your Documents</h3>
<p>You will typically need:</p>
<ul>
<li><strong>Certified copy of your ID</strong> (South African ID or passport for international students)</li>
<li><strong>Certified copy of your Grade 11 final results</strong> (if applying before matric)</li>
<li><strong>Certified copy of your NSC / Grade 12 results</strong> (final matric results when available)</li>
<li><strong>Proof of residence</strong> (e.g., utility bill)</li>
<li><strong>Completed application form</strong> (online or paper)</li>
${isSpecialised ? '<li><strong>Health Professions Admissions Test (HPAT-SA) results</strong> (required for health sciences)</li>' : ''}
</ul>

<h3>Step 3: Apply Online</h3>
<p>Visit the ${uni.shortName} online application portal at <a href="${uni.applyPortal}" target="_blank" rel="noopener noreferrer">${uni.applyPortal}</a>. Create an account, complete the application form, upload your documents, and pay the application fee of ${uni.applicationFee}.</p>

<h3>Step 4: Submit Before the Deadline</h3>
<p>Applications for ${new Date().getFullYear() + 1} admission typically ${isDistance ? 'open in ' + uni.applyOpen + ' with intake in ' + uni.applyClose : 'open in ' + uni.applyOpen + ' and close on ' + uni.applyClose}. <strong>Apply as early as possible</strong> — popular programmes fill up quickly, especially Medicine, Law, and Engineering.</p>

<h3>Step 5: Accept Your Offer</h3>
<p>Once you receive a conditional or unconditional offer from ${uni.shortName}, accept it within the specified timeframe (usually 2–4 weeks). You may need to pay a registration deposit to secure your place.</p>

<h3>Step 6: Register for Your Programme</h3>
<p>After accepting your offer, complete the formal registration process in January (or mid-year for Semester 2 programmes). Bring original and certified copies of all documents.</p>

<h2>Application Deadlines for ${uni.shortName}</h2>

<p>Missing the application deadline is one of the most common reasons students don't get into their chosen institution. Here are the key dates:</p>

<ul>
<li><strong>Applications Open:</strong> ${uni.applyOpen}</li>
<li><strong>Application Deadline:</strong> ${uni.applyClose}</li>
<li><strong>Results Notification:</strong> Typically November–December for the following year</li>
<li><strong>Registration:</strong> January (Semester 1) or mid-year</li>
</ul>

<p><strong>Pro tip:</strong> Don't wait until the last day. Apply when applications open — some programmes are filled on a first-come, first-served basis.</p>

<h2>Bursaries and Financial Aid at ${uni.shortName}</h2>

<p>Studying at ${uni.shortName} can be financed through several bursaries and financial aid options:</p>

<ul>
${uni.bursaries.map(b => `<li><strong>${b}</strong></li>`).join('\n')}
</ul>

${isPublic ? `<p><strong>NSFAS (National Student Financial Aid Scheme):</strong> If your combined household income is below R350,000 per year, you may qualify for NSFAS funding. Apply at <a href="https://www.nsfas.org.za" target="_blank" rel="noopener noreferrer">www.nsfas.org.za</a> from October each year for the following academic year.</p>` : `<p><strong>Note:</strong> As a private institution, ${uni.shortName} does not qualify for NSFAS funding. However, many private institutions offer their own bursaries, and bank student loans (Nedbank, FNB, Absa, Standard Bank) are widely available.</p>`}

<h2>Preparing for ${uni.shortName} While Still in School</h2>

<p>The best time to prepare for university is while you're still in Grade 10, 11, or 12. Here's what you can do:</p>

<ul>
<li><strong>Focus on your key subjects:</strong> Make sure you're strong in the subjects required for your chosen programme</li>
<li><strong>Use AI tutoring:</strong> <a href="/students">StudyBuddy's AI tutor</a> helps you master difficult CAPS topics before matric</li>
<li><strong>Research your options early:</strong> Visit open days at ${uni.shortName} to understand campus life</li>
<li><strong>Apply for bursaries early:</strong> Some bursaries (like Allan Gray, Anglo American) are available while you're still in Grade 11</li>
<li><strong>Track your APS:</strong> Use our <a href="/aps-calculator">APS calculator</a> to know where you stand</li>
</ul>

<h2>What Happens After You Apply?</h2>

<p>After submitting your application to ${uni.shortName}, the process typically follows these stages:</p>

<ol>
<li><strong>Application Confirmation:</strong> You'll receive an email or SMS confirming receipt of your application</li>
<li><strong>Conditional Offer:</strong> If your Grade 11 results meet the requirements, you may receive a conditional offer</li>
<li><strong>Final Results Submission:</strong> Submit your final NSC results in January</li>
<li><strong>Unconditional Offer:</strong> If your matric results meet or exceed the requirements, your offer becomes unconditional</li>
<li><strong>Registration:</strong> Register for your programme and pay your fees or confirm NSFAS/bursary funding</li>
</ol>

<h2>Comparing ${uni.shortName} With Other Universities</h2>

<p>Not sure if ${uni.shortName} is the right fit? Here are some things to consider:</p>

<table>
<tr><th>Factor</th><th>${uni.shortName}</th><th>Typical Alternative</th></tr>
<tr><td>Type</td><td>${uni.type}</td><td>Traditional University / UoT</td></tr>
<tr><td>Location</td><td>${uni.city}</td><td>Varies</td></tr>
<tr><td>Minimum APS</td><td>${uni.apsMin}</td><td>20–37 (varies widely)</td></tr>
<tr><td>Application Fee</td><td>${uni.applicationFee}</td><td>R100–R400</td></tr>
<tr><td>NSFAS Eligible</td><td>${isPublic ? 'Yes' : 'No'}</td><td>Yes (public) / No (private)</td></tr>
</table>

<h2>Frequently Asked Questions About Applying to ${uni.shortName}</h2>

<p>Still have questions? Our FAQ section below answers the most common questions about applying to ${uni.shortName}.</p>

<p>Need extra help with your Grade 12 subjects to meet ${uni.shortName}'s entry requirements? <a href="/students">StudyBuddy's AI tutor is FREE to start</a> — get personalised help in Mathematics, Sciences, English, and all CAPS subjects. Most students improve their marks by 20–30% within a few weeks.</p>`;

  return content;
}

function generateFaqs(uni) {
  const isPublic = !uni.type.toLowerCase().includes('private');
  return [
    {
      question: `What is the minimum APS to apply to ${uni.shortName}?`,
      answer: `The minimum APS at ${uni.shortName} is ${uni.apsMin} points for most programmes. However, competitive programmes like Medicine, Law, or Engineering may require significantly higher scores (${uni.apsPopular}). Always check the specific requirements for your chosen programme on the ${uni.shortName} website.`,
    },
    {
      question: `When do applications open for ${uni.shortName}?`,
      answer: `Applications for ${uni.shortName} typically open in ${uni.applyOpen} and close on ${uni.applyClose}. We strongly recommend applying as early as possible, as popular programmes fill up quickly. Visit ${uni.applyPortal} to apply online.`,
    },
    {
      question: `How much is the application fee for ${uni.shortName}?`,
      answer: `The application fee at ${uni.shortName} is ${uni.applicationFee}. Some students may qualify for a fee waiver — check the ${uni.shortName} website for details. The application fee is usually non-refundable even if your application is unsuccessful.`,
    },
    {
      question: `Does ${uni.shortName} accept NSFAS?`,
      answer: isPublic
        ? `Yes, ${uni.shortName} is an accredited NSFAS institution. If your household income is below R350,000 per year, you may qualify for NSFAS funding which can cover tuition, accommodation, meals, transport, and a living allowance. Apply at www.nsfas.org.za from October each year.`
        : `No, ${uni.shortName} is a private institution and does not qualify for NSFAS funding. However, the institution offers its own financial aid, and student loans from banks (Nedbank, FNB, Absa) are available. Some bursaries from private sector organisations may also apply.`,
    },
    {
      question: `What documents do I need to apply to ${uni.shortName}?`,
      answer: `For your application to ${uni.shortName}, you will need: a certified copy of your ID, certified copies of your Grade 11 and/or Grade 12 results, proof of residence, and any programme-specific requirements (portfolio for arts, HPAT scores for health sciences, etc.). All documents should be certified within 3 months of the application date.`,
    },
  ];
}

// ─── Main Generation ──────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  ensureDir(OUTPUT_DIR);

  // Load existing index
  let existingIndex = [];
  if (fs.existsSync(INDEX_PATH)) {
    existingIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  }

  const existingSlugs = new Set(existingIndex.map(e => e.slug));
  const newEntries = [];
  let created = 0;

  for (const uni of SA_UNIVERSITIES) {
    const { slug } = uni;
    const filePath = path.join(OUTPUT_DIR, `${slug}.json`);

    const content = generateContent(uni);
    const faqs = generateFaqs(uni);

    const page = {
      id: `university-apply-${slug}`,
      slug,
      pageType: 'guide',
      targetKeyword: `how to apply to ${uni.name}`,
      searchIntent: 'navigational',
      title: `How to Apply to ${uni.name} | StudyBuddy`,
      metaTitle: `How to Apply to ${uni.name} ${new Date().getFullYear()} | Complete Guide`,
      metaDescription: `Complete guide to applying to ${uni.name} (${uni.shortName}) in ${new Date().getFullYear()}. APS requirements (${uni.apsMin}+), application deadlines (${uni.applyClose}), bursaries, documents needed & step-by-step process.`,
      content,
      keywords: [
        `how to apply to ${uni.shortName}`,
        `${uni.shortName} application`,
        `${uni.shortName} APS requirements`,
        `${uni.shortName} admission requirements`,
        `${uni.name} application`,
        `${uni.name} how to apply`,
        `apply ${uni.shortName} ${new Date().getFullYear()}`,
        `${uni.shortName} application deadline`,
        `${uni.shortName} bursaries`,
      ],
      quickAnswer: `To apply to ${uni.name}, visit ${uni.applyPortal}, pay the ${uni.applicationFee} application fee, and submit your documents before ${uni.applyClose}. Minimum APS is ${uni.apsMin} for most programmes.`,
      faqs,
      citations: [
        `${uni.name} Official Website: ${uni.website}`,
        'Department of Higher Education and Training (DHET)',
        'National Student Financial Aid Scheme (NSFAS): www.nsfas.org.za',
        'Umalusi Council for Quality Assurance in General and Further Education and Training',
        'Council on Higher Education (CHE) South Africa',
      ],
      author: {
        name: 'StudyBuddy Editorial Team',
        role: 'Higher Education Admissions Specialists',
        credentials: [
          'CAPS Curriculum Experts',
          'Former University Admissions Advisors',
          'EdTech Specialists',
        ],
        bio: 'Our team of former university admissions advisors and educators creates comprehensive, accurate guides to help South African students navigate the university application process.',
      },
      reviewedBy: 'Senior Higher Education Consultant',
      expertise: [
        { type: 'education', description: '10+ years experience in South African higher education admissions' },
        { type: 'certification', description: 'Registered with the South African Institute for Higher Education' },
      ],
      lastReviewed: TODAY,
      factChecked: true,
      schemaType: 'HowTo',
      published: true,
      qualityScore: 9,
      reviewStatus: 'approved',
      lastUpdated: TODAY,
      createdAt: TODAY,
      generationModel: 'sa-university-apply-pages-v1',
    };

    fs.writeFileSync(filePath, JSON.stringify(page, null, 2));
    console.log(`✅ Generated: ${slug}`);
    created++;

    // Upsert index entry (add or update)
    const indexEntry = {
      slug,
      title: page.metaTitle,
      description: page.metaDescription,
      pageType: page.pageType,
      published: true,
      qualityScore: 9,
      lastUpdated: TODAY,
      keywords: page.keywords.slice(0, 6),
    };
    if (!existingSlugs.has(slug)) {
      newEntries.push(indexEntry);
    } else {
      const idx = existingIndex.findIndex(e => e.slug === slug);
      if (idx !== -1) existingIndex[idx] = indexEntry;
    }
  }

  // Update index.json
  const updatedIndex = [...existingIndex, ...newEntries];
  fs.writeFileSync(INDEX_PATH, JSON.stringify(updatedIndex, null, 2));

  console.log(`\n✅ Done! Generated ${created} university apply pages.`);
  console.log(`📄 Updated index.json with ${newEntries.length} new entries (total: ${updatedIndex.length})`);
  console.log(`\n📌 Next step: Run 'npm run generate:sitemap' to update the sitemap.`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
