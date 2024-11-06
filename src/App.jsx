import { useState, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom"
import Spline from '@splinetool/react-spline'

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
  Feedbacks,
} from "./components"

const MainPortfolio = () => {
  return (
    <div className="relative z-10">
      <div className="relative z-20 bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  const [startPortfolio, setStartPortfolio] = useState(false)
  const [showWelcomeButton, setShowWelcomeButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeButton(true)
    }, 4000) // 1000 milliseconds = 1 seconds

    return () => clearTimeout(timer) 
  }, [])

  return (
    <div className={`relative ${startPortfolio ? 'min-h-screen' : 'h-screen'} overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <StarsCanvas />
      </div>
      {startPortfolio ? (
        <BrowserRouter>
          <div className="relative z-10 overflow-y-auto h-screen">
            <MainPortfolio />
          </div>
        </BrowserRouter>
      ) : (
        <div className="relative z-10 w-full h-full">
          <Spline scene="https://prod.spline.design/ry25-HB1ochqLK-4/scene.splinecode" />
          {showWelcomeButton && (
            <button
              onClick={() => setStartPortfolio(true)}
              className="absolute top-[65%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 
                         px-12 py-4 text-xl bg-white text-black border-none rounded-lg cursor-pointer
                         shadow-lg transition-all duration-300 ease-in-out w-64
                         hover:scale-110 z-20 opacity-0 animate-fadeIn"
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
              }}
            >
              Welcome
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default App