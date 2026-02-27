export interface UniversityOwnBursary {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  value: string;
  applicationUrl: string;
}

export interface UniversityBursaryInfo {
  slug: string;
  name: string;
  abbr: string;
  location: string;
  type: "Traditional University" | "University of Technology" | "Comprehensive University" | "Private Institution";
  applySlug: string;
  bursaryPageUrl: string;
  bursaries: UniversityOwnBursary[];
}

export const UNIVERSITY_BURSARY_DATA: UniversityBursaryInfo[] = [
  {
    slug: "uct",
    name: "University of Cape Town",
    abbr: "UCT",
    location: "Cape Town",
    type: "Traditional University",
    applySlug: "how-to-apply-to-uct",
    bursaryPageUrl: "https://www.uct.ac.za/main/students/funding",
    bursaries: [
      {
        id: "uct-financial-aid",
        name: "UCT Financial Aid (Need-Based)",
        description:
          "UCT's main need-based financial aid programme covers tuition, accommodation and a living allowance for qualifying South African students. Funded through a combination of institutional funds, NSFAS and donor bursaries.",
        eligibility:
          "South African citizens; household income below R600 000 p.a.; registered UCT students in good academic standing.",
        value: "Up to full tuition, accommodation and living allowance (need-dependent)",
        applicationUrl: "https://www.uct.ac.za/main/students/funding",
      },
      {
        id: "uct-jameson",
        name: "Jameson Scholarship",
        description:
          "One of UCT's most prestigious merit scholarships, awarded to exceptional first-year students who demonstrate outstanding academic achievement and potential leadership.",
        eligibility:
          "South African citizens; top-performing NSC results (typically 90%+ average); applying to a full-time undergraduate degree at UCT.",
        value: "Full tuition, accommodation and living allowance for the duration of the degree",
        applicationUrl: "https://www.uct.ac.za/main/students/funding/undergraduate-scholarships",
      },
      {
        id: "uct-council",
        name: "UCT Council Merit Award",
        description:
          "Awarded annually to high-achieving students entering first year at UCT. Recipients are selected based on NSC results and are renewable each year conditional on academic performance.",
        eligibility:
          "South African citizens entering first year; minimum 80% NSC average; good academic standing maintained each year.",
        value: "Partial to full tuition coverage per year (renewable)",
        applicationUrl: "https://www.uct.ac.za/main/students/funding/undergraduate-scholarships",
      },
      {
        id: "uct-clarendon",
        name: "Clarendon Fund Scholarship",
        description:
          "The Clarendon Fund provides postgraduate scholarships at UCT for exceptional students from diverse backgrounds pursuing master's and doctoral degrees.",
        eligibility:
          "South African citizens; enrolment in a postgraduate programme at UCT; strong academic track record.",
        value: "Full postgraduate fees and a monthly stipend",
        applicationUrl: "https://www.uct.ac.za/main/students/funding/postgraduate-scholarships",
      },
      {
        id: "uct-nsfas",
        name: "NSFAS at UCT",
        description:
          "UCT is a registered NSFAS institution. Qualifying students can receive full funding for tuition, accommodation, meals, transport and a personal care allowance.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; registered at UCT for an approved qualification.",
        value: "Full tuition, accommodation, meals and allowances (income-dependent)",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "wits",
    name: "University of the Witwatersrand",
    abbr: "Wits",
    location: "Johannesburg",
    type: "Traditional University",
    applySlug: "how-to-apply-to-wits",
    bursaryPageUrl: "https://www.wits.ac.za/fees-funding/",
    bursaries: [
      {
        id: "wits-financial-aid",
        name: "Wits Financial Aid",
        description:
          "Wits Financial Aid provides need-based funding for undergraduate students who demonstrate financial need. Funding is drawn from institutional, government and private donor sources.",
        eligibility:
          "South African citizens; financial need demonstrated through a means test; registered at Wits in good academic standing.",
        value: "Partial to full coverage of tuition and accommodation (need-based)",
        applicationUrl: "https://www.wits.ac.za/fees-funding/",
      },
      {
        id: "wits-excellence",
        name: "Wits Academic Excellence Award",
        description:
          "Awarded to top-performing first-year students based on NSC matric results. The award is renewable annually conditional on maintaining a strong academic average.",
        eligibility:
          "South African citizens entering first year at Wits; minimum 85% NSC average in relevant subjects.",
        value: "Partial tuition coverage (renewable each year based on performance)",
        applicationUrl: "https://www.wits.ac.za/fees-funding/merit-scholarships/",
      },
      {
        id: "wits-humanities",
        name: "Wits Faculty of Humanities Bursary",
        description:
          "The Faculty of Humanities offers a range of bursaries for students studying arts, social sciences, law and related disciplines. Available for both undergraduate and postgraduate study.",
        eligibility:
          "Registered Wits students in the Faculty of Humanities; demonstrated financial need or academic merit (varies by bursary).",
        value: "Partial tuition, up to full tuition for top achievers",
        applicationUrl: "https://www.wits.ac.za/humanities/",
      },
      {
        id: "wits-nsfas",
        name: "NSFAS at Wits",
        description:
          "Wits is a registered NSFAS institution. Qualifying students receive funding that can cover tuition, accommodation, transport and a living allowance.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at Wits.",
        value: "Full tuition, accommodation, meals and allowances (income-dependent)",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "stellenbosch",
    name: "Stellenbosch University",
    abbr: "SU / Maties",
    location: "Stellenbosch",
    type: "Traditional University",
    applySlug: "how-to-apply-to-stellenbosch-university",
    bursaryPageUrl: "https://www.sun.ac.za/english/financial-aid",
    bursaries: [
      {
        id: "su-financial-aid",
        name: "SU Financial Aid Programme",
        description:
          "Stellenbosch University's Financial Aid Programme assists students who are financially unable to fund their studies. Applications are assessed annually based on financial need.",
        eligibility:
          "South African citizens; demonstrated financial need; registered SU students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-dependent)",
        applicationUrl: "https://www.sun.ac.za/english/financial-aid",
      },
      {
        id: "su-rector-award",
        name: "Rector's Award",
        description:
          "The Rector's Award is SU's top merit scholarship, recognising exceptional academic achievement at NSC level. It is one of the most prestigious undergraduate scholarships at the university.",
        eligibility:
          "South African citizens entering first year; outstanding NSC results (90%+ average); demonstrated leadership and community involvement.",
        value: "Full tuition and accommodation for the minimum duration of the degree",
        applicationUrl: "https://www.sun.ac.za/english/financial-aid/bursaries",
      },
      {
        id: "su-merit-award",
        name: "SU Merit Award",
        description:
          "The Merit Award is awarded to high-achieving first-year students based on NSC matric results. Recipients must maintain academic performance to keep the award.",
        eligibility:
          "South African citizens entering first year at SU; minimum 80% NSC average.",
        value: "Partial tuition coverage per year (renewable)",
        applicationUrl: "https://www.sun.ac.za/english/financial-aid/bursaries",
      },
      {
        id: "su-nsfas",
        name: "NSFAS at Stellenbosch",
        description:
          "SU is a registered NSFAS institution. Qualifying students receive full NSFAS funding covering tuition, accommodation and living expenses.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; registered for an approved qualification at SU.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "up",
    name: "University of Pretoria",
    abbr: "UP / Tuks",
    location: "Pretoria",
    type: "Traditional University",
    applySlug: "how-to-apply-to-university-of-pretoria",
    bursaryPageUrl: "https://www.up.ac.za/financial-aid",
    bursaries: [
      {
        id: "up-vc-award",
        name: "UP Vice-Chancellor's Achiever Award",
        description:
          "UP's most prestigious undergraduate scholarship, awarded to top-performing first-year students. Recipients receive full funding for the minimum duration of their degree.",
        eligibility:
          "South African citizens; minimum 90% NSC average; demonstrable leadership qualities and community involvement.",
        value: "Full tuition and accommodation for the full duration of the degree",
        applicationUrl: "https://www.up.ac.za/financial-aid",
      },
      {
        id: "up-financial-aid",
        name: "UP Financial Aid (Need-Based)",
        description:
          "UP's Financial Aid Office assists students who cannot afford the cost of higher education. Funding is available for both undergraduate and postgraduate students.",
        eligibility:
          "South African citizens; combined household income below R600 000 p.a.; registered UP students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-based)",
        applicationUrl: "https://www.up.ac.za/financial-aid",
      },
      {
        id: "up-nedbank-affinity",
        name: "Nedbank Affinity Bursary (UP)",
        description:
          "Nedbank partners with UP to offer merit-based bursaries to high-achieving students in Commerce, Law, and related faculties.",
        eligibility:
          "South African citizens; studying Commerce, Law or related fields at UP; minimum 75% academic average.",
        value: "Partial to full tuition",
        applicationUrl: "https://www.up.ac.za/financial-aid/bursaries",
      },
      {
        id: "up-nsfas",
        name: "NSFAS at UP (Tuks)",
        description:
          "UP is a registered NSFAS institution. NSFAS funding covers tuition, accommodation, transport and a living allowance for qualifying students.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at UP.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "ukzn",
    name: "University of KwaZulu-Natal",
    abbr: "UKZN",
    location: "Durban / Pietermaritzburg",
    type: "Traditional University",
    applySlug: "how-to-apply-to-ukzn",
    bursaryPageUrl: "https://www.ukzn.ac.za/financial-aid/",
    bursaries: [
      {
        id: "ukzn-financial-aid",
        name: "UKZN Financial Aid",
        description:
          "UKZN's Financial Aid Office provides bursaries, loans and scholarships to students who demonstrate financial need. Students must apply each year.",
        eligibility:
          "South African citizens; demonstrated financial need; registered UKZN students maintaining satisfactory academic progress.",
        value: "Partial to full tuition and accommodation (need-based)",
        applicationUrl: "https://www.ukzn.ac.za/financial-aid/",
      },
      {
        id: "ukzn-excellence",
        name: "UKZN Academic Excellence Scholarship",
        description:
          "Awarded to top-performing students entering first year, based on outstanding NSC matric results. The scholarship is renewable annually based on academic performance.",
        eligibility:
          "South African citizens entering first year; minimum 85% NSC average; full-time registration at UKZN.",
        value: "Partial tuition per year (renewable)",
        applicationUrl: "https://www.ukzn.ac.za/financial-aid/scholarships/",
      },
      {
        id: "ukzn-nsfas",
        name: "NSFAS at UKZN",
        description:
          "UKZN is a registered NSFAS institution. Qualifying students receive full NSFAS funding covering tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at UKZN.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "uj",
    name: "University of Johannesburg",
    abbr: "UJ",
    location: "Johannesburg",
    type: "Comprehensive University",
    applySlug: "how-to-apply-to-uj",
    bursaryPageUrl: "https://www.uj.ac.za/students/financial-aid/",
    bursaries: [
      {
        id: "uj-financial-aid",
        name: "UJ Financial Aid",
        description:
          "UJ Financial Aid provides bursaries and loans to financially needy students. Applications are open each year to both new and returning students.",
        eligibility:
          "South African citizens; combined household income below R600 000 p.a.; registered UJ students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-dependent)",
        applicationUrl: "https://www.uj.ac.za/students/financial-aid/",
      },
      {
        id: "uj-merit",
        name: "UJ Merit Award",
        description:
          "Awarded to top-performing first-year students based on matric results. The award acknowledges academic excellence and supports students throughout their degree.",
        eligibility:
          "South African citizens entering first year at UJ; minimum 80% NSC average.",
        value: "Partial tuition coverage per year (renewable based on academic performance)",
        applicationUrl: "https://www.uj.ac.za/students/financial-aid/scholarships/",
      },
      {
        id: "uj-nsfas",
        name: "NSFAS at UJ",
        description:
          "UJ is a registered NSFAS institution. Qualifying students receive NSFAS funding for tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at UJ.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "unisa",
    name: "University of South Africa",
    abbr: "UNISA",
    location: "Distance Learning (Nationwide)",
    type: "Comprehensive University",
    applySlug: "how-to-apply-to-unisa",
    bursaryPageUrl: "https://www.unisa.ac.za/sites/myunisa/default/Financial-aid",
    bursaries: [
      {
        id: "unisa-financial-aid",
        name: "UNISA Financial Aid",
        description:
          "UNISA's financial aid programme assists qualifying students who are unable to fund their distance learning fees. The programme covers registration and module fees.",
        eligibility:
          "South African citizens; demonstrated financial need; registered UNISA students maintaining satisfactory academic progress.",
        value: "Partial to full module fees (need-based)",
        applicationUrl: "https://www.unisa.ac.za/sites/myunisa/default/Financial-aid",
      },
      {
        id: "unisa-nsfas",
        name: "NSFAS at UNISA",
        description:
          "UNISA is a registered NSFAS institution. NSFAS covers approved UNISA qualifications. Distance learning students receive a capped annual allowance.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an NSFAS-approved qualification at UNISA.",
        value: "Module fees + annual allowance for transport and study materials",
        applicationUrl: "https://www.nsfas.org.za",
      },
      {
        id: "unisa-isfap",
        name: "ISFAP Bursary (UNISA)",
        description:
          "The Ikusasa Student Financial Aid Programme (ISFAP) supports 'missing middle' students — those who earn too much for NSFAS but too little to self-fund studies, including at UNISA.",
        eligibility:
          "South African citizens; combined household income between R350 000 and R600 000 p.a.; studying an approved qualification.",
        value: "Full tuition and a living allowance",
        applicationUrl: "https://www.isfap.org.za",
      },
    ],
  },
  {
    slug: "nwu",
    name: "North-West University",
    abbr: "NWU",
    location: "Potchefstroom / Mahikeng",
    type: "Traditional University",
    applySlug: "how-to-apply-to-north-west-university",
    bursaryPageUrl: "https://studies.nwu.ac.za/financial-aid",
    bursaries: [
      {
        id: "nwu-merit",
        name: "NWU Merit Bursary",
        description:
          "NWU's Merit Bursary is awarded to top-performing first-year students based on NSC matric results. It is renewable annually based on academic performance.",
        eligibility:
          "South African citizens entering first year at NWU; minimum 80% NSC average in relevant subjects.",
        value: "Partial tuition coverage per year (renewable)",
        applicationUrl: "https://studies.nwu.ac.za/financial-aid/merit-bursaries",
      },
      {
        id: "nwu-financial-aid",
        name: "NWU Financial Aid",
        description:
          "NWU's Financial Aid programme assists students who cannot afford university fees. Applications must be submitted before the academic year begins.",
        eligibility:
          "South African citizens; demonstrated financial need; registered NWU students in good standing.",
        value: "Partial to full tuition and accommodation (need-dependent)",
        applicationUrl: "https://studies.nwu.ac.za/financial-aid",
      },
      {
        id: "nwu-nsfas",
        name: "NSFAS at NWU",
        description:
          "NWU is a registered NSFAS institution. Qualifying students receive NSFAS funding covering tuition, accommodation and living costs at any NWU campus.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at NWU.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "rhodes",
    name: "Rhodes University",
    abbr: "Rhodes / RU",
    location: "Makhanda (Grahamstown)",
    type: "Traditional University",
    applySlug: "how-to-apply-to-rhodes-university",
    bursaryPageUrl: "https://www.ru.ac.za/financialaid/",
    bursaries: [
      {
        id: "rhodes-academic-excellence",
        name: "Rhodes Academic Excellence Scholarship",
        description:
          "Awarded to top-performing first-year students at Rhodes. The scholarship is one of the most competitive at the university and recognises outstanding NSC results.",
        eligibility:
          "South African citizens entering first year at Rhodes; minimum 85% NSC average; strong community involvement.",
        value: "Full tuition and accommodation for the duration of the degree",
        applicationUrl: "https://www.ru.ac.za/financialaid/scholarshipsawards/",
      },
      {
        id: "rhodes-financial-aid",
        name: "Rhodes Financial Aid Programme",
        description:
          "Rhodes Financial Aid assists students who cannot fund their studies. Need-based support includes bursaries and loans to cover tuition and accommodation.",
        eligibility:
          "South African citizens; demonstrated financial need; registered Rhodes students maintaining satisfactory academic progress.",
        value: "Partial to full tuition and accommodation (need-based)",
        applicationUrl: "https://www.ru.ac.za/financialaid/",
      },
      {
        id: "rhodes-nsfas",
        name: "NSFAS at Rhodes",
        description:
          "Rhodes University is a registered NSFAS institution. NSFAS covers full tuition, accommodation and living costs for qualifying students.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at Rhodes.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "ufs",
    name: "University of the Free State",
    abbr: "UFS / Kovsies",
    location: "Bloemfontein",
    type: "Traditional University",
    applySlug: "how-to-apply-to-ufs",
    bursaryPageUrl: "https://www.ufs.ac.za/alumni-student-affairs/departments-and-divisions/student-finance",
    bursaries: [
      {
        id: "ufs-financial-aid",
        name: "UFS Student Finance (Need-Based)",
        description:
          "UFS Student Finance provides need-based bursaries and loans to students who are financially unable to fund their studies. All undergraduate and postgraduate students may apply.",
        eligibility:
          "South African citizens; combined household income below R600 000 p.a.; registered UFS students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-dependent)",
        applicationUrl: "https://www.ufs.ac.za/alumni-student-affairs/departments-and-divisions/student-finance",
      },
      {
        id: "ufs-merit",
        name: "UFS Rector's Excellence Award",
        description:
          "Awarded to the top-performing first-year students at UFS based on outstanding NSC matric results. The award is renewable annually.",
        eligibility:
          "South African citizens entering first year at UFS; minimum 85% NSC average.",
        value: "Partial to full tuition per year (renewable based on academic performance)",
        applicationUrl: "https://www.ufs.ac.za/alumni-student-affairs/departments-and-divisions/student-finance/bursaries",
      },
      {
        id: "ufs-nsfas",
        name: "NSFAS at UFS",
        description:
          "UFS is a registered NSFAS institution. Qualifying students receive full NSFAS funding covering tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at UFS.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "uwc",
    name: "University of the Western Cape",
    abbr: "UWC",
    location: "Bellville, Cape Town",
    type: "Comprehensive University",
    applySlug: "how-to-apply-to-uwc",
    bursaryPageUrl: "https://www.uwc.ac.za/Prospective/Pages/Financial-Aid.aspx",
    bursaries: [
      {
        id: "uwc-financial-aid",
        name: "UWC Financial Aid",
        description:
          "UWC's Financial Aid office administers bursaries, loans and scholarships for financially needy students. UWC is historically known for its commitment to student access and affordability.",
        eligibility:
          "South African citizens; demonstrated financial need; registered UWC students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-dependent)",
        applicationUrl: "https://www.uwc.ac.za/Prospective/Pages/Financial-Aid.aspx",
      },
      {
        id: "uwc-merit",
        name: "UWC Academic Merit Scholarship",
        description:
          "Awarded to top-performing first-year students at UWC. The scholarship is renewable based on maintaining strong academic performance each year.",
        eligibility:
          "South African citizens entering first year; minimum 80% NSC average; full-time registration at UWC.",
        value: "Partial tuition per year (renewable)",
        applicationUrl: "https://www.uwc.ac.za/Prospective/Pages/Financial-Aid.aspx",
      },
      {
        id: "uwc-nsfas",
        name: "NSFAS at UWC",
        description:
          "UWC is a registered NSFAS institution. NSFAS funding covers tuition, accommodation and living expenses for qualifying students.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at UWC.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "nmu",
    name: "Nelson Mandela University",
    abbr: "NMU",
    location: "Gqeberha (Port Elizabeth)",
    type: "Comprehensive University",
    applySlug: "how-to-apply-to-nelson-mandela-university",
    bursaryPageUrl: "https://www.mandela.ac.za/Student-Life/Financial-Aid",
    bursaries: [
      {
        id: "nmu-financial-aid",
        name: "NMU Financial Aid",
        description:
          "NMU's Financial Aid Unit provides bursaries, loans and work-study opportunities to financially needy students at all campuses.",
        eligibility:
          "South African citizens; demonstrated financial need; registered NMU students in good standing.",
        value: "Partial to full tuition and accommodation (need-based)",
        applicationUrl: "https://www.mandela.ac.za/Student-Life/Financial-Aid",
      },
      {
        id: "nmu-merit",
        name: "NMU Academic Excellence Award",
        description:
          "Awarded to top-performing first-year students based on NSC matric results. The award is renewable provided the student maintains strong academic performance.",
        eligibility:
          "South African citizens entering first year at NMU; minimum 80% NSC average.",
        value: "Partial tuition per year (renewable)",
        applicationUrl: "https://www.mandela.ac.za/Student-Life/Financial-Aid/Bursaries",
      },
      {
        id: "nmu-nsfas",
        name: "NSFAS at NMU",
        description:
          "NMU is a registered NSFAS institution. Qualifying students receive full NSFAS funding for tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at NMU.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "cput",
    name: "Cape Peninsula University of Technology",
    abbr: "CPUT",
    location: "Cape Town",
    type: "University of Technology",
    applySlug: "how-to-apply-to-cput",
    bursaryPageUrl: "https://www.cput.ac.za/students/financial-aid",
    bursaries: [
      {
        id: "cput-financial-aid",
        name: "CPUT Financial Aid",
        description:
          "CPUT Financial Aid provides bursaries and grants to students who cannot afford their studies. The department also administers various external bursaries on behalf of donors.",
        eligibility:
          "South African citizens; demonstrated financial need; registered CPUT students in good academic standing.",
        value: "Partial to full tuition and accommodation (need-based)",
        applicationUrl: "https://www.cput.ac.za/students/financial-aid",
      },
      {
        id: "cput-nsfas",
        name: "NSFAS at CPUT",
        description:
          "CPUT is a registered NSFAS institution. Qualifying students receive NSFAS funding covering tuition, accommodation and living expenses.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at CPUT.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
      {
        id: "cput-isfap",
        name: "ISFAP Bursary (CPUT)",
        description:
          "The Ikusasa Student Financial Aid Programme supports 'missing middle' students who earn too much for NSFAS but cannot self-fund their education at CPUT.",
        eligibility:
          "South African citizens; combined household income between R350 000 and R600 000 p.a.; studying an approved qualification at CPUT.",
        value: "Full tuition and a living allowance",
        applicationUrl: "https://www.isfap.org.za",
      },
    ],
  },
  {
    slug: "tut",
    name: "Tshwane University of Technology",
    abbr: "TUT",
    location: "Pretoria",
    type: "University of Technology",
    applySlug: "how-to-apply-to-tut",
    bursaryPageUrl: "https://www.tut.ac.za/life-on-campus/financial-aid",
    bursaries: [
      {
        id: "tut-financial-aid",
        name: "TUT Financial Aid",
        description:
          "TUT's Financial Aid department administers bursaries, loans and other financial support for registered students. Applications must be submitted annually.",
        eligibility:
          "South African citizens; demonstrated financial need; registered TUT students in good standing.",
        value: "Partial to full tuition (need-based)",
        applicationUrl: "https://www.tut.ac.za/life-on-campus/financial-aid",
      },
      {
        id: "tut-nsfas",
        name: "NSFAS at TUT",
        description:
          "TUT is a registered NSFAS institution. Qualifying students receive NSFAS funding for tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at TUT.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
  {
    slug: "dut",
    name: "Durban University of Technology",
    abbr: "DUT",
    location: "Durban",
    type: "University of Technology",
    applySlug: "how-to-apply-to-dut",
    bursaryPageUrl: "https://www.dut.ac.za/students/financial-aid/",
    bursaries: [
      {
        id: "dut-financial-aid",
        name: "DUT Financial Aid",
        description:
          "DUT's Financial Aid Office provides bursaries, grants and loans to financially needy students. The office also facilitates corporate bursaries available to DUT students.",
        eligibility:
          "South African citizens; demonstrated financial need; registered DUT students in good standing.",
        value: "Partial to full tuition (need-based)",
        applicationUrl: "https://www.dut.ac.za/students/financial-aid/",
      },
      {
        id: "dut-nsfas",
        name: "NSFAS at DUT",
        description:
          "DUT is a registered NSFAS institution. Qualifying students receive NSFAS funding for tuition, accommodation and living costs.",
        eligibility:
          "South African citizens; combined household income below R350 000 p.a.; studying an approved qualification at DUT.",
        value: "Full tuition, accommodation, meals and allowances",
        applicationUrl: "https://www.nsfas.org.za",
      },
    ],
  },
];

/** Lookup map by slug for O(1) access */
export const UNIVERSITY_BURSARY_MAP = Object.fromEntries(
  UNIVERSITY_BURSARY_DATA.map((u) => [u.slug, u])
) as Record<string, UniversityBursaryInfo>;
