import React, { useState } from "react";
import axios from "axios";
import ResultsPage from "../components/ResultPage";

const categories = [
  {
    title: "Skin Tone",
    quote: "Every complexion carries its own kind of light. Let’s find the tone that reflects yours.",
    questions: [
      {
        text: "How would you describe your overall skin tone?",
        options: [
            { label: "Fair", img: "src/assets/questionnaire/fair.jpg" },
            { label: "Light", img: "src/assets/questionnaire/light.jpg" },
            { label: "Medium", img: "src/assets/questionnaire/medium.jpg" },
            { label: "Tan", img: "src/assets/questionnaire/tan.jpg" },
            { label: "Deep", img: "src/assets/questionnaire/deep.jpg" },
        ],
      },
      {
        text: "How does your skin react to the sun?",
        options: [
            { label: "Burns easily, rarely tans." },
            { label: "Burns first, then lightly tans." },
            { label: "Tans gradually with minimal burn." },
            { label: "Rarely burns, tans easily." },
            { label: "Never burns, deepens quickly." },
        ],
      },
      {
        text: "Which foundation shades usually match you best?",
        options: [
            { label: "Porcelain / Ivory", img: "src/assets/questionnaire/fair.jpg" },
            { label: "Beige / Honey", img: "src/assets/questionnaire/fair.jpg" },
            { label: "Sand / Warm Tan", img: "src/assets/questionnaire/fair.jpg" },
            { label: "Caramel / Chestnut", img: "src/assets/questionnaire/fair.jpg" },
            { label: "Mocha / Espresso", img: "src/assets/questionnaire/fair.jpg" },
        ],
      },
    ],
  },
  {
    title: "Undertone",
    quote:
      "Your undertone is the subtle hue beneath your skin — the secret to colors that flatter you most.",
    questions: [
      {
        text: "Which jewelry complements your skin more?",
        options: [
          { label: "Silver or platinum", img: "src/assets/questionnaire/undertone-silver.png" },
          { label: "Both silver and gold", img: "src/assets/questionnaire/undertone-both.png" },
          { label: "Gold or rose gold", img: "src/assets/questionnaire/undertone-gold.png" },
        ],
      },
      {
        text: "What color are the veins on your wrist under natural light?",
        options: [
          { label: "Blue or purple (Cool)", img: "src/assets/questionnaire/undertone-cool.png" },
          { label: "A mix of blue and green (Neutral)", img: "src/assets/questionnaire/undertone-neutral.png" },
          { label: "Green or olive (Warm)", img: "src/assets/questionnaire/undertone-warm.png" },
        ],
      },
      {
        text: "Which clothing colors make you look more radiant?",
        options: [
          { label: "Jewel tones (blue, emerald, violet)", img: "src/assets/questionnaire/undertone-jewel.png" },
          { label: "Balanced neutrals (taupe, rose, gray)", img: "src/assets/questionnaire/undertone-neutral-clothing.png" },
          { label: "Earth tones (peach, coral, olive, bronze)", img: "src/assets/questionnaire/undertone-earth.png" },
        ],
      },
    ],
  },
  {
    title: "Face Shape",
    quote:
      "Your face shape determines the flow of your features — guiding balance, contour, and symmetry.",
    questions: [
      {
        text: "How would you describe your face length and width?",
        options: [
          { label: "Almost equal (Round or Square)", img: "src/assets/questionnaire/face-round-square.png" },
          { label: "Slightly longer than wide (Oval or Heart)", img: "src/assets/questionnaire/face-oval-heart.png" },
          { label: "Noticeably longer (Oblong or Diamond)", img: "src/assets/questionnaire/face-oblong-diamond.png" },
        ],
      },
      {
        text: "What best describes your jawline?",
        options: [
          { label: "Soft and curved (Round, Oval)", img: "src/assets/questionnaire/jaw-soft.png" },
          { label: "Pointed or V-shaped (Heart)", img: "src/assets/questionnaire/jaw-vshape.png" },
          { label: "Strong and angular (Square)", img: "src/assets/questionnaire/jaw-strong.png" },
          { label: "Tapered with high cheekbones (Diamond)", img: "src/assets/questionnaire/jaw-diamond.png" },
        ],
      },
      {
        text: "What stands out when you look in the mirror?",
        options: [
          { label: "Full cheeks and soft features.", img: "src/assets/questionnaire/mirror-cheeks.png" },
          { label: "Balanced proportions overall.", img: "src/assets/questionnaire/mirror-balance.png" },
          { label: "Wider forehead and narrower chin.", img: "src/assets/questionnaire/mirror-heart.png" },
          { label: "Strong, well-defined jawline.", img: "src/assets/questionnaire/mirror-jaw.png" },
          { label: "Sharp cheekbones and delicate chin.", img: "src/assets/questionnaire/mirror-cheekbones.png" },
        ],
      },
    ],
  },
  {
    title: "Eyes",
    quote:
      "Your eyes define your essence — let’s uncover the shape and tone that make them unique.",
    questions: [
      {
        text: "What is your natural eye shape?",
        options: [
          { label: "Almond", img: "src/assets/questionnaire/eyes-almond.png" },
          { label: "Monolid", img: "src/assets/questionnaire/eyes-monolid.png" },
          { label: "Hooded", img: "src/assets/questionnaire/eyes-hooded.png" },
          { label: "Round", img: "src/assets/questionnaire/eyes-round.png" },
          { label: "Upturned", img: "src/assets/questionnaire/eyes-upturned.png" },
          { label: "Downturned", img: "src/assets/questionnaire/eyes-downturned.png" },
        ],
      },
      {
        text: "What is your natural eye color?",
        options: [
          { label: "Deep Brown", img: "src/assets/questionnaire/eye-brown.png" },
          { label: "Hazel", img: "src/assets/questionnaire/eye-hazel.png" },
          { label: "Green", img: "src/assets/questionnaire/eye-green.png" },
          { label: "Blue", img: "src/assets/questionnaire/eye-blue.png" },
          { label: "Gray", img: "src/assets/questionnaire/eye-gray.png" },
          { label: "Black", img: "src/assets/questionnaire/eye-black.png" },
        ],
      },
      {
        text: "How would you describe your lashes and lid visibility?",
        options: [
          { label: "Short lashes, visible lid.", img: "src/assets/questionnaire/lashes-short.png" },
          { label: "Long lashes, slightly hidden lid.", img: "src/assets/questionnaire/lashes-long.png" },
          { label: "Prominent lashes with deep-set eyes.", img: "src/assets/questionnaire/lashes-deepset.png" },
          { label: "Small lid space, gentle crease.", img: "src/assets/questionnaire/lashes-smalllid.png" },
        ],
      },
      {
        text: "Which eye feature do you usually enhance most?",
        options: [
          { label: "Lashes", img: "src/assets/questionnaire/enhance-lashes.png" },
          { label: "Eyeliner", img: "src/assets/questionnaire/enhance-eyeliner.png" },
          { label: "Eyeshadow", img: "src/assets/questionnaire/enhance-eyeshadow.png" },
          { label: "Brows", img: "src/assets/questionnaire/enhance-brows.png" },
        ],
      },
    ],
  },
  {
    title: "Lips",
    quote:
      "Lips speak with shape and softness — subtle or bold, they’re your signature.",
    questions: [
      {
        text: "How would you describe your natural lip fullness?",
        options: [
          { label: "Thin — delicate lips, minimal volume.", img: "src/assets/questionnaire/lips-thin.png" },
          { label: "Medium — balanced top and bottom lips.", img: "src/assets/questionnaire/lips-medium.png" },
          { label: "Full — plump lips with noticeable volume.", img: "src/assets/questionnaire/lips-full.png" },
        ],
      },
      {
        text: "What is your lip shape?",
        options: [
          { label: "Heart-shaped (defined cupid’s bow).", img: "src/assets/questionnaire/lips-heart.png" },
          { label: "Rounded (soft, even curves).", img: "src/assets/questionnaire/lips-rounded.png" },
          { label: "Wide (extends outward with gentle corners).", img: "src/assets/questionnaire/lips-wide.png" },
          { label: "Petite (smaller and delicate proportions).", img: "src/assets/questionnaire/lips-petite.png" },
        ],
      },
      {
        text: "How pigmented are your natural lips?",
        options: [
          { label: "Very pale or light pink.", img: "src/assets/questionnaire/lips-pale.png" },
          { label: "Soft rose or peachy tone.", img: "src/assets/questionnaire/lips-softrose.png" },
          { label: "Naturally rich or deeper color.", img: "src/assets/questionnaire/lips-deep.png" },
        ],
      },
      {
        text: "Which lip products do you prefer?",
        options: [
          { label: "Sheer tint or balm.", img: "src/assets/questionnaire/lips-tint.png" },
          { label: "Gloss with shine.", img: "src/assets/questionnaire/lips-gloss.png" },
          { label: "Creamy lipstick.", img: "src/assets/questionnaire/lips-cream.png" },
          { label: "Matte or longwear finish.", img: "src/assets/questionnaire/lips-matte.png" },
        ],
      },
    ],
  },
  {
    title: "Preferred Makeup Look",
    quote:
      "Your makeup personality defines the kind of beauty story you tell.",
    questions: [
      {
        text: "Which describes your everyday makeup goal?",
        options: [
          { label: "Effortless, fresh, natural glow.", img: "src/assets/questionnaire/look-natural.png" },
          { label: "Polished, radiant, and softly glamorous.", img: "src/assets/questionnaire/look-glam.png" },
          { label: "Bold, expressive, and statement-making.", img: "src/assets/questionnaire/look-bold.png" },
          { label: "Minimal, clean, and quietly confident.", img: "src/assets/questionnaire/look-minimal.png" },
        ],
      },
      {
        text: "What part of your face do you like to highlight most?",
        options: [
          { label: "Skin (dewy and flawless base)", img: "src/assets/questionnaire/highlight-skin.png" },
          { label: "Eyes (shadows, liner, lashes)", img: "src/assets/questionnaire/highlight-eyes.png" },
          { label: "Lips (color and definition)", img: "src/assets/questionnaire/highlight-lips.png" },
          { label: "Cheeks (blush or contour)", img: "src/assets/questionnaire/highlight-cheeks.png" },
        ],
      },
      {
        text: "What best matches your ideal style inspiration?",
        options: [
          { label: "Korean natural glow", img: "src/assets/questionnaire/style-korean.png" },
          { label: "French chic", img: "src/assets/questionnaire/style-french.png" },
          { label: "Glam couture", img: "src/assets/questionnaire/style-glam.png" },
          { label: "Modern minimalist", img: "src/assets/questionnaire/style-minimal.png" },
        ],
      },
      {
        text: "How do you want your look to make you feel?",
        options: [
          { label: "Confident and radiant.", img: "src/assets/questionnaire/feel-confident.png" },
          { label: "Calm and graceful.", img: "src/assets/questionnaire/feel-graceful.png" },
          { label: "Playful and expressive.", img: "src/assets/questionnaire/feel-playful.png" },
          { label: "Elegant and timeless.", img: "src/assets/questionnaire/feel-elegant.png" },
        ],
      },
    ],
  },
];

