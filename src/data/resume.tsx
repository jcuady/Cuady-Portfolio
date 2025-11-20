import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Malcolm Joaquin L. Cuady",
  initials: "MC",
  url: "https://malcolmcuady.dev",
  location: "Manila, PH",
  locationLink: "https://www.google.com/maps/place/manila",
  description:
    "Full-Stack Developer & Automation Engineer specializing in building scalable web systems and workflow automation. Founder of Optrizo.",
  summary:
    "I'm a BS Information Technology graduate from De La Salle University (December 2025). As the founder of Optrizo, I build automation-first solutions for SMEs, including CRMs, queueing systems, and dashboards. I specialize in full-stack development, API integrations, and workflow optimization using modern web technologies. I've reduced manual work by 80% and improved operational efficiency for multiple businesses through smart automation and system design.",
  avatarUrl: "/avatar/me-light.png",
  avatarWidth: 150,
  avatarHeight: 150,
  coreSkills: [
    "Leadership",
    "Analytical Thinking",
    "Problem-Solving",
    "Communication",
    "Collaboration",
    "Design Thinking",
    "Adaptability",
    "Innovation",
    "Versatility",
    "Critical Thinking",
    "Time Management",
    "Attention to Detail",
    "Continuous Learning",
    "Team Building",
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "PHP",
        "C#",
        "Java",
        "Dart",
      ],
    },
    {
      category: "Frontend Development",
      skills: [
        "React.js",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "Bootstrap",
        "FlutterFlow",
      ],
    },
    {
      category: "Backend Development",
      skills: [
        "Node.js",
        "Express.js",
        "ASP.NET Core",
        "Spring Boot",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Databases & Cloud",
      skills: [
        "Supabase",
        "Firebase",
        "SQL/NoSQL",
        "AWS",
        "Vercel",
        "Netlify",
      ],
    },
    {
      category: "Automation & Integrations",
      skills: [
        "Airtable",
        "Make.com",
        "Zapier",
        "Klaviyo",
        "Twilio",
        "PayMongo",
        "Stripe",
      ],
    },
    {
      category: "AI/ML & Data",
      skills: [
        "TensorFlow",
        "Tesseract OCR",
        "NLP",
        "Power BI",
        "Statistical Analysis",
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        "Git/GitHub",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "WordPress/Elementor",
      ],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "malcolm.cuady@dlsu.edu.ph",
    tel: "+639123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jcuady",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/malcolm-joaquin-cuady-7566bb262/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/optrizo",
        icon: Icons.facebook,

        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/malcolmcuady",
        icon: Icons.instagram,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Optrizo Digital Solutions",
      href: "https://optrizo.com",
      badges: ["Founder"],
      location: "Remote",
      title: "Founder / Full-Stack Developer",
      start: "2024",
      end: "Present",
      description:
        "Co-founded student-led startup with I.T. and marketing students providing digital solutions to SMEs. Developed live queueing system using React, Supabase (AWS), Twilio API with real-time updates. Integrated Pancake CRM, Busybee SMS API, Make.com automations for client workflows. Led full-stack architecture, API design, and analytics automation for multiple client projects.",
    },
    {
      company: "Rent Then Drive",
      badges: ["Capstone Project"],
      href: "https://rentthendrivecar.com",
      location: "Remote",
      title: "Project Lead / Full-Stack Developer",
      start: "2024",
      end: "2025",
      description:
        "Led capstone team building cloud-based car rental platform using FlutterFlow, Firebase, Airtable. Integrated PayMongo API, Google Maps API, TensorFlow + Tesseract OCR for AI fraud detection. Implemented Make.com automations and Power BI analytics dashboards.",
    },
    {
      company: "Sole Surgeon",
      href: "https://solesurgeon.com",
      badges: [],
      location: "Remote",
      title: "CRM & Automation Developer",
      start: "2025",
      end: "2025",
      description:
        "Built Airtable CRM integrated with Pancake CRM for client management workflows. Automated SMS tagging and notifications, improving operational efficiency.",
    },
    {
      company: "Hakum Auto Care",
      badges: [],
      href: "hakumautocare.com",
      location: "On-site",
      title: "Full-Stack Developer",
      start: "2024",
      end: "2024",
      description:
        "Developed React + TypeScript queueing system with Supabase and Twilio API. Automated real-time service tracking and reporting workflows.",
    },
    {
      company: "Converge ICT Solutions Inc.",
      href: "https://convergeict.com",
      badges: ["Internship"],
      location: "On-site",
      title: "IT Intern",
      start: "Sept 2025",
      end: "Dec 2025",
      description:
        "Supported Global Network Operations through ticketing, fault isolation, and documentation.",
    },
    {
      company: "Startek Pasig",
      badges: ["Internship"],
      href: "https://startek.com",
      location: "Hybrid",
      title: "Data Analyst Intern",
      start: "June 2023",
      end: "Nov 2023",
      description:
        "Created Power BI dashboards using SQL and statistical analysis (ANOVA).",
    },
  ],
  education: [
    {
      school: "De La Salle University",
      href: "https://www.dlsu.edu.ph",
      degree: "Bachelor of Science in Information Technology",
      logoUrl: "/education/DLSU-LOGO.png",
      start: "2021",
      end: "2025",
      achievements: [
        "1st Honors Dean's List (2024–2025)",
        "2nd Honors Dean's List (2023–2024)",
        "Co-Founder – Data Science Society",
      ],
      relevantElectives: [
        "Advanced Web Development",
        "Systems Integration",
        "Mobile App Development",
        "Data Mining & AI Principles",
        "Applied Data Analytics",
        "Secure SDLC",
        "Design Thinking",
        "Systems Planning",
        "System Continuity & Disaster Recovery",
      ],
    },
  ],
  certifications: [
    {
      title: "Airtable Admin Certification",
      href: "https://www.airtable.com",
      dates: "2024",
      description: "Issued by Airtable",
    },
    {
      title: "AWS Academy Cloud Foundations",
      href: "https://aws.amazon.com/training/awsacademy/",
      dates: "2024",
      description: "Issued by AWS Academy",
    },
    {
      title: "Klaviyo Developer Certificate",
      href: "https://www.klaviyo.com",
      dates: "2024",
      description: "Issued by Klaviyo",
    },
    {
      title: "HubSpot SEO & Marketing Hub",
      href: "https://www.hubspot.com",
      dates: "2024",
      description: "Issued by HubSpot Academy",
    },
    {
      title: "Lean Six Sigma White Belt",
      href: "https://www.sixsigma.com",
      dates: "2024",
      description: "Issued by Six Sigma",
    },
    {
      title: "Databricks Generative AI Essentials",
      href: "https://www.databricks.com",
      dates: "2024",
      description: "Issued by Databricks",
    },
    {
      title: "Asana Workflow Specialist",
      href: "https://www.asana.com",
      dates: "2024",
      description: "Issued by Asana",
    },
    {
      title: "CCNA Enterprise Networking",
      href: "https://www.cisco.com",
      dates: "2024",
      description: "Issued by Cisco",
    },
  ],
  projects: [
    {
      title: "Hakum Auto Care - Queueing System",
      href: "hakumautocare.com",
      dates: "2024",
      active: true,
      description:
        "Real-time queueing management system with SMS notifications for auto care services. Built with React, TypeScript, Supabase, and Twilio to streamline customer flow and improve operational efficiency.",
      technologies: ["React", "TypeScript", "Supabase", "Twilio"],
      links: [
        {
          type: "Website",
          href: "hakumautocare.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Meridian Capital - Investment Platform",
      href: "https://meridian-capital-zeta.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Modern investment platform showcasing financial services and investment opportunities. Built with Next.js and deployed on Vercel for optimal performance.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      links: [
        {
          type: "Website",
          href: "https://meridian-capital-zeta.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "InvestPH - Investment Dashboard",
      href: "https://invest-ph-1.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Investment tracking and portfolio management dashboard for Philippine market. Features real-time data visualization and investment analytics.",
      technologies: ["Next.js", "React", "TypeScript", "Vercel"],
      links: [
        {
          type: "Website",
          href: "https://invest-ph-1.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Rent Then Drive App",
      href: "/projects/RTD WALKTHROUGH.pdf",
      dates: "2025",
      active: true,
      description:
        "Mobile-first application built with FlutterFlow for rapid deployment and cross-platform compatibility. Features modern UI/UX and responsive design.",
      technologies: ["FlutterFlow", "Dart", "Firebase"],
      links: [
        {
          type: "Website",
          href: "/projects/RTD WALKTHROUGH.pdf",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Sole Surgeon - CRM & Automation",
      href: "https://solesurgeon.com",
      dates: "2024",
      active: true,
      description:
        "Comprehensive Airtable + Pancake CRM system with automated tagging, SMS flows, and customer tracking. Reduced manual work by 80% and improved response time by 40%.",
      technologies: ["Airtable", "Make.com", "Twilio", "Pancake"],
      links: [
        {
          type: "Website",
          href: "https://solesurgeon.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  optrizoProjects: [
    {
      title: "Hakum Auto Care - Queueing System",
      tags: ["Automation", "CRM", "Real-time", "SMS Integration"],
      description:
        "Real-time queueing management system with SMS notifications. Built with React, TypeScript, Supabase, and Twilio for streamlined customer flow.",
      technologies: ["React", "TypeScript", "Supabase", "Twilio"],
      dates: "2024",
      image: "",
    },
    {
      title: "Sole Surgeon - CRM & Automation",
      tags: ["CRM", "Automation", "API Integration", "Airtable"],
      description:
        "Comprehensive Airtable + Pancake CRM system with automated tagging, SMS flows, and customer tracking. Reduced manual work by 80%.",
      technologies: ["Airtable", "Make.com", "Twilio", "Pancake"],
      dates: "2024",
      image: "",
    },
    {
      title: "Airtable Automation Workflows",
      tags: ["Automation", "API Integration", "Supabase", "Make.com"],
      description:
        "Custom automation workflows connecting Airtable with multiple services. Includes billing automation, inventory management, and customer sync systems.",
      technologies: ["Airtable", "Make.com", "Supabase", "REST APIs"],
      dates: "2023-2024",
      image: "",
    },
    {
      title: "Pancake PH Partner Integrations",
      tags: ["API Integration", "CRM", "Automation", "React"],
      description:
        "Built custom integrations for Pancake CRM platform. Developed automated workflows for client onboarding, tagging systems, and customer communication.",
      technologies: ["React", "Pancake API", "Make.com", "Supabase"],
      dates: "2024",
      image: "",
    },
    {
      title: "Billing Automation Workflows",
      tags: ["Automation", "API Integration", "Stripe", "PayMongo"],
      description:
        "Automated billing systems for multiple clients. Integrated payment gateways, invoice generation, and subscription management using modern APIs.",
      technologies: ["Stripe", "PayMongo", "Make.com", "Airtable"],
      dates: "2023-2024",
      image: "",
    },
  ],
  hackathons: [
    {
      title: "DLSU Hackathon 2024",
      dates: "October 2024",
      location: "Manila, PH",
      description:
        "Developed an innovative automation solution for business process optimization during the DLSU IT department hackathon. Focused on creating efficient workflows using modern web technologies.",
      image: "",
      mlh: "",
      links: [],
    },
  ],
} as const;