import { useState, useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const RevealOnScroll = ({ children, className = "", delay = 0, variant = "fade-up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 } 
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const variants = {
        "fade-up": "translate-y-10 opacity-0",
        "fade-down": "-translate-y-10 opacity-0",
        "fade-left": "translate-x-10 opacity-0", 
        "fade-right": "-translate-x-10 opacity-0",
        "zoom-in": "scale-95 opacity-0",
        "blur-in": "blur-md opacity-0 scale-100", 
    };

    const baseClasses = "transition-all duration-1000 ease-out transform";
    const activeState = isVisible 
        ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0" 
        : variants[variant];

    return (
        <div ref={ref} className={`${baseClasses} ${activeState} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

export default function Home() {
  return (
    <div className="bg-snowWhite min-h-screen flex flex-col justify-between overflow-hidden">
      <Navbar />
    
        <div className="flex flex-col md:flex-row items-center justify-center text-center px-4 lg:gap-30 py-12 lg:py-20 flex-grow">
            
            {/* LEFT SIDE: Image */}
            <RevealOnScroll variant="fade-right" className="relative inline-block">
                <img 
                    src="src/assets/images/home-page-img.png" 
                    alt="Home Page Image" 
                    className="w-80 sm:w-90 md:100 lg:w-110 h-auto relative z-10 drop-shadow-xl"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,218,217,0.6)_0%,transparent_70%)] z-0 animate-pulse"></div>
            </RevealOnScroll>

            {/* RIGHT SIDE: Text */}
            <div className="flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-0 space-y-4">
                
                <RevealOnScroll variant="fade-left" delay={200}>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium italic text-roseWood">
                        L’Art d’Être Belle
                    </p>
                </RevealOnScroll>
                
                <RevealOnScroll variant="fade-left" delay={400}>
                    <p className="text-xl md:text-2xl lg:text-3xl font-heading font-medium italic text-smokyBlack">
                        (The Art of Being Beautiful)
                    </p>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-up" delay={600}>
                    <p className="text-base md:text-lg lg:text-xl lg:text-left font-body font-medium text-smokyBlack my-8 max-w-lg">
                        Discover the subtle harmony of form, color, and self — personalized to you.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll variant="zoom-in" delay={800}>
                    <Link to="/analysis" className="inline-block bg-roseWood text-snowWhite px-8 py-3 rounded-lg text-lg font-heading font-medium hover:bg-smokyBlack hover:scale-105 transition-all duration-300 shadow-md mb-5">
                        START ANALYSIS
                    </Link>
                </RevealOnScroll>

            </div>
        </div>

      <Footer />
    </div>
  );
}