const Questionnaire = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionText, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionText]: value,
    }));
  };

  const nextCategory = () => {
    if (currentCategory < categories.length - 1)
      setCurrentCategory((prev) => prev + 1);
  };

  const prevCategory = () => {
    if (currentCategory > 0)
      setCurrentCategory((prev) => prev - 1);
  };

  const finishQuiz = async () => {
    try {
      console.log("Submitting answers:", answers);
      
      if (Object.keys(answers).length === 0) {
        alert("Please answer at least one question before submitting.");
        return;
      }

      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/generate-insight', {
        answers: answers
      });

      console.log("AI Response:", response.data);
      setResult(response.data.analysis);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error generating insight:', error);
      
      if (error.response?.status === 400) {
        alert(error.response.data.message || "Please complete the questionnaire before submitting.");
      } else {
        alert("Failed to generate insights. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const retakeQuiz = () => {
    setShowResults(false);
    setCurrentCategory(0);
    setAnswers({});
    setResult("");
  };

  // If showing results, render the ResultsPage component
  if (showResults) {
    return (
      <ResultsPage 
        analysis={result} 
        answers={answers} 
        onRetakeQuiz={retakeQuiz}
      />
    );
  }

  const progress = ((currentCategory + 1) / categories.length) * 100;
  const category = categories[currentCategory];

  // Check if current question is answered
  const isCurrentQuestionAnswered = (questionText) => {
    return answers[questionText] !== undefined;
  };

  // Check if all questions in current category are answered
  const isCurrentCategoryComplete = () => {
    return category.questions.every(q => answers[q.text] !== undefined);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-roseWood h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Category Title & Quote */}
      <h2 className="text-3xl font-heading font-medium text-smokyBlack mb-2">{category.title}</h2>
      <p className="font-heading text-taupeGray text-lg lg:text-xl italic mb-6 border-l-1 pl-5">{category.quote}</p>

      {/* Questions */}
      {category.questions.map((q, index) => (
        <div key={index} className="mb-8">
          <p className="font-raleway italic font-semibold mb-3">{q.text}</p>

          {/* If options have images */}
          {q.options.some(opt => opt.img) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`cursor-pointer flex flex-col items-center p-3 border rounded-lg transition-all ${
                    answers[q.text] === opt.label 
                      ? 'border-roseWood bg-roseWood/10' 
                      : 'border-gray-300 hover:border-roseWood'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${currentCategory}-${index}`}
                    value={opt.label}
                    className="hidden"
                    onChange={() => handleAnswer(q.text, opt.label)}
                    checked={answers[q.text] === opt.label}
                  />
                  {opt.img && (
                    <img
                      src={opt.img}
                      alt={opt.label}
                      className={`w-24 h-24 object-cover rounded-full mb-2 ${
                        answers[q.text] === opt.label ? 'ring-2 ring-roseWood' : ''
                      }`}
                    />
                  )}
                  <span className={`font-body text-sm text-center ${
                    answers[q.text] === opt.label ? 'text-roseWood font-semibold' : ''
                  }`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            // If options don't have images
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`cursor-pointer p-2 rounded transition ${
                    answers[q.text] === opt.label 
                      ? 'text-roseWood bg-roseWood/10 font-semibold' 
                      : 'hover:text-roseWood'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${currentCategory}-${index}`}
                    value={opt.label}
                    className="mr-2 accent-roseWood"
                    onChange={() => handleAnswer(q.text, opt.label)}
                    checked={answers[q.text] === opt.label}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          )}

          {/* Show which answer is selected for this question */}
          {answers[q.text] && (
            <p className="mt-2 text-sm text-roseWood">
              Selected: <strong>{answers[q.text]}</strong>
            </p>
          )}
        </div>
      ))}

      {/* Debug: Show current answers */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        {Object.keys(answers).map(key => (
          <p key={key} className="text-xs text-gray-500">
            {key}: {answers[key]}
          </p>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevCategory}
          disabled={currentCategory === 0}
          className="px-6 py-2 font-heading text-xl bg-gray-300 text-smokyBlack rounded disabled:opacity-50"
        >
          Back
        </button>
        {currentCategory === categories.length - 1 ? (
          <button
            onClick={finishQuiz}
            disabled={loading || Object.keys(answers).length === 0}
            className="px-6 py-2 bg-roseWood text-white text-xl font-heading rounded hover:bg-roseWood/80 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Finish"}
          </button>
        ) : (
          <button
            onClick={nextCategory}
            className="px-6 py-2 bg-roseWood text-white text-xl font-heading rounded hover:bg-roseWood/80 transition"
          >
            Next
          </button>
        )}
      </div>

    </div>
  );
};

export default Questionnaire;
