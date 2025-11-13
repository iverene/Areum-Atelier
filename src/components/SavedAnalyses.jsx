import React, { useState, useEffect } from "react";

const SavedAnalyses = () => {
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    const storedAnalyses = JSON.parse(localStorage.getItem("savedAnalyses")) || [];

    if (storedAnalyses.length > 0) {
      const sortedAnalyses = storedAnalyses.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setSavedAnalyses(sortedAnalyses);
    }
  }, []);


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl lg:text-3xl font-heading italic text-smokyBlack mb-8 text-center">
        Your Saved Makeup Analyses
      </h1>

      {selectedAnalysis ? (
        <div>
          <button
            onClick={() => setSelectedAnalysis(null)}
            className="mb-4 px-4 py-2 bg-smokyBlack text-white rounded hover:bg-snowWhite hover:text-smokyBlack border border-smokyBlack transition"
          >
            ← Back to List
          </button>
          <AnalysisView analysis={selectedAnalysis} />
        </div>
      ) : (
        <div className="grid gap-6">
          {savedAnalyses.length === 0 ? (
            <p className="text-center text-gray-600">No saved analyses yet.</p>
          ) : (
            savedAnalyses.map((analysis, index) => (
              <div key={index} className="flex justify-between bg-white border shadow-md p-6">
                <h3 className="text-xl font-body text-smokyBlack pl-2 border-l">
                  Analysis from{" "}
                  {analysis.timestamp
                    ? new Date(analysis.timestamp).toLocaleDateString()
                    : "Unknown date"}
                </h3>
                <button
                  onClick={() => setSelectedAnalysis(analysis)}
                  className="px-4 py-1 bg-smokyBlack text-snowWhite rounded hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack transition"
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const AnalysisView = ({ analysis }) => (
  <div className="max-w-4xl mx-auto p-6">
    {/* Profile Summary */}
    <div className="bg-white border shadow-md p-6 mb-8">
      <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 text-center italic">
        Profile Summary
      </h2>
      <div className="space-y-3">
        {Object.entries(analysis.answers || {}).map(([question, answer]) => (
          <div key={question} className="border-b border-gray-100 pb-3">
            <p className="font-semibold text-sm lg:text-base text-gray-600 mb-1">
              {question.replace(/\?/g, "")}
            </p>
            <p className="text-smokyBlack italic">{answer}</p>
          </div>
        ))}
      </div>
    </div>

    {/* AI Analysis Sections */}
    <div className="bg-white border shadow-md p-6 mb-8 space-y-8">
      <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack pt-4 text-center italic">
        Your Personalized Makeup Analysis
      </h2>

      <SectionCard title="Your Beauty Palette" content={analysis.analysis?.beautyPalette} />
      <SectionCard title="Lips" content={analysis.analysis?.lips} />
      <SectionCard title="Eyes" content={analysis.analysis?.eyes} />
      <SectionCard title="Contour & Highlight" content={analysis.analysis?.contourHighlight} />

      <div className="px-2 pb-6 border-b">
        <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 italic border-l pl-3">
          Recommended Looks
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl lg:text-2xl font-heading text-roseWood mb-3">☀️ Day Look</h3>
            <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
              {analysis.analysis?.recommendedLooks?.day}
            </p>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-heading text-roseWood mb-3">🌙 Evening Look</h3>
            <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
              {analysis.analysis?.recommendedLooks?.evening}
            </p>
          </div>
        </div>
      </div>

      <SectionCard title="AI Insight" content={analysis.analysis?.aiInsight} />
    </div>
  </div>
);

const SectionCard = ({ title, content }) => (
  <div className="px-2 pb-6 border-b">
    <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 italic border-l pl-3">
      {title}
    </h2>
    <p className="text-smokyBlack font-body text-base lg:text-lg leading-relaxed">
      {content}
    </p>
  </div>
);

export default SavedAnalyses;
