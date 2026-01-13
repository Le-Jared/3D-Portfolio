import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { jared } from "../assets";
import { useInViewOnce } from "../hooks/useInViewOnce";

const ServiceCard = ({ index, title, icon }) => {
  const [cardRef, cardInView] = useInViewOnce({ threshold: 0.15 });

  return (
    <Tilt className="xs:w-[250px] w-full">
      <div
        ref={cardRef}
        className={`w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card reveal ${
          cardInView ? "is-visible" : ""
        }`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  const [titleRef, titleInView] = useInViewOnce({ threshold: 0.2 });
  const [textRef, textInView] = useInViewOnce({ threshold: 0.2 });
  const [imageRef, imageInView] = useInViewOnce({ threshold: 0.2 });

  return (
    <>
      {/* Title */}
      <div
        ref={titleRef}
        className={`reveal ${titleInView ? "is-visible" : ""}`}
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2
          className={`${styles.sectionHeadText} animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black`}
        >
          Overview.
        </h2>
      </div>

      {/* Content */}
      <div className="flex items-center min-[1000px]:flex-row flex-col-reverse">
        {/* TEXT BLOCK */}
        <div
          ref={textRef}
          className={`mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] reveal reveal-delay-100 ${
            textInView ? "is-visible" : ""
          }`}
        >
          <p>
            Hello! I’m Jared Lee, a FinTech professional who combines financial expertise with software engineering skills across 
            Python, Java, TypeScript, SQL, and frameworks like React, Angular, and Spring Boot, backed by DevOps practices (Git, Jenkins). 
            I hold a Bachelor of Commerce in Accounting and Corporate Finance from the University of Adelaide and software engineering 
            training from General Assembly, with additional Google Cybersecurity and IBM Data Science certifications. 
            I enjoy bridging business and technology through work like enterprise ETL pipelines and text-to-SQL models.
          </p>

          <p className="mt-4">
            You can explore my work at my portfolio website or reach me via email at{" "}
            <a
              href="mailto:jared.lee.zhen.yan@gmail.com"
              className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black"
            >
              jared.lee.zhen.yan@gmail.com
            </a>
              I'm always open to new opportunities and collaborations!
          </p>
        </div>

        {/* IMAGE CARD */}
        <div
          ref={imageRef}
          className={`xs:w-[350px] xs:h-[350px] w-full h-full m-auto max-[1000px]:my-14 reveal reveal-delay-300 ${
            imageInView ? "is-visible" : ""
          }`}
        >
          <Tilt className="xs:w-[350px] xs:h-[350px] w-full h-full">
            <div className="xs:w-[350px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
              <div className="bg-tertiary rounded-[20px] min-h-[250px] flex justify-evenly items-center flex-col overflow-hidden">
                <img src={jared} alt="jared" className="w-full h-full object-contain" />
              </div>
            </div>
          </Tilt>
        </div>
      </div>

      {/* Services */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");


