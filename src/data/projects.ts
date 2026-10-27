import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    slug: "hylic-sketch",
    title: "Hylic Sketch",
    category: "Architecture & interiors",
    projectType: "Business website",
    summary:
      "A digital home for a Bangladeshi architecture and interior design studio, built around portfolio storytelling and project enquiries.",
    description:
      "Hylic Sketch presents architecture and interior design work through a visual, editorial website. The public site includes a project portfolio, service pages, a design process, testimonials, a journal, careers, and a quote request path.",
    objective:
      "Give an architecture practice a credible online presence that can show the quality of its work, explain its services, and turn interest into project conversations.",
    overview: [
      "Hylic Sketch is the public website for an architecture and interior design company in Bangladesh. Its primary job is to make a body of visual work feel considered, credible, and easy to explore.",
      "The site uses large project imagery, restrained navigation, and clear calls to discuss a new project. It supports the business across several stages of the buying journey: discovering the studio, understanding the service, reviewing past work, and starting a quotation.",
    ],
    roleNote:
      "This project is listed as part of Shine Akhanda's client portfolio. The public case study below is limited to verifiable details from the live website; a client-approved breakdown of the exact project scope is available on request.",
    stack: ["React", "Framer Motion", "Modern CSS", "Cloudflare"],
    highlights: [
      "Editorial architecture and interiors presentation",
      "Portfolio, service, process, journal, and careers content",
      "Clear routes to a project quote and direct contact",
      "Responsive visual storytelling for high-value work",
    ],
    externalUrl: "https://hylicsketch.com",
    image: {
      src: "/projects/hylic-sketch.webp",
      alt: "Hylic Sketch architecture and interior design website homepage",
      width: 1440,
      height: 1100,
    },
    ogImage: "/projects/hylic-sketch-og.jpg",
    index: "01",
  },
  {
    slug: "moushafi-hospital",
    title: "Moushafi Hospital",
    category: "Healthcare",
    projectType: "Hospital website",
    summary:
      "A service-led hospital website for Mymensingh, with doctor information, surgical services, appointment routes, and emergency contact.",
    description:
      "Moushafi Hospital uses a direct, information-first website to explain its surgical services, introduce its doctors, and make appointments and emergency contact easy to find.",
    objective:
      "Help local patients understand the hospital's services, find the right doctor, and take action quickly on a phone or desktop.",
    overview: [
      "Moushafi Hospital is a specialized surgical hospital in Mymensingh. The website needs to do practical work: explain available care, introduce specialists, answer common patient questions, and keep appointment and emergency contact details reachable.",
      "The interface is built around accessible navigation and mobile-first contact actions. Service and doctor content sit alongside frequently asked questions, making the website useful before a patient ever calls.",
    ],
    roleNote:
      "This project is listed as part of Shine Akhanda's client portfolio. The public case study below is limited to verifiable details from the live website; a client-approved breakdown of the exact project scope is available on request.",
    stack: ["PHP", "Bootstrap 5", "Responsive CSS", "Cloudflare"],
    highlights: [
      "Doctor and department information architecture",
      "Appointment and emergency contact visibility",
      "Bengali-language service content",
      "Responsive presentation for local patients",
    ],
    externalUrl: "https://moushafihospital.com",
    image: {
      src: "/projects/moushafi-hospital.webp",
      alt: "Moushafi Hospital website homepage in Bengali",
      width: 1440,
      height: 1100,
    },
    ogImage: "/projects/moushafi-hospital-og.jpg",
    index: "02",
  },
  {
    slug: "madinatul-quran",
    title: "Madinatul Quran",
    category: "Education",
    projectType: "Online madrasa website",
    summary:
      "An online learning platform for Quran education, presenting courses, teachers, admission routes, and useful Islamic articles.",
    description:
      "Madinatul Quran is an online madrasa website that explains its Quran and Islamic studies programmes, introduces courses, and gives prospective students a clear route to admission.",
    objective:
      "Build trust with prospective students and families while making course discovery and admission straightforward.",
    overview: [
      "Madinatul Quran serves students learning Quran recitation, memorization, and Islamic studies online. The website has to communicate care, structure, and credibility in a calm, accessible way.",
      "Course information, teacher context, admission calls to action, and a small article library work together as a first point of contact. The content is delivered primarily in Bengali for its local audience.",
    ],
    roleNote:
      "This project is listed as part of Shine Akhanda's client portfolio. The public case study below is limited to verifiable details from the live website; a client-approved breakdown of the exact project scope is available on request.",
    stack: ["PHP", "Custom CSS", "JavaScript", "Cloudflare"],
    highlights: [
      "Course and programme presentation",
      "Admission-focused page structure",
      "Bengali educational content and article library",
      "Mobile-friendly reading and navigation",
    ],
    externalUrl: "https://madinatulquran.org",
    image: {
      src: "/projects/madinatul-quran.webp",
      alt: "Madinatul Quran online madrasa website homepage",
      width: 1440,
      height: 1100,
    },
    ogImage: "/projects/madinatul-quran-og.jpg",
    index: "03",
  },
  {
    slug: "wig-vend",
    title: "WiG Vend",
    category: "Manufacturing",
    projectType: "International B2B website",
    summary:
      "A manufacturer's website for custom hair wigs and systems, built for buyer confidence and international wholesale enquiries.",
    description:
      "WiG Vend presents a Bangladeshi hair-system manufacturing operation to individual buyers, salons, and distributors worldwide, with product education, quality-process content, and clear order routes.",
    objective:
      "Turn a manufacturing capability into a credible international web presence, with enough product and process detail for trade buyers to start a conversation.",
    overview: [
      "WiG Vend manufactures custom wigs and hair systems in Bangladesh and sells to individuals, salons, replacement centers, and distributors. The website has to answer practical buyer questions before a quotation begins.",
      "The experience combines product education, a documented quality process, buyer categories, certification content, and an external store. Next.js image handling supports the heavy visual requirements of the product catalogue.",
    ],
    roleNote:
      "This project is listed as part of Shine Akhanda's client portfolio. The public case study below is limited to verifiable details from the live website; a client-approved breakdown of the exact project scope is available on request.",
    stack: ["Next.js", "React", "Modern CSS", "Ubuntu / nginx"],
    highlights: [
      "International B2B positioning",
      "Product and quality-process storytelling",
      "Separate store and enquiry journeys",
      "Next.js image optimisation for product media",
    ],
    externalUrl: "https://wigvend.com",
    image: {
      src: "/projects/wig-vend.webp",
      alt: "WiG Vend custom hair wig manufacturer website homepage",
      width: 1440,
      height: 1100,
    },
    ogImage: "/projects/wig-vend-og.jpg",
    index: "04",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectNeighbours(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1],
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : PROJECTS[0],
  };
}
