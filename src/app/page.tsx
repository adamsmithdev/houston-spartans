'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Partners from '@/components/Partners';
import Community from '@/components/Community';
import Merch from '@/components/Merch';
import Spartans from '@/components/Spartans';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  useEffect(() => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Toggle mobile menu
    const handleNavToggle = () => {
      navMenu?.classList.toggle('active');
      
      // Animate hamburger menu
      const bars = navToggle?.querySelectorAll('.bar');
      bars?.forEach((bar, index) => {
        if (navMenu?.classList.contains('active')) {
          if (index === 0) (bar as HTMLElement).style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          if (index === 1) (bar as HTMLElement).style.opacity = '0';
          if (index === 2) (bar as HTMLElement).style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          (bar as HTMLElement).style.transform = 'none';
          (bar as HTMLElement).style.opacity = '1';
        }
      });
    };

    navToggle?.addEventListener('click', handleNavToggle);

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        const bars = navToggle?.querySelectorAll('.bar');
        bars?.forEach(bar => {
          (bar as HTMLElement).style.transform = 'none';
          (bar as HTMLElement).style.opacity = '1';
        });
      });
    });

    // Back to top functionality
    const backToTopButton = document.getElementById('back-to-top');
    const handleBackToTopScroll = () => {
      if (window.pageYOffset > 300) {
        backToTopButton?.classList.add('visible');
      } else {
        backToTopButton?.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleBackToTopScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleBackToTopScroll);
      navToggle?.removeEventListener('click', handleNavToggle);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      <Partners />
      <Community />
      <Merch />
      <Spartans />
      <News />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
