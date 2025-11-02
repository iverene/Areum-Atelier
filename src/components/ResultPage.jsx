import React from "react";

const ResultsPage = ({ result, answers, onRetakeQuiz }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-medium text-roseWood mb-4">
          Your Beauty Analysis ✨
        </h1>
        <p className="font-body text-lg text-smokyBlack">
          Personalized makeup recommendations based on your unique features
        </p>
      </div>

      <div className="grid lg:grid-row-2 gap-8">
        {/* Answers Summary */}
        <div className="bg-white border shadow-md p-6">
          <h2 className="text-2xl lg:text-3xl font-heading text-smokyBlack mb-4 text-center italic">Your Profile</h2>
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
            className="mt-6 w-full px-4 py-2 text-lg bg-smokyBlack text-white font-heading rounded hover:bg-snowWhite hover:text-smokyBlack hover:border border-smokyBlack  transition"
          >
            Retake Quiz
          </button>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-br from-roseWood/5 to-pink-50 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-heading text-roseWood mb-4">
            Personalized Analysis
          </h2>
          <div className="whitespace-pre-wrap font-body text-gray-700 leading-relaxed">
            {result}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 bg-roseWood text-white rounded-lg hover:bg-roseWood/80 transition">
          Save Analysis
        </button>
        <button className="px-6 py-3 border border-roseWood text-roseWood rounded-lg hover:bg-roseWood/10 transition">
          Share Results
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;