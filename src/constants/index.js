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
    title: "Data Analyst",
    icon: data_analyst,
  },
  {
    title: "Data Engineer",
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
];

const experiences = [
  {
    title: "Entrepreneurial and Private Business Assistant",
    company_name: "PwC",
    icon: code1,
    iconBg: "#E6DEDD",
    date: "2020",
    points: [
      "Advised clients on digital product strategies, enabling them to leverage emerging technologies for competitive advantage.",
    ],
  },
  {
    title: "M&A Advisory Associate",
    company_name: "PwC",
    icon: code1,
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
    icon: code1,
    iconBg: "#383E56",
    date: "2023",
    points: [
      "Directed strategic initiatives that achieved a 20% cost reduction and enhanced business performance by leveraging corporate finance modeling and optimizing processes",
      "Focused on restructuring efforts, implementing innovative solutions to support organizational change management.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "DBS",
    icon: code1,
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Architected a high-performance internal API, reducing cross-application data access time by 25% and integrating 10+ complex pipelines organization-wide, improving overall system efficiency",
      "Engineered automated data mining processes to extract actionable insights from bank-wide data aggregation",
      "Spearheaded development of a full-stack monitoring solution (Python/Angular) with real-time dashboards that accelerated decision-making and slashed system downtime by 15%, leading to a 30% increase in customer satisfaction scores",
      "Bridged IT and business units by translating technical specifications and gathering requirements bridging gaps",
      "Enhanced Quality Assurance through regression testing and Selenium automation with Java Spring Boot",
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
    image: Streamhub,
    source_code_link: "https://github.com/Le-Jared/streamhub-frontend",
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
];

export {
  services,
  technologies,
  experiences,
  projects,
};
