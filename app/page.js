import Bento from "../Components/Bento.js";
import ChatBot from "../Components/ChatBot.js";
import Footer from "../Components/Footer.js";
import Header from "../Components/Header.js";
import Hero from "../Components/Hero.js";
import LogoMarquee from "../Components/LogoMarquee.js";
import Navbar from "../Components/Navbar.js";
import Skills from "../Components/Skills.js";
import WorkExperience from "../Components/WorkExperience.js";
import React from "react";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Hero />
      <LogoMarquee />
      <WorkExperience />
      <Skills />
      <Bento />
      <ChatBot />
      <Footer />
    </div >
  );
}
