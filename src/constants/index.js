import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
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
  next,
  vue,
  liveLink,
  Logo,
  consultant,
  data_analyst,
  engineer,
  huddle,

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
