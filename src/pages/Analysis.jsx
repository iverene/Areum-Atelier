import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Questionnaire from "../components/Questionnaire";
import SavedAnalyses from "../components/SavedAnalyses";
import { Link, useLocation } from 'react-router-dom';

export default function Analysis() {
    const [started, setStarted] = useState(false);
    const location = useLocation();
    const isSavedAnalysesPage = location.pathname === '/saved-analyses';

    return (
        <div className="bg-snowWhite min-h-screen">
            <Navbar />

            {isSavedAnalysesPage ? (
                // Show Saved Analyses page
                <SavedAnalyses />
            ) : (
                // Show regular Analysis content
                !started ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-6 lg:space-y-4 px-2 pt-10 lg:pt-8 lg:px-30">
                        <h1 className="font-heading text-4xl lg:text-5xl">Find the Makeup That Reflects <span className="text-dustyRose">You</span></h1>
                        <p className="font-body font-medium text-lg/8 lg:text-2xl/8">Answer a few thoughtful questions about your features and preferences <br />— and we'll craft a look made just for you.</p>
                        
                        <button
                            onClick={() => setStarted(true)}
                            className="bg-smokyBlack text-snowWhite px-10 py-2 rounded-lg text-lg font-heading font-medium hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack mb-5 transition-all duration-300"
                        >
                            BEGIN ANALYSIS
                        </button>
                        
                        <Link 
                            to="/saved-analyses" 
                            className="px-3 py-2 text-lg bg-roseWood text-white font-heading rounded-lg hover:bg-roseWood/80 transition"
                        >
                            VIEW SAVED ANALYSES
                        </Link>
                        
                        <div className="relative">
                            <img src="/images/analysis-img.png" alt="Analysis Image" className="w-95 lg:w-150 h-auto z-10"/>
                            <img src="/images/eyes-details.png" alt="Analysis Image" className="w-50 lg:w-100 h-auto absolute top-19 -left-2 lg:top-25 lg:-left-43"/>
                            <img src="/images/lips-details.png" alt="Analysis Image" className="w-49 lg:w-105 h-auto absolute top-40 right-0 lg:top-65 lg:-right-35"/>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-10 lg:px-20">
                        <Questionnaire />
                    </div>
                )
            )}
        </div>
    );
}