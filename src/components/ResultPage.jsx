import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";


const ResultsPage = ({ analysis, answers, onRetakeQuiz }) => {
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const resultsRef = useRef(null);

  // Safely access analysis properties
  const safeAnalysis = {
    profileSummary: analysis.profileSummary || "Personalized beauty profile analysis",
    beautyPalette: analysis.beautyPalette || analysis.Skin || "Your personalized beauty palette recommendations",
    lips: analysis.lips || analysis.Lips || "Lip product and shade recommendations",
    eyes: analysis.eyes || analysis.Eyes || "Eye makeup techniques and products",
    contourHighlight: analysis.contourHighlight || analysis.Contour || "Contour and highlight guidance",
    recommendedLooks: {
      day: analysis.recommendedLooks?.day || analysis.Day || "Daytime makeup look",
      evening: analysis.recommendedLooks?.evening || analysis.Evening || "Evening makeup look"
    },
    aiInsight: analysis.aiInsight || analysis.Summary || "Overall beauty insight and recommendations"
  };

  // ✅ Auto-save to localStorage when results load
  useEffect(() => {
    if (analysis && answers) {
      const dataToSave = {
        analysis: safeAnalysis,
        answers: answers,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("savedAnalyses") || "[]");
      existing.push(dataToSave);
      localStorage.setItem("savedAnalyses", JSON.stringify(existing));
      setSaveStatus("✅ Auto-saved locally!");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  }, [analysis, answers]);

  // Save results as PNG using html2canvas
  const handleSaveAsPNG = async () => {
    setSaving(true);
    try {
      const button = document.querySelector(".save-png-btn");
      button.style.visibility = "hidden";

      const element = resultsRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement("a");
      link.download = "areum-atelier-analysis.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      button.style.visibility = "visible";

      setSaveStatus("Saved as PNG!");
    } catch (err) {
      console.error("Error saving as PNG:", err);
      setSaveStatus("Failed to save as PNG");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No analysis data available.</p>
        <button
          onClick={onRetakeQuiz}
          className="mt-4 px-6 py-2 bg-smokyBlack text-white font-heading rounded hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack transition"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4" ref={resultsRef}>
      {/* Profile Summary */}
      <div className="bg-white border shadow-md p-6 mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 text-center italic">
          Profile Summary
        </h2>
        <div className="space-y-3">
          {Object.entries(answers).map(([question, answer]) => (
            <div key={question} className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-sm lg:text-base text-gray-600 mb-1">
                {question.replace(/\?/g, "")}
              </p>
              <p className="text-smokyBlack italic">{answer}</p>
            </div>
          ))}
        </div>
        
        <button
          onClick={onRetakeQuiz}
          className="mt-6 w-full px-4 py-2 text-lg bg-smokyBlack text-white font-heading rounded hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack transition"
        >
          Retake Quiz
        </button>
      </div>

      {/* Analysis Sections */}
      <div className="bg-white border shadow-md p-6 mb-8 space-y-8">
        <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack pt-4 text-center italic">
          Your Personalized Makeup Analysis
        </h2>

        <SectionCard title="Your Beauty Palette" content={safeAnalysis.beautyPalette} />
        <SectionCard title="Lips" content={safeAnalysis.lips} />
        <SectionCard title="Eyes" content={safeAnalysis.eyes} />
        <SectionCard title="Contour & Highlight" content={safeAnalysis.contourHighlight} />

        <div className="px-2 pb-6 border-b">
          <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 italic border-l pl-3">
            Recommended Looks
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-heading text-roseWood mb-3">☀️ Day Look</h3>
              <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
                {safeAnalysis.recommendedLooks.day}
              </p>
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-heading text-roseWood mb-3">🌙 Evening Look</h3>
              <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
                {safeAnalysis.recommendedLooks.evening}
              </p>
            </div>
          </div>
        </div>

        <SectionCard title="AI Insight" content={safeAnalysis.aiInsight} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 justify-center items-center mt-12">
        <button
          onClick={handleSaveAsPNG}
          disabled={saving}
          className="save-png-btn px-8 py-3 text-lg bg-roseWood text-white font-heading rounded hover:bg-roseWood/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "📸 Saving..." : "📸 Save as PNG"}
        </button>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div
          className={`mt-4 mx-auto w-fit px-8 py-3 rounded-lg text-lg font-semibold font-heading transition-all duration-300 ${
            saveStatus.includes("✅") 
              ? " text-smokyBlack shadow-md" 
              : " text-roseWood shadow-md"
          }`}
        >
          {saveStatus}
        </div>
      )}

    </div>
  );
};

const SectionCard = ({ title, content }) => (
  <div className="px-2 pb-6 border-b">
    <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 italic border-l pl-3">
      {title}
    </h2>
    <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
      {typeof content === "string" ? content : JSON.stringify(content)}
    </p>
  </div>
);

export default ResultsPage;
