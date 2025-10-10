import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function About() {
    return (
        <div className="bg-snowWhite min-h-screen">
              <Navbar />
                {/* Behind the Name */}
              <section className="flex flex-col lg:flex-row items-center justify-center text-center space-y-10 py-20 lg:gap-12 lg:py-12">
                <div className="flex flex-col items-center justify-center lg:order-2">
                    <img src="src/assets/logo/logo.png" alt="logo" className="w-70 h-auto md:w-100 lg:w-120"/>
                    <img src="src/assets/logo/word-logo.png" alt="logo" className="w-70 h-auto md:w-90 lg:w-100"/>
                </div>
                <div className="flex flex-col items-center justify-center max-w-sm lg:order-1 lg:items-start">
                    <h1 className="font-heading font-medium italic text-3xl lg:text-4xl m-5">Areum (아름)</h1>
                    <p className="font-body font-medium leading-7 lg:leading-8 md:text-lg lg:text-xl lg:text-left px-4">From the Korean word for <span className="font-bold italic">“beauty”</span>, Areum embodies grace in its purest form — a quiet elegance that flows from <span className="underline">authenticity and self-awareness</span> rather than perfection.</p>
                </div>

                <div className="flex flex-col items-center justify-center max-w-sm lg:order-3 lg:items-end">
                    <h1 className="font-heading font-medium italic text-3xl lg:text-4xl m-5">Atelier</h1>
                    <p className="font-body font-medium leading-7 lg:leading-8 md:text-lg lg:text-xl lg:text-right px-4">Borrowed from the French word for <span className="font-bold italic">“studio”</span>, Atelier signifies a refined space of artistry and creation — a sanctuary where individuality is shaped into <span className="underline">timeless expression</span>.</p>
                </div>
              </section>

                {/* The Story */}
              <section className="flex flex-col items-center justify-center text-center space-y-8 lg:space-y-12 px-4 py-10 lg:py-20 lg:px-30">
                <div className="md:px-20 lg:px-40 space-y-6">
                    <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Story</h1>
                    <p className="font-body font-medium text-justify indent-8 lg:indent-10 px-5 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl">
                        Born from a love for both technology and the artistry of beauty, <span className="font-bold italic">Areum Atelier</span> began as a passion project inspired by countless hours of learning and watching makeup transform <span className="font-bold text-dustyRose">confidence into grace</span>. It was envisioned to make self-expression feel natural and beautifully refined — not to define you, but to help you rediscover your natural elegance in a new light.
                    </p>
                </div>

                <div className="container mx-auto px-4 md:px-5 lg:px-20 columns-2 md:columns-3 lg:columns-3 space-y-4 gap-4 md:gap-6 max-w-6xl w-full">
                        <div className="animate-column-wave opacity-0 [animation-delay:200ms]">
                            <img src="src/assets/images/story-1.jpg" alt="Story 1" className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:400ms]">
                            <img src="src/assets/images/story-4.jpg" alt="Story 4" className="w-full h-80 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:600ms]">
                            <img src="src/assets/images/story-7.jpg" alt="Story 7" className="w-full h-56 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:500ms]">
                            <img src="src/assets/images/story-5.jpg" alt="Story 5" className="w-full h-60 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:700ms]">
                            <img src="src/assets/images/story-8.jpg" alt="Story 8" className="w-full h-68 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:600ms]">
                            <img src="src/assets/images/story-6.jpg" alt="Story 6" className="w-full h-76 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                        <div className="animate-column-wave opacity-0 [animation-delay:800ms]">
                            <img src="src/assets/images/story-9.jpg" alt="Story 9" className="w-full h-62 object-cover rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300" />
                        </div>
                </div>
            </section>

                {/* The Philosophy */}
              <section className="flex flex-col items-center justify-center text-center space-y-8 px-4 py-10 lg:py-20 lg:px-30">
                <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Philosophy</h1>
                <p className="font-body font-medium text-justify px-5 indent-8 lg:indent-0 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl lg:text-center lg:px-50 lg:py-10 ">We believe beauty is an emotion — <span className="font-bold text-dustyRose">soft, refined, and ever-evolving</span>. Our approach is rooted in self-awareness, artistry, and authenticity.</p>
                
                <div className="space-y-5 lg:space-y-10">
                    <div className="philosophy-container">
                        <img src="src/assets/images/philosophy-1.png" alt="Refinement" className="philosophy-image" />
                        <p className="philosophy-text">
                            Enhancing, not altering.
                        </p>
                    </div>
                    <div className="philosophy-container">
                        <img src="src/assets/images/philosophy-2.png" alt="Harmony" className="philosophy-image" />
                        <p className="philosophy-text">
                            Balancing tones, textures, and mood.
                        </p>
                    </div>
                    <div className="philosophy-container">
                        <img src="src/assets/images/philosophy-3.png" alt="Confidence" className="philosophy-image" />
                        <p className="philosophy-text">
                            Radiating grace from within.
                        </p>
                    </div>
                </div>
              </section>

                {/* The Atelier Experience */}
              <section className="flex flex-col items-center justify-center text-center space-y-8 px-4 py-10 lg:py-20 lg:px-30 lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:gap-3 lg:items-start lg:justify-items-center">
                <div className="md:px-20 lg:px-40 space-y-6 lg:col-span-3 lg:row-start-2 lg:flex lg:flex-col lg:items-center">
                    <h1 className="font-heading italic text-dustyRose text-5xl lg:text-6xl">The Atelier Experience</h1>
                    <p className="font-body font-medium text-justify indent-8 lg:indent-0 px-5 leading-7 md:leading-8 lg:leading-10 md:text-xl lg:text-2xl lg:text-center max-w-4xl">
                        Through gentle analysis and thoughtful recommendations, <span className="font-bold italic">Areum Atelier</span> curates makeup insights that align with your natural beauty. Each visit is a quiet dialogue between technology and artistry.
                    </p>
                </div>
                
                <div className="quote-container lg:col-start-1 lg:row-start-1 lg:justify-self-start">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">
                        Your warm undertones and soft features reveal a natural glow that flourishes with golden hues and dewy finishes.
                    </p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </div>

                <div className="quote-container lg:col-start-3 lg:row-start-1 lg:justify-self-end">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">
                        Your complexion carries light beautifully — enhance it with diffused highlights and gentle illumination along the high points of your face.
                    </p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </div>

                <div className="quote-container lg:col-start-1 lg:row-start-3 lg:justify-self-start">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">
                        Your features carry a romantic softness that shines through blush tones and rosy lips.
                    </p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </div>

                <div className="quote-container lg:col-start-3 lg:row-start-3 lg:justify-self-end">
                    <i className="fa-solid fa-quote-left quote-mark quote-start"></i>
                    <p className="quote-content">
                        Your complexion invites depth with caramel shadows, peach blush, and blurred lips for refined elegance.
                    </p>
                    <i className="fa-solid fa-quote-right quote-mark quote-end"></i>
                </div>
              </section>
              <Footer />
        </div>
    );
}