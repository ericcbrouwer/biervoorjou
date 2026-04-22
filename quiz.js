const questions = [
  {
    text: "Hoe zou je jouw smaak omschrijven?",
    options: [
      { label: "Fris en licht", tags: ["licht", "fris"] },
      { label: "Bitter en complex", tags: ["bitter", "hoppy"] },
      { label: "Zoet en vol", tags: ["zoet", "vol"] },
      { label: "Zuur of avontuurlijk", tags: ["zuur", "avontuur"] },
    ],
  },
  {
    text: "Wanneer drink je het liefst een biertje?",
    options: [
      { label: "Op een zonnig terras", tags: ["licht", "fris"] },
      { label: "Bij een goed diner", tags: ["vol", "complex"] },
      { label: "Na een lange dag", tags: ["bitter", "hoppy"] },
      { label: "Bij een speciaal moment", tags: ["zuur", "avontuur"] },
    ],
  },
  {
    text: "Wat drink je naast bier het liefst?",
    options: [
      { label: "Witte wijn of rosé", tags: ["licht", "fris"] },
      { label: "Espresso of zwarte koffie", tags: ["bitter", "complex"] },
      { label: "Fruitsap of cocktail", tags: ["zoet", "zuur"] },
      { label: "Whisky of gin", tags: ["vol", "avontuur"] },
    ],
  },
  {
    text: "Hoe staat het met alcohol?",
    options: [
      { label: "Liever niet te sterk", tags: ["licht"] },
      { label: "Maakt me niet uit", tags: ["fris", "bitter"] },
      { label: "Lekker stevig mag", tags: ["vol", "complex"] },
      { label: "Hoe sterker hoe beter", tags: ["avontuur", "hoppy"] },
    ],
  },
  {
    text: "Welk gerecht past er bij jouw ideale avond?",
    options: [
      { label: "Salade of sushi", tags: ["licht", "fris"] },
      { label: "Burger of barbecue", tags: ["bitter", "hoppy"] },
      { label: "Kaas of charcuterie", tags: ["vol", "complex"] },
      { label: "Pittig of exotisch", tags: ["zuur", "avontuur"] },
    ],
  },
];

const beerTypes = [
  {
    id: "pils",
    name: "Pilsner",
    icon: "🍺",
    tags: ["licht", "fris"],
    description:
      "Fris, licht en verfrissend. Een klassieke pilsner past perfect bij jou: makkelijk drinkbaar, nooit saai en altijd op zijn plek op een warm terras.",
    examples: "Bijv. Heineken, Amstel, Grolsch, Brouwerij 't IJ Pilsner",
  },
  {
    id: "ipa",
    name: "IPA (India Pale Ale)",
    icon: "🌿",
    tags: ["bitter", "hoppy"],
    description:
      "Jij houdt van karakter. Een IPA met zijn uitgesproken hopbitterheid en aromatische complexiteit past precies bij jouw directe smaak.",
    examples: "Bijv. Brouwerij De Molen Hop & Liefde, Jopen Koyt, Lagunitas IPA",
  },
  {
    id: "dubbel",
    name: "Belgisch Dubbel",
    icon: "🏺",
    tags: ["vol", "complex"],
    description:
      "Vol, rijp en met diepte. Een Belgisch dubbel past bij iemand die geniet van nuance: karamel, gedroogd fruit en een warme afdronk.",
    examples: "Bijv. Westmalle Dubbel, Chimay Rood, La Trappe Dubbel",
  },
  {
    id: "lambic",
    name: "Lambic / Geuze",
    icon: "🍋",
    tags: ["zuur", "avontuur"],
    description:
      "Ongepolijst en avontuurlijk. Geuze is niets voor bangeriken: wild gegist, zuur en complex — net zoals jij.",
    examples: "Bijv. Cantillon Gueuze, 3 Fonteinen Geuze, Boon Oude Geuze",
  },
  {
    id: "witbier",
    name: "Witbier",
    icon: "☁️",
    tags: ["fris", "zoet"],
    description:
      "Zacht, fruitig en toegankelijk. Een witbier met koriander en sinaasappelschil past bij jou als je van fris met een vleugje zoet houdt.",
    examples: "Bijv. Hoegaarden, Blanche de Bruxelles, Allagash White",
  },
];

const scores = {};

let currentQuestion = 0;
let answers = [];

const introSection = document.getElementById("intro");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestion = 0;
  answers = [];
  Object.keys(scores).forEach((k) => delete scores[k]);
  introSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  progressText.textContent = `Vraag ${currentQuestion + 1} van ${questions.length}`;
  progressFill.style.width = `${((currentQuestion) / questions.length) * 100}%`;
  questionText.textContent = q.text;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => selectOption(opt.tags));
    optionsContainer.appendChild(btn);
  });
}

function selectOption(tags) {
  tags.forEach((tag) => {
    scores[tag] = (scores[tag] || 0) + 1;
  });

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressFill.style.width = "100%";

  const best = beerTypes.reduce((winner, beer) => {
    const score = beer.tags.reduce((s, t) => s + (scores[t] || 0), 0);
    const winnerScore = winner.tags.reduce((s, t) => s + (scores[t] || 0), 0);
    return score > winnerScore ? beer : winner;
  });

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  document.getElementById("result-icon").textContent = best.icon;
  document.getElementById("result-name").textContent = best.name;
  document.getElementById("result-description").textContent = best.description;
  document.getElementById("result-examples").textContent = best.examples;
}

function restartQuiz() {
  resultSection.classList.add("hidden");
  startQuiz();
}
