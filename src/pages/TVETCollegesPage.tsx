import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  Search,
  ArrowRight,
  BookOpen,
  MapPin,
  ChevronRight,
  Wrench,
  Briefcase,
  Laptop,
  Leaf,
  Building2,
  Zap,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TVETCollege {
  name: string;
  abbr: string;
  province: string;
  location: string;
  programs: string[];
  deadline: string;
  minEntry: string;
}

const TVET_COLLEGES: TVETCollege[] = [
  // Eastern Cape
  {
    name: "Buffalo City TVET College",
    abbr: "BCTVET",
    province: "Eastern Cape",
    location: "East London",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Tourism", "NCV: Finance"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "East Cape Midlands TVET College",
    abbr: "ECM",
    province: "Eastern Cape",
    location: "Graaff-Reinet / Uitenhage",
    programs: ["Engineering Studies", "Business Studies", "NCV: Agriculture", "NCV: Finance"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Ikhala TVET College",
    abbr: "Ikhala",
    province: "Eastern Cape",
    location: "Queenstown (Komani)",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Ingwe TVET College",
    abbr: "Ingwe",
    province: "Eastern Cape",
    location: "Lusikisiki / Mount Frere",
    programs: ["NCV: Agriculture", "NCV: Finance", "Business Studies", "Engineering Studies"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "King Hintsa TVET College",
    abbr: "KH TVET",
    province: "Eastern Cape",
    location: "Butterworth",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "King Sabata Dalindyebo TVET College",
    abbr: "KSD TVET",
    province: "Eastern Cape",
    location: "Mthatha",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Lovedale TVET College",
    abbr: "Lovedale",
    province: "Eastern Cape",
    location: "Alice",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Port Elizabeth TVET College",
    abbr: "PE TVET",
    province: "Eastern Cape",
    location: "Gqeberha (Port Elizabeth)",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Free State
  {
    name: "Flavius Mareka TVET College",
    abbr: "FMTVET",
    province: "Free State",
    location: "Sasolburg",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: IT"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Goldfields TVET College",
    abbr: "Goldfields",
    province: "Free State",
    location: "Welkom",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Maluti TVET College",
    abbr: "Maluti",
    province: "Free State",
    location: "Bethlehem",
    programs: ["Engineering Studies", "Business Studies", "NCV: Agriculture", "NCV: Finance"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Motheo TVET College",
    abbr: "Motheo",
    province: "Free State",
    location: "Bloemfontein",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Hospitality", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Gauteng
  {
    name: "Ekurhuleni East TVET College",
    abbr: "EEC",
    province: "Gauteng",
    location: "Springs / Tembisa",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Ekurhuleni West TVET College",
    abbr: "EWC",
    province: "Gauteng",
    location: "Alberton / Germiston",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Sedibeng TVET College",
    abbr: "Sedibeng",
    province: "Gauteng",
    location: "Vereeniging",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "South West Gauteng TVET College",
    abbr: "SWGC",
    province: "Gauteng",
    location: "Soweto / Dobsonville",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Hospitality", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Tshwane North TVET College",
    abbr: "TNC",
    province: "Gauteng",
    location: "Pretoria North / Atteridgeville",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Tshwane South TVET College",
    abbr: "TSC",
    province: "Gauteng",
    location: "Pretoria",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Western TVET College",
    abbr: "WTC",
    province: "Gauteng",
    location: "Krugersdorp / Roodepoort",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // KwaZulu-Natal
  {
    name: "Coastal KZN TVET College",
    abbr: "Coastal KZN",
    province: "KwaZulu-Natal",
    location: "Stanger (KwaDukuza)",
    programs: ["Engineering Studies", "Business Studies", "NCV: Tourism", "NCV: Finance", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Elangeni TVET College",
    abbr: "Elangeni",
    province: "KwaZulu-Natal",
    location: "Durban North / Pinetown",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Esayidi TVET College",
    abbr: "Esayidi",
    province: "KwaZulu-Natal",
    location: "Port Shepstone",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Majuba TVET College",
    abbr: "Majuba",
    province: "KwaZulu-Natal",
    location: "Newcastle",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Mnambithi TVET College",
    abbr: "Mnambithi",
    province: "KwaZulu-Natal",
    location: "Ladysmith",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Mthashana TVET College",
    abbr: "Mthashana",
    province: "KwaZulu-Natal",
    location: "Vryheid",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Thekwini TVET College",
    abbr: "Thekwini",
    province: "KwaZulu-Natal",
    location: "Durban",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Umfolozi TVET College",
    abbr: "Umfolozi",
    province: "KwaZulu-Natal",
    location: "Richards Bay / Empangeni",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Umgungundlovu TVET College",
    abbr: "UCTVET",
    province: "KwaZulu-Natal",
    location: "Pietermaritzburg",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Limpopo
  {
    name: "Capricorn TVET College",
    abbr: "Capricorn",
    province: "Limpopo",
    location: "Polokwane",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Lephalale TVET College",
    abbr: "Lephalale",
    province: "Limpopo",
    location: "Lephalale (Ellisras)",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Mopani South East TVET College",
    abbr: "MSE TVET",
    province: "Limpopo",
    location: "Giyani / Tzaneen",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Sekhukhune TVET College",
    abbr: "Sekhukhune",
    province: "Limpopo",
    location: "Burgersfort",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Vhembe TVET College",
    abbr: "Vhembe",
    province: "Limpopo",
    location: "Thohoyandou / Louis Trichardt",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Agriculture", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Waterberg TVET College",
    abbr: "Waterberg",
    province: "Limpopo",
    location: "Mokopane (Potgietersrus)",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Mpumalanga
  {
    name: "Ehlanzeni TVET College",
    abbr: "Ehlanzeni",
    province: "Mpumalanga",
    location: "Nelspruit (Mbombela)",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Gert Sibande TVET College",
    abbr: "Gert Sibande",
    province: "Mpumalanga",
    location: "Ermelo",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Nkangala TVET College",
    abbr: "Nkangala",
    province: "Mpumalanga",
    location: "Middelburg / Witbank (eMalahleni)",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // North West
  {
    name: "Orbit TVET College",
    abbr: "Orbit",
    province: "North West",
    location: "Rustenburg",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Taletso TVET College",
    abbr: "Taletso",
    province: "North West",
    location: "Mahikeng",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Vuselela TVET College",
    abbr: "Vuselela",
    province: "North West",
    location: "Klerksdorp / Potchefstroom",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: IT"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Northern Cape
  {
    name: "Northern Cape Rural TVET College",
    abbr: "NCR TVET",
    province: "Northern Cape",
    location: "Upington / Kuruman",
    programs: ["Engineering Studies", "Business Studies", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Northern Cape Urban TVET College",
    abbr: "NCU TVET",
    province: "Northern Cape",
    location: "Kimberley",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  // Western Cape
  {
    name: "College of Cape Town TVET College",
    abbr: "CCT",
    province: "Western Cape",
    location: "Cape Town",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "False Bay TVET College",
    abbr: "False Bay",
    province: "Western Cape",
    location: "Fish Hoek / Westlake, Cape Town",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Tourism", "NCV: Hospitality"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "Northlink TVET College",
    abbr: "Northlink",
    province: "Western Cape",
    location: "Parow / Bellville, Cape Town",
    programs: ["Engineering Studies", "Business Studies", "NCV: IT", "NCV: Finance", "NCV: Tourism", "NCV: Hospitality", "NCV: Education"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "South Cape TVET College",
    abbr: "South Cape",
    province: "Western Cape",
    location: "George / Oudtshoorn",
    programs: ["Engineering Studies", "Business Studies", "NCV: Tourism", "NCV: Agriculture", "NCV: Finance"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
  {
    name: "West Coast TVET College",
    abbr: "West Coast",
    province: "Western Cape",
    location: "Vredenburg / Malmesbury",
    programs: ["Engineering Studies", "Business Studies", "NCV: Tourism", "NCV: Finance", "NCV: Agriculture"],
    deadline: "Jan & Jul",
    minEntry: "Grade 9",
  },
];

const PROVINCE_COLORS: Record<string, string> = {
  "Eastern Cape": "bg-blue-100 text-blue-700 border-blue-200",
  "Free State": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Gauteng": "bg-purple-100 text-purple-700 border-purple-200",
  "KwaZulu-Natal": "bg-green-100 text-green-700 border-green-200",
  "Limpopo": "bg-orange-100 text-orange-700 border-orange-200",
  "Mpumalanga": "bg-red-100 text-red-700 border-red-200",
  "North West": "bg-teal-100 text-teal-700 border-teal-200",
  "Northern Cape": "bg-pink-100 text-pink-700 border-pink-200",
  "Western Cape": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

const PROVINCES = [
  "All",
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
] as const;

const NCV_PROGRAMS = [
  {
    icon: <Wrench className="w-5 h-5 text-purple-600" />,
    name: "Engineering & Related Design",
    color: "bg-purple-50 border-purple-200",
    description:
      "Covers mechanical drawing, workshop practice, fitting & turning. Leads to trade qualifications.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-orange-600" />,
    name: "Civil Engineering & Building Construction",
    color: "bg-orange-50 border-orange-200",
    description:
      "Bricklaying, plumbing, carpentry, surveying & construction project basics.",
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-600" />,
    name: "Electrical Infrastructure Construction",
    color: "bg-yellow-50 border-yellow-200",
    description:
      "Electrical wiring, installation & maintenance. Pathways into ESKOM, municipalities and private sector.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    name: "Finance, Economics & Accounting",
    color: "bg-blue-50 border-blue-200",
    description:
      "Bookkeeping, financial management, economics. Articulates to degrees in accounting & finance.",
  },
  {
    icon: <Laptop className="w-5 h-5 text-green-600" />,
    name: "Information & Communication Technology",
    color: "bg-green-50 border-green-200",
    description:
      "End-user computing, network fundamentals, systems support & web development basics.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-teal-600" />,
    name: "Management",
    color: "bg-teal-50 border-teal-200",
    description:
      "Business management, office administration & supervisory skills for the workplace.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-pink-600" />,
    name: "Marketing",
    color: "bg-pink-50 border-pink-200",
    description:
      "Digital marketing, retail, sales & customer service fundamentals.",
  },
  {
    icon: <Leaf className="w-5 h-5 text-lime-600" />,
    name: "Primary Agriculture",
    color: "bg-lime-50 border-lime-200",
    description:
      "Crop production, animal husbandry, agribusiness & agricultural management.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
    name: "Tourism",
    color: "bg-indigo-50 border-indigo-200",
    description:
      "Tour guiding, travel & tourism operations, customer service & cultural heritage.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-rose-600" />,
    name: "Hospitality",
    color: "bg-rose-50 border-rose-200",
    description:
      "Food & beverage, housekeeping, front office & hotel operations.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
    name: "Education & Development",
    color: "bg-amber-50 border-amber-200",
    description:
      "Early childhood development (ECD), foundation phase teaching support.",
  },
];

const N_COURSES = [
  {
    stream: "Engineering Studies",
    levels: "N1 – N6",
    subjects:
      "Engineering Science, Mathematics, Drawing, Fitting & Turning, Electrical Trade Theory, Plating & Structural Steel Drawing, and more.",
    outcome:
      "N3 + trade test = artisan qualification. N6 + 18 months' work experience = National Diploma.",
    color: "border-purple-300 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    stream: "Business Studies",
    levels: "N4 – N6",
    subjects:
      "Accounting, Business Management, Computer Practice, Entrepreneurship, Financial Accounting, Management Communication, Marketing, Office Practice.",
    outcome:
      "N6 + 18 months' work experience = National Diploma in Business Management / Marketing / Financial Management.",
    color: "border-blue-300 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
];

const TVETCollegesPage = () => {
  const [search, setSearch] = useState("");
  const [activeProvince, setActiveProvince] = useState<string>("All");

  const filtered = TVET_COLLEGES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.abbr.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchesProvince =
      activeProvince === "All" || c.province === activeProvince;
    return matchesSearch && matchesProvince;
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All TVET Colleges in South Africa 2026",
    description:
      "Complete directory of all 50 public TVET colleges in South Africa — NCV programmes, N-courses, application information and province filter.",
    numberOfItems: TVET_COLLEGES.length,
    itemListElement: TVET_COLLEGES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      description: `${c.province} — ${c.location}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://studybuddy.works/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "TVET Colleges South Africa",
        item: "https://studybuddy.works/tvet-colleges",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many TVET colleges are there in South Africa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are 50 public TVET (Technical and Vocational Education and Training) colleges in South Africa, spread across all 9 provinces. They are funded and regulated by the Department of Higher Education and Training (DHET).",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum requirement to apply to a TVET college?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For NCV (National Certificate: Vocational) programmes you need a Grade 9 certificate. For Report 191 N-courses at the N1–N3 level you typically need Grade 9, while N4–N6 requires a matric (Grade 12) certificate or equivalent.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between NCV and N-courses at TVET colleges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NCV (National Certificate: Vocational) programmes run over 3 years (Levels 2, 3 and 4) and are school-based qualifications entered from Grade 9. N-courses (Report 191) are offered at N1–N6 and split into Engineering Studies and Business Studies streams. Completing N6 plus 18 months of practical work experience earns you a National Diploma.",
        },
      },
      {
        "@type": "Question",
        name: "Can TVET college qualifications lead to university entrance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. NCV Level 4 with specified minimum pass marks in certain subjects can qualify for university admission, subject to meeting the APS and subject requirements of each university. N6 National Diplomas are also recognised by some universities for advanced standing or postgraduate programmes.",
        },
      },
      {
        "@type": "Question",
        name: "Does NSFAS cover TVET college studies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. NSFAS funds qualifying students at all 50 public TVET colleges for both NCV and N-course programmes. NSFAS applications open in October each year at www.nsfas.org.za.",
        },
      },
      {
        "@type": "Question",
        name: "When do TVET college applications open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most TVET colleges intake students in January (Semester 1) and July (Semester 2). Applications for January intake typically open in September–November the previous year. Some colleges accept walk-in registrations at the start of each semester.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>TVET Colleges in South Africa 2026 — All 50 Colleges, Courses & Skills</title>
        <meta
          name="description"
          content="Complete guide to all 50 public TVET colleges in South Africa. NCV programmes, N-courses (N1–N6), application requirements, provinces, NSFAS funding and more."
        />
        <meta
          name="keywords"
          content="TVET colleges South Africa, technical vocational colleges SA, NCV programmes, N1 N2 N3 N4 N5 N6 courses, TVET application 2026, NSFAS TVET, engineering studies TVET, business studies TVET"
        />
        <meta
          property="og:title"
          content="TVET Colleges South Africa 2026 — All 50 Colleges, Courses & Skills"
        />
        <meta
          property="og:description"
          content="Directory of all 50 public TVET colleges in South Africa with NCV and N-course information, province filter and application details."
        />
        <meta
          property="og:url"
          content="https://studybuddy.works/tvet-colleges"
        />
        <link rel="canonical" href="https://studybuddy.works/tvet-colleges" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Hero */}
        <section className="pt-24 pb-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Wrench className="w-4 h-4" />
              50 Public TVET Colleges
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              TVET Colleges in South Africa
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              All 50 public Technical and Vocational Education and Training (TVET) colleges across
              South Africa — find NCV programmes, N-courses, application requirements and
              NSFAS-funded pathways to employment and further study.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <a
                  href={`https://wa.me/27680187300?text=${encodeURIComponent(
                    "Hi! I need help applying to a TVET college. Can you assist me?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Application Help
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/apply">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  University Applications
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What is a TVET college? */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              What is a TVET College?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Vocational & Technical Skills</p>
                <p>
                  TVET colleges focus on practical, industry-relevant skills that lead directly to
                  employment. Programmes are aligned with SAQA (NQF Levels 2–6) and recognised by
                  employers across all sectors.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Two Main Qualification Types</p>
                <p>
                  <strong>NCV</strong> (National Certificate: Vocational) — 3-year programmes from
                  Grade 9, at Levels 2, 3 and 4.
                  <br />
                  <strong>N-courses</strong> (Report 191) — N1–N6 in Engineering or Business
                  Studies; N6 + work experience = National Diploma.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">NSFAS Funded</p>
                <p>
                  Qualifying students at all public TVET colleges can receive NSFAS funding covering
                  tuition, accommodation and meals. Apply at{" "}
                  <a
                    href="https://www.nsfas.org.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    nsfas.org.za
                  </a>
                  {" "}in October each year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NCV Programmes */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">NCV Programmes Available at TVET Colleges</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                National Certificate: Vocational — 3-year programme (Levels 2, 3 &amp; 4) •
                Entry: Grade 9
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NCV_PROGRAMS.map((prog) => (
                <div
                  key={prog.name}
                  className={`rounded-xl border p-4 ${prog.color}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {prog.icon}
                    <span className="font-semibold text-sm">{prog.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{prog.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* N-Courses */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Report 191 N-Courses (N1–N6)</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Industry-recognised qualifications leading to a National Diploma
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {N_COURSES.map((course) => (
                <div
                  key={course.stream}
                  className={`rounded-2xl border-2 p-6 ${course.color}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{course.stream}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${course.badge}`}
                    >
                      {course.levels}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Subjects include:</strong> {course.subjects}
                  </p>
                  <p className="text-sm">
                    <strong>Outcome:</strong> {course.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <WhatsAppPricingOffers
          variant="school"
          heading="TVET College Application Assistance — R600"
        />

        {/* Search & Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by college name, abbreviation or city…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PROVINCES.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProvince(p)}
                  className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    activeProvince === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white border-gray-200 text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* College grid */}
        <section className="container mx-auto px-4 pb-16 flex-1">
          <div className="max-w-5xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">No colleges found</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveProvince("All");
                  }}
                  className="text-primary underline text-sm mt-2"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((college) => (
                  <Card
                    key={college.name}
                    className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${PROVINCE_COLORS[college.province] ?? ""}`}
                        >
                          {college.province}
                        </Badge>
                      </div>
                      <CardTitle className="text-base leading-snug">
                        {college.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground font-medium">
                        {college.abbr}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Min Entry:</span>
                        <span className="font-semibold text-foreground">
                          {college.minEntry}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Intakes:</span>
                        <span className="font-semibold text-foreground">
                          {college.deadline}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {college.programs.slice(0, 3).map((prog) => (
                          <span
                            key={prog}
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                          >
                            {prog}
                          </span>
                        ))}
                        {college.programs.length > 3 && (
                          <span className="text-xs text-muted-foreground px-1 py-0.5">
                            +{college.programs.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/27680187300?text=${encodeURIComponent(
                            `Hi! I need help applying to ${college.name}. Can you assist me?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-green-700 text-sm font-medium hover:gap-2 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Get application help
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Showing {filtered.length} of {TVET_COLLEGES.length} colleges
            </p>
          </div>
        </section>

        {/* Tips */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Tips for Applying to a TVET College</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Decide between NCV and N-courses.</strong> NCV is better if you are
                coming straight from Grade 9 and want a structured 3-year programme. N-courses are
                ideal if you have matric and want to enter the job market faster or work toward a
                National Diploma.
              </p>
              <p>
                <strong>2. Apply for NSFAS at the same time.</strong> NSFAS covers tuition,
                accommodation and living expenses at public TVET colleges for qualifying students.
                Apply at{" "}
                <a
                  href="https://www.nsfas.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  nsfas.org.za
                </a>
                {" "}— applications open in October.
              </p>
              <p>
                <strong>3. Register for two semesters per year.</strong> Most TVET colleges have
                January and July intakes. If you miss January, apply for July so you don't lose
                a full year.
              </p>
              <p>
                <strong>4. Keep certified copies of all documents.</strong> You will need a
                certified copy of your ID, your latest school results or matric certificate, and
                proof of residence.
              </p>
              <p>
                <strong>5. NCV Level 4 can qualify for university.</strong> Completing NCV Level 4
                with strong marks in the right subjects can meet university admission requirements —
                check the APS requirements of your chosen university.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/apply">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  University Applications
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/bursaries">
                  Find Bursaries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/aps-calculator">
                  APS Calculator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <WhatsAppAssistanceBanner
          heading="Need Help Applying to a TVET College?"
          description="Get free 1-on-1 assistance — I'll personally guide you through your TVET college application, help you choose the right programme, and make sure your documents are in order."
        />

        <Footer />
      </div>
    </>
  );
};

export default TVETCollegesPage;
