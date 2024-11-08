import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import resume from "/src/Jared Lee Zhen Yan - Resume.pdf";
import { Logo } from "../assets"; 

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  };

  const buttonContentStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right, #14b8a6, #a855f7, #f97316)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: 900,
    transition: 'all 0.3s ease',
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={Logo} alt='logo' className='w-24 h-24 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            FullStack Developer &nbsp;
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row items-center gap-10">
          <li>
            <a href={resume} download="Jared Lee Zhen Yan - Resume.pdf" style={{ textDecoration: 'none' }}>
              <button
                style={buttonStyle}
                onClick={() => setActive("Download Resume")}
              >
                <span style={buttonContentStyle}>
                  <svg
                    style={{ fill: 'currentColor', width: '1rem', height: '1rem', marginRight: '0.5rem' }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  Download Resume
                </span>
              </button>
            </a>
          </li>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li>
                <a href={resume} download="Jared Lee Zhen Yan - Resume.pdf" style={{ textDecoration: 'none' }}>
                  <button
                    style={buttonStyle}
                    onClick={() => setActive("Download Resume")}
                  >
                    <span style={buttonContentStyle}>
                      <svg
                        style={{ fill: 'currentColor', width: '1rem', height: '1rem', marginRight: '0.5rem' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      Download Resume
                    </span>
                  </button>
                </a>
              </li>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
