import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Questionnaire from "../components/Questionnaire";
import SavedAnalyses from "../components/SavedAnalyses";
import { Link, useLocation } from 'react-router-dom';

export default function Analysis() {
    const [started, setStarted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const location = useLocation();
    const isSavedAnalysesPage = location.pathname === '/saved-analyses';

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const transitionClasses = "transition-all duration-[1000ms] ease-out";

    return (
        <div className="bg-snowWhite min-h-screen overflow-hidden">
            <Navbar />

            {isSavedAnalysesPage ? (
                <SavedAnalyses />
            ) : (
                !started ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-6 lg:space-y-4 px-2 pt-10 lg:pt-8 lg:px-30">

                        <div className={`relative  order-1 lg:order-2`}>
                            <img 
                                src="/images/analysis-img.png" 
                                alt="Analysis Image" 
                                className={`w-90 lg:w-125 h-auto relative ${transitionClasses} delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            />
                            
                            <img 
                                src="/images/eyes-details.png" 
                                alt="Eyes Detail" 
                                className={`w-45 lg:w-75 h-auto absolute top-19 -left-8 lg:top-25 lg:-left-28 ${transitionClasses} delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                            />
                            
                            <img 
                                src="/images/lips-details.png" 
                                alt="Lips Detail" 
                                className={`w-44 lg:w-80 h-auto absolute top-40 right-0 lg:top-55 lg:-right-15 ${transitionClasses} delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                            />
                        </div>

                        <div className={`order-2 lg:order-1 ${transitionClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h1 className="font-heading text-4xl lg:text-5xl">Find the Makeup That Reflects <span className="text-dustyRose">You</span></h1>
                            <p className="font-body font-medium text-lg/8 lg:text-xl/8 mt-4">Answer a few thoughtful questions about your features and preferences <br />— and we'll craft a look made just for you.</p>
                            
                            <div className="mt-8 mb-5 space-y-4 flex flex-col items-center">
                                <button
                                    onClick={() => setStarted(true)}
                                    className="bg-smokyBlack text-snowWhite px-10 py-2 rounded-lg text-lg font-heading font-medium hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack transition-all duration-300"
                                >
                                    BEGIN ANALYSIS
                                </button>
                                
                                <Link 
                                    to="/saved-analyses" 
                                    className="px-3 py-2 text-lg bg-roseWood text-white font-heading rounded-lg hover:bg-roseWood/80 transition"
                                >
                                    VIEW SAVED ANALYSES
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-10 lg:px-20 animate-fade-in">
                        <Questionnaire />
                    </div>
                )
            )}

            <Footer />
        </div>
    );
}