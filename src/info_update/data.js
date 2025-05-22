import {
  creator,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  java,
  spring,
  bash,
  threejs,
  code1,
  python,
  django,
  postgres,
  sql,
  consultant,
  data_analyst,
  engineer,
  huddle,
  crypto,
  PropertyLah,
  BudgetLah,
  BetterLife,
  BarbieBank,
  Streamhub,
  Deal,
  Exec,
  EventHub,
  Agender,
  csharp,
  WebScrapper,

} from "../assets";
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Management Consultant",
    icon: consultant,
  },
  {
    title: "Business Analyst",
    icon: data_analyst,
  },
  {
    title: "Data Scientist",
    icon: engineer,
  },
  {
    title: "Fullstack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "python",
    icon: python,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "django",
    icon: django,
  },
  {
    name: "postgres",
    icon: postgres,
  },
  {
    name: "sql",
    icon: sql,
  },
  {
    name: "threejs",
    icon: threejs,
  },
  {
    name: "java",
    icon: java,
  },
  {
    name: "spring",
    icon: spring,
  },
  {
    name: "bash",
    icon: bash,
  },
  {
    name: "csharp",
    icon: csharp,
  },
];

const experiences = [
  {
    title: "Deals Advisory Associate",
    company_name: "PwC",
    icon: Deal,
    iconBg: "#E6DEDD",
    date: "2021",
    points: [
      "Valuations: Engineered complex financial models (DCF, LBO, Market Multiples) for M&A transactions, driving $500M+ in deal value ",
      "Business Restructuring Services: Executed impactful restructuring initiatives and debt advisory services, significantly enhancing productivity and cost savings",
      "Operations: Engineered and implemented automation initiatives for a Philippines-based logistics company, boosting operational efficiency by 15%",
    ],
  },
  {
    title: "Management Consultant",
    company_name: "Argile Partners",
    icon: consultant,
    iconBg: "#E6DEDD",
    date: "2023",
    points: [
      "Developed sophisticated financial models and valuation analyses, identifying cost optimization strategies that reduced operational expenses by 20% and significantly enhanced business performance for target companies",
      "Led vital restructuring analyses and cash flow optimization strategies that extended startup runway during challenging markets",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "DBS",
    icon: code1,
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Championed an AI-based text-to-SQL model, accelerating financial data analysis and democratizing data access",
      "Engineered full-stack market sentiment platform using Python/Flask API backend and Angular dashboard, integrating data mining algorithms for real-time trading insights",
      "Designed and implemented enterprise-scale ETL pipelines and data warehouse architecture for real-time financial market data, reducing processing time by 20% and enabling seamless market intelligence workflows",
      "Automated end-to-end dashboard testing using Selenium WebDriver with Java/Spring Boot framework, achieving 99.9% test coverage across critical UI functionalities and user workflows",
    ],
  },
  {
    title: "Manager, Valuation Control (Developer)",
    company_name: "Standard Chartered Bank",
    icon: code1,
    iconBg: "#E6DEDD",
    date: "2025",
    points: [
      "Spearhead the design and implementation of quantitative validation tools for complex financial instruments, collaborating with trading desks to enhance valuation methodologies and control processes",
      "Develop and maintain sophisticated Python-based valuation models and automated frameworks for independent price verification (IPV) and fair value adjustments, ensuring robust risk control and regulatory compliance",
      "Architected and implemented CI/CD pipeline in Azure DevOps for automated deployment of Django applications, enhancing deployment efficiency and reliability",
    ],
  },
];

const projects = [
  {
    name: "Streamhub",
    description:
      "StreamHub is a communication platform that uses Kafka for real-time messaging, offering secure access like Teleport, live chat with emoji reactions, and speech-to-text functionality for distributed team collaboration.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
    ],
    image: Streamhub,
    source_code_link: "https://github.com/Le-Jared/streamhub-frontend",
  },
  {
    name: "Stealth Selenium Scrapper",
    description:
      "A Python-based web scraping framework using Selenium with advanced anti-detection features",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Selenium",
        color: "silver-text-gradient",
      },
    ],
    image: WebScrapper,
    source_code_link: "https://github.com/Le-Jared/stealth-selenium-scrapper",
  },
  {
    name: "Banking Application",
    description:
      "A banking solution, featuring dashboard, deposit, credit card and currency rates and conversion along with latest news and stock information",
    tags: [
      {
        name: "Java",
        color: "red-text-gradient",
      },
      {
        name: "Thymeleaf",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "blue-text-gradient",
      },
    ],
    image: BarbieBank,
    source_code_link: "https://github.com/Le-Jared/Online-Banking-Application",
  },
  {
    name: "EventHub",
    description:
      "Event Manager that allows you to manage online events such as sharing 3D models, with text to speech chatbot",
    tags: [
      {
        name: "React",
        color: "pink-text-gradient",
      },
      {
        name: "SpringBoot",
        color: "green-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "blue-text-gradient",
      },
    ],
    image: EventHub,
    source_code_link: "https://github.com/Le-Jared/event-hub-frontend",
  },
  {
    name: "PropertyLah",
    description:
      "PropertyLah is a web application for managing properties. This application allows users to manage their properties and tenants, view properties on a map, and change their account details.",
    tags: [
      {
        name: "Bootstrap",
        color: "pink-text-gradient",
      },
      {
        name: "Thymeleaf",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "blue-text-gradient",
      },
    ],
    image: PropertyLah,
    source_code_link: "https://github.com/Le-Jared/PropertyLah",
  },
  {
    name: "BudgetLah",
    description:
      "Budget Lah is a web-based application built with the Flask framework and Jinja2 templating engine, using PostgreSQL as its database. It is designed to help individuals and households track their expenses, create and manage budgets, and generate reports for better financial planning",
    tags: [
      {
        name: "Javascript",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "dark-blue-text-gradient",
      },
      {
        name: "PostgresSQL",
        color: "blue-text-gradient",
      },
    ],
    image: BudgetLah,
    source_code_link: "https://github.com/Le-Jared/Budget-Lah",
  },
  {
    name: "BetterLife",
    description:
      "BetterLife stores medicine information and stock inventory management as a Pharmacist, whilst providing a map interface for Consumers to identify the stores closest to them. ",
    tags: [
      {
        name: "React",
        color: "pink-text-gradient",
      },
      {
        name: "Python",
        color: "dark-blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
    ],
    image: BetterLife,
    source_code_link: "https://github.com/Le-Jared/Better_Life",
  },
  {
    name: "Personal Chain Coin",
    description:
      "Educational blockchain project that implements a custom ERC20 token and advanced asset management system, serving as a hands-on exploration of DeFi concepts, smart contract development, and cryptocurrency mechanics for personal learning.",
    tags: [
      {
        name: "Solidity",
        color: "grey-text-gradient",
      },
    ],
    image: crypto,
    source_code_link: "https://github.com/Le-Jared/Personal-Chain-Coin",
  },
  {
    name: "Huddle",
    description:
      "A simple Web-based Client Relationship Management application that uses back-end and front-end technologies.",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "Ejs",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
    ],
    image: huddle,
    source_code_link: "https://github.com/Le-Jared/The-Huddle-CRM",
  },
  {
    name: "Face Recognition",
    description:
      "Web application that performs real-time webcam & video face tracking as well as detect and identify faces from images with the help of pre-trained models",
    tags: [
      {
        name: "React",
        color: "pink-text-gradient",
      },
    ],
    image: Agender,
    source_code_link: "https://github.com/Le-Jared/3D-Portfolio",
  },
];

export {
  services,
  technologies,
  experiences,
  projects,
};
