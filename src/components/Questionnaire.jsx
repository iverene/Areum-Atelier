import React, { useState } from "react";
import axios from "axios";
import ResultsPage from "../components/ResultPage";
import { useEffect } from "react";

const categories = [
  {
    title: "Skin Tone",
    quote: "Every complexion carries its own kind of light. Let’s find the tone that reflects yours.",
    questions: [
      {
        text: "How would you describe your overall skin tone?",
        options: [
            { label: "Fair", img: "/questionnaire/fair.jpg" },
            { label: "Light", img: "/questionnaire/light.jpg" },
            { label: "Medium", img: "/questionnaire/medium.jpg" },
            { label: "Tan", img: "/questionnaire/tan.jpg" },
            { label: "Deep", img: "/questionnaire/deep.jpg" },
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
            { label: "Porcelain / Ivory", img: "/questionnaire/foundation-ivory.png" },
            { label: "Beige / Honey", img: "/questionnaire/foundation-beige.png" },
            { label: "Sand / Warm Tan", img: "/questionnaire/foundation-sand.png" },
            { label: "Caramel / Chestnut", img: "/questionnaire/foundation-caramel.png" },
            { label: "Mocha / Espresso", img: "/questionnaire/foundation-mocha.png" },
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
          { label: "Silver or platinum", img: "/questionnaire/undertone-silver.jpg" },
          { label: "Both silver and gold", img: "/questionnaire/undertone-both.jpg" },
          { label: "Gold or rose gold", img: "/questionnaire/undertone-gold.jpg" },
        ],
      },
      {
        text: "What color are the veins on your wrist under natural light?",
        options: [
          { label: "Blue or purple (Cool)"},
          { label: "A mix of blue and green (Neutral)"},
          { label: "Green or olive (Warm)"},
        ],
      },
      {
        text: "Which clothing colors make you look more radiant?",
        options: [
          { label: "Jewel tones (blue, emerald, violet)", img: "/questionnaire/undertone-jewel.jpg" },
          { label: "Balanced neutrals (taupe, rose, gray)", img: "/questionnaire/undertone-neutral-clothing.jpg" },
          { label: "Earth tones (peach, coral, olive, bronze)", img: "/questionnaire/undertone-earth.jpg" },
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
          { label: "Almost equal (Round or Square)", img: "/questionnaire/face-round-square.jpg" },
          { label: "Slightly longer than wide (Oval or Heart)", img: "/questionnaire/face-oval-heart.jpg" },
          { label: "Noticeably longer (Oblong or Diamond)", img: "/questionnaire/face-oblong-diamond.jpg" },
        ],
      },
      {
        text: "What best describes your jawline?",
        options: [
          { label: "Soft and curved (Round, Oval)", img: "/questionnaire/jaw-soft.jpg" },
          { label: "Pointed or V-shaped (Heart)", img: "/questionnaire/jaw-vshape.jpg" },
          { label: "Strong and angular (Square)", img: "/questionnaire/jaw-strong.jpg" },
          { label: "Tapered with high cheekbones (Diamond)", img: "/questionnaire/jaw-diamond.jpg" },
        ],
      },
      {
        text: "What stands out when you look in the mirror?",
        options: [
          { label: "Full cheeks and soft features.", img: "/questionnaire/mirror-cheeks.jpg" },
          { label: "Balanced proportions overall.", img: "/questionnaire/mirror-balance.jpg" },
          { label: "Wider forehead and narrower chin.", img: "/questionnaire/mirror-heart.jpg" },
          { label: "Strong, well-defined jawline.", img: "/questionnaire/mirror-jaw.jpg" },
          { label: "Sharp cheekbones and delicate chin.", img: "/questionnaire/mirror-cheekbones.jpg" },
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
          { label: "Almond", img: "/questionnaire/eyes-almond.jpg" },
          { label: "Monolid", img: "/questionnaire/eyes-monolid.jpg" },
          { label: "Hooded", img: "/questionnaire/eyes-hooded.jpg" },
          { label: "Round", img: "/questionnaire/eyes-round.jpg" },
          { label: "Upturned", img: "/questionnaire/eyes-upturned.jpg" },
          { label: "Downturned", img: "/questionnaire/eyes-downturned.jpg" },
        ],
      },
      {
        text: "What is your natural eye color?",
        options: [
          { label: "Deep Brown" },
          { label: "Hazel" },
          { label: "Green" },
          { label: "Blue" },
          { label: "Gray" },
          { label: "Black" },
        ],
      },
      {
        text: "How would you describe your lashes and lid visibility?",
        options: [
          { label: "Short lashes, visible lid."},
          { label: "Long lashes, slightly hidden lid." },
          { label: "Prominent lashes with deep-set eyes." },
          { label: "Small lid space, gentle crease." },
        ],
      },
      {
        text: "Which eye feature do you usually enhance most?",
        options: [
          { label: "Lashes" },
          { label: "Eyeliner" },
          { label: "Eyeshadow" },
          { label: "Brows" },
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
          { label: "Thin — delicate lips, minimal volume.", img: "/questionnaire/lips-thin.jpg" },
          { label: "Medium — balanced top and bottom lips.", img: "/questionnaire/lips-medium.jpg" },
          { label: "Full — plump lips with noticeable volume.", img: "/questionnaire/lips-full.jpg" },
        ],
      },
      {
        text: "What is your lip shape?",
        options: [
          { label: "Heart-shaped (defined cupid’s bow).", img: "/questionnaire/lips-heart.jpg" },
          { label: "Rounded (soft, even curves).", img: "/questionnaire/lips-rounded.jpg" },
          { label: "Wide (extends outward with gentle corners).", img: "/questionnaire/lips-wide.png" },
          { label: "Petite (smaller and delicate proportions).", img: "/questionnaire/lips-petite.jpg" },
        ],
      },
      {
        text: "How pigmented are your natural lips?",
        options: [
          { label: "Very pale or light pink.", img: "/questionnaire/lips-pale.jpg" },
          { label: "Soft rose or peachy tone.", img: "/questionnaire/lips-softrose.jpg" },
          { label: "Naturally rich or deeper color.", img: "/questionnaire/lips-deep.jpg" },
        ],
      },
      {
        text: "Which lip products do you prefer?",
        options: [
          { label: "Sheer tint or balm.", img: "/questionnaire/lips-tint.jpg" },
          { label: "Gloss with shine.", img: "/questionnaire/lips-gloss.jpg" },
          { label: "Creamy lipstick.", img: "/questionnaire/lips-cream.jpg" },
          { label: "Matte or longwear finish.", img: "/questionnaire/lips-matte.jpg" },
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
          { label: "Effortless, fresh, natural glow.", img: "/questionnaire/look-natural.jpg" },
          { label: "Polished, radiant, and softly glamorous.", img: "/questionnaire/look-glam.jpg" },
          { label: "Bold, expressive, and statement-making.", img: "/questionnaire/look-bold.jpg" },
          { label: "Minimal, clean, and quietly confident.", img: "/questionnaire/look-minimal.jpg" },
        ],
      },
      {
        text: "What part of your face do you like to highlight most?",
        options: [
          { label: "Skin (dewy and flawless base)", img: "/questionnaire/highlight-skin.jpg" },
          { label: "Eyes (shadows, liner, lashes)", img: "/questionnaire/highlight-eyes.jpg" },
          { label: "Lips (color and definition)", img: "/questionnaire/highlight-lips.jpg" },
          { label: "Cheeks (blush or contour)", img: "/questionnaire/highlight-cheeks.jpg" },
        ],
      },
      {
        text: "What best matches your ideal style inspiration?",
        options: [
          { label: "Korean natural glow", img: "/questionnaire/style-korean.jpg" },
          { label: "French chic", img: "/questionnaire/style-french.jpg" },
          { label: "Glam couture", img: "/questionnaire/style-glam.jpg" },
          { label: "Modern minimalist", img: "/questionnaire/style-minimal.jpg" },
        ],
      },
      {
        text: "How do you want your look to make you feel?",
        options: [
          { label: "Confident and radiant.", img: "/questionnaire/feel-confident.jpg" },
          { label: "Calm and graceful.", img: "/questionnaire/feel-graceful.jpg" },
          { label: "Playful and expressive.", img: "/questionnaire/feel-playful.jpg" },
          { label: "Elegant and timeless.", img: "/questionnaire/feel-elegant.jpg" },
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCategory]);

  const nextCategory = () => {
    if (!isCurrentCategoryComplete()) {
      alert("Please answer all questions in this category before proceeding.");
      return;
    }
    
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
            disabled={!isCurrentCategoryComplete()} 
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
