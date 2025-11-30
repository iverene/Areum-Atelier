import { useState, useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

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
            { threshold: 0.15 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    // --- Animation Variants ---
    const variants = {
        "fade-up": "translate-y-10 opacity-0",
        "fade-down": "-translate-y-10 opacity-0",
        "fade-left": "translate-x-10 opacity-0",
        "fade-right": "-translate-x-10 opacity-0", 
        "zoom-in": "scale-95 opacity-0",
        "blur-in": "blur-sm opacity-0 scale-100", 
        "masonry": "translate-y-12 opacity-0 scale-95 blur-[4px]",
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

const storyImages = [
    { src: "/images/story-1.jpg", height: "h-64" },
    { src: "/images/story-4.jpg", height: "h-80" },
    { src: "/images/story-7.jpg", height: "h-56" },
    { src: "/images/story-2.jpg", height: "h-64" },
    { src: "/images/story-3.jpg", height: "h-80" },
    { src: "/images/story-5.jpg", height: "h-56" },
    { src: "/images/story-6.jpg", height: "h-64" },
    { src: "/images/story-8.jpg", height: "h-80" },
    { src: "/images/story-9.jpg", height: "h-56" },
];

export default function About() {
    return (
        <div className="bg-snowWhite min-h-screen overflow-x-hidden"> 
            <Navbar />
            
            {/* --- SECTION 1: HEADER  --- */}
            <section className="py-20 lg:py-12">
                <div className="flex flex-col lg:flex-row items-center justify-center text-center space-y-10 lg:gap-12">
                    
                    <RevealOnScroll variant="zoom-in" className="flex flex-col items-center justify-center lg:order-2 z-10">
                        <img src="/logo.png" alt="logo" className="w-70 h-auto md:w-100 lg:w-120" />
                        <img src="/logo/word-logo.png" alt="logo" className="w-70 h-auto md:w-90 lg:w-100" />
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade-right" delay={200} className="flex flex-col items-center justify-center max-w-sm lg:order-1 lg:items-start">
                        <h1 className="font-heading font-medium italic text-3xl lg:text-4xl m-5">Areum (아름)</h1>
                        <p className="font-body font-medium leading-7 lg:leading-8 md:text-lg lg:text-xl lg:text-left px-4">
                            From the Korean word for <span className="font-bold italic">“beauty”</span>, Areum embodies grace in its purest form — a quiet elegance that flows from <span className="underline">authenticity and self-awareness</span> rather than perfection.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll variant="fade-left" delay={200} className="flex flex-col items-center justify-center max-w-sm lg:order-3 lg:items-end">
                        <h1 className="font-heading font-medium italic text-3xl lg:text-4xl m-5">Atelier</h1>
                        <p className="font-body font-medium leading-7 lg:leading-8 md:text-lg lg:text-xl lg:text-right px-4">
                            Borrowed from the French word for <span className="font-bold italic">“studio”</span>, Atelier signifies a refined space of artistry and creation — a sanctuary where individuality is shaped into <span className="underline">timeless expression</span>.
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* --- SECTION 2: THE STORY  --- */}
            <section className="flex flex-col items-center justify-center text-center space-y-8 lg:space-y-12 px-4 py-10 lg:py-20 lg:px-30">
                <div className="md:px-20 lg:px-40 space-y-6">

                    <RevealOnScroll variant="blur-in">
                        <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Story</h1>
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade-up" delay={200}>
                        <p className="font-body font-medium text-justify indent-8 lg:indent-10 px-5 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl">
                            Born from a love for both technology and the artistry of beauty, <span className="font-bold italic">Areum Atelier</span> began as a passion project inspired by countless hours of learning and watching makeup transform <span className="font-bold text-dustyRose">confidence into grace</span>. It was envisioned to make self-expression feel natural and beautifully refined.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="w-full">
    <div className="container mx-auto px-4 md:px-5 lg:px-20 columns-2 md:columns-3 lg:columns-3 space-y-4 gap-4 md:gap-6 max-w-6xl w-full">
        {storyImages.map((img, index) => (
            <RevealOnScroll 
                key={index} 
                variant="masonry"   
                delay={index % 3 * 150} 
                className="w-full break-inside-avoid mb-4 md:mb-6" 
            >
                <div className="overflow-hidden rounded-lg shadow-md group">
                    <img 
                        src={img.src} 
                        alt={`Story ${index + 1}`} 
                        className={`w-full ${img.height} object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:filter group-hover:brightness-90`} 
                    />
                </div>
            </RevealOnScroll>
        ))}
    </div>
</div>
            </section>

            {/* --- SECTION 3: PHILOSOPHY --- */}
            <section className="flex flex-col items-center justify-center text-center space-y-6 px-4 py-10 lg:py-20 lg:px-30">
                <RevealOnScroll variant="blur-in">
                    <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Philosophy</h1>
                </RevealOnScroll>
                
                <RevealOnScroll variant="fade-up" delay={200}>
                    <p className="font-body font-medium text-justify px-5 indent-8 lg:indent-0 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl lg:text-center lg:px-50 lg:py-10 ">
                        We believe beauty is an emotion — <span className="font-bold text-dustyRose">soft, refined, and ever-evolving</span>.
                    </p>
                </RevealOnScroll>

                <div className="space-y-5 lg:space-y-10 w-full">
                    
                    <RevealOnScroll variant="fade-right" delay={100} className="philosophy-container">
                        <img src="/images/philosophy-1.png" alt="Refinement" className="philosophy-image" />
                        <p className="philosophy-text">Enhancing, not altering.</p>
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade-up" delay={300} className="philosophy-container">
                        <img src="/images/philosophy-2.png" alt="Harmony" className="philosophy-image" />
                        <p className="philosophy-text">Balancing tones, textures, and mood.</p>
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade-left" delay={500} className="philosophy-container">
                        <img src="/images/philosophy-3.png" alt="Confidence" className="philosophy-image" />
                        <p className="philosophy-text">Radiating grace from within.</p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* --- SECTION 4: EXPERIENCE  --- */}
            <section className="flex flex-col items-center justify-center text-center space-y-8 px-4 py-10 lg:py-20 lg:px-30 lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:gap-3 lg:items-start lg:justify-items-center">
                
                <div className="md:px-20 lg:px-40 space-y-6 lg:col-span-3 lg:row-start-2 lg:flex lg:flex-col lg:items-center">
                    <RevealOnScroll variant="zoom-in">
                        <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Atelier Experience</h1>
                        <p className="font-body font-medium text-justify indent-8 lg:indent-0 px-5 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl lg:text-center max-w-4xl mt-6">
                            Through gentle analysis and thoughtful recommendations, <span className="font-bold italic">Areum Atelier</span> curates makeup insights.
                        </p>
                    </RevealOnScroll>
                </div>
   
                <RevealOnScroll variant="fade-right" delay={200} className="quote-container lg:col-start-1 lg:row-start-1 lg:justify-self-start">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">Your warm undertones and soft features reveal a natural glow...</p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-left" delay={400} className="quote-container lg:col-start-3 lg:row-start-1 lg:justify-self-end">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">Your complexion carries light beautifully...</p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-right" delay={200} className="quote-container lg:col-start-1 lg:row-start-3 lg:justify-self-start">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">Your features carry a romantic softness...</p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-left" delay={400} className="quote-container lg:col-start-3 lg:row-start-3 lg:justify-self-end">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">Your complexion invites depth with caramel shadows...</p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </RevealOnScroll>
            </section>
            
            <Footer />
        </div>
    );
}