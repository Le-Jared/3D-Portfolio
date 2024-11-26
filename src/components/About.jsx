import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { jared } from "../assets";
const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}>Overview.</h2>
      </div>
      <div className="flex items-center min-[1000px]:flex-row flex-col-reverse">
      <p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {/* Introduction */}
        Hello! I'm Jared Lee, a Technical Consultant with a distinctive combination of financial 
        acumen and software engineering expertise. My technical stack includes Python, Java, 
        TypeScript, SQL, and various modern frameworks like React, Angular, and Spring Boot, 
        supported by strong DevOps practices using Git, Jenkins.
        
        {/* Current Role */}
        <div className="mt-4">
          Currently at DBS Bank through FDM Group, I serve dual roles as a Software Engineer 
          and Business Analyst, where I've successfully developed AI-based solutions and 
          automated reporting tools. My previous experience includes positions at Argile 
          Partners as a Management Consultant and PwC as a Deals Advisory Associate, where 
          I specialized in financial modeling, business restructuring, and operational optimization.
        </div>

        {/* Education & Certifications */}
        <div className="mt-4">
          My educational foundation combines a Bachelor of Commerce in Accounting and Corporate 
          Finance from the University of Adelaide with intensive Software Engineering training 
          from General Assembly. I've further enhanced my expertise with Google Cybersecurity 
          and IBM Data Science Professional certifications.
        </div>

        {/* Professional Interests & Projects */}
        <div className="mt-4">
          I'm particularly passionate about bridging the gap between business and technology, 
          having demonstrated this through projects like implementing enterprise-scale ETL 
          pipelines and developing AI-based text-to-SQL models. Beyond my professional work, 
          I'm an Advanced Open Water Diver, active volunteer with NCSF Uplift, and enthusiast 
          in dance and photography.
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          You can explore my work at my portfolio website or reach me via email at{" "}
          <a
            href="mailto:jared.lee.zhen.yan@gmail.com"
            className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black"
          >
            jared.lee.zhen.yan@gmail.com
          </a>
          . I'm always open to new opportunities and collaborations!
        </div>
      </p>
        <Tilt className="xs:w-[350px] xs:h-[350px] w-full h-full m-auto max-[1000px]:my-14">
          <div
            variants={fadeIn("", "", 0.5, 1)}
            className="xs:w-[350px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className="bg-tertiary rounded-[20px] min-h-[250px] flex justify-evenly items-center flex-col overflow-hidden"
            >
              <img
                src={jared}
                alt="jared"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Tilt>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
