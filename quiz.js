const questions = [
  {
    text: "Hoe zou je jouw smaak omschrijven?",
    options: [
      { label: "Fris en licht", tags: ["licht", "fris"] },
      { label: "Bitter en complex", tags: ["bitter", "hoppy", "roast", "koffie"] },
      { label: "Zoet en vol", tags: ["zoet", "vol", "fruit", "goud"] },
      { label: "Zuur of avontuurlijk", tags: ["zuur", "avontuur", "barrel"] },
    ],
  },
  {
    text: "Wanneer drink je het liefst een biertje?",
    options: [
      { label: "Op een zonnig terras", tags: ["licht", "fris", "fruit"] },
      { label: "Bij een goed diner", tags: ["vol", "complex", "goud"] },
      { label: "Na een lange dag", tags: ["bitter", "hoppy", "roast"] },
      { label: "Bij een speciaal moment", tags: ["zuur", "avontuur", "barrel", "eik"] },
    ],
  },
  {
    text: "Wat drink je naast bier het liefst?",
    options: [
      { label: "Witte wijn of rosé", tags: ["licht", "fris", "goud"] },
      { label: "Espresso of zwarte koffie", tags: ["bitter", "complex", "roast", "koffie"] },
      { label: "Fruitsap of cocktail", tags: ["zoet", "zuur", "fruit"] },
      { label: "Whisky of gin", tags: ["vol", "avontuur", "barrel", "eik"] },
    ],
  },
  {
    text: "Hoe staat het met alcohol?",
    options: [
      { label: "Liever niet te sterk", tags: ["licht", "fruit"] },
      { label: "Maakt me niet uit", tags: ["fris", "bitter"] },
      { label: "Lekker stevig mag", tags: ["vol", "complex", "sterk", "goud", "koffie"] },
      { label: "Hoe sterker hoe beter", tags: ["avontuur", "hoppy", "sterk", "barrel"] },
    ],
  },
  {
    text: "Welk gerecht past er bij jouw ideale avond?",
    options: [
      { label: "Salade of sushi", tags: ["licht", "fris"] },
      { label: "Burger of barbecue", tags: ["bitter", "hoppy", "roast"] },
      { label: "Kaas of charcuterie", tags: ["vol", "complex", "sterk", "goud", "eik"] },
      { label: "Pittig of exotisch", tags: ["zuur", "avontuur", "fruit"] },
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
    examples: "Bijv. Hertog Jan, Frontaal Dutch Pilsener, Grolsch, Brouwerij 't IJ Pilsner",
    url: "biersoorten/pilsner.html",
  },
  {
    id: "ipa",
    name: "IPA (India Pale Ale)",
    icon: "🌿",
    tags: ["bitter", "hoppy"],
    description:
      "Jij houdt van karakter. Een IPA met zijn uitgesproken hopbitterheid en aromatische complexiteit past precies bij jouw directe smaak.",
    examples: "Bijv. Brouwerij De Molen Hop & Liefde, Jopen Mooie Nel IPA, Lagunitas IPA",
    url: "biersoorten/ipa.html",
  },
  {
    id: "dubbel",
    name: "Belgisch Dubbel",
    icon: "🏺",
    tags: ["vol", "complex"],
    description:
      "Vol, rijp en met diepte. Een Belgisch dubbel past bij iemand die geniet van nuance: karamel, gedroogd fruit en een warme afdronk.",
    examples: "Bijv. Westmalle Dubbel, Chimay Rood, La Trappe Dubbel",
    url: "biersoorten/dubbel.html",
  },
  {
    id: "lambic",
    name: "Lambic / Geuze",
    icon: "🍋",
    tags: ["zuur", "avontuur"],
    description:
      "Ongepolijst en avontuurlijk. Geuze is niets voor bangeriken: wild gegist, zuur en complex — net zoals jij.",
    examples: "Bijv. Cantillon Gueuze, 3 Fonteinen Geuze, Boon Oude Geuze",
    url: "biersoorten/geuze.html",
  },
  {
    id: "witbier",
    name: "Witbier",
    icon: "☁️",
    tags: ["fris", "zoet"],
    description:
      "Zacht, fruitig en toegankelijk. Een witbier met koriander en sinaasappelschil past bij jou als je van fris met een vleugje zoet houdt.",
    examples: "Bijv. Hoegaarden, Blanche de Bruxelles, Brouwerij 't IJ Natte",
    url: "biersoorten/witbier.html",
  },
  {
    id: "smoothie",
    name: "Smoothie Bier",
    icon: "🍓",
    tags: ["fruit", "zoet"],
    description:
      "Dik, zoet en boordevol fruit. Een smoothie bier is een feest voor de zintuigen: dikke textuur, geen bitterheid, en smaken die meer aan een milkshake doen denken dan aan bier.",
    examples: "Bijv. Frontaal Smooth Criminal, Oedipus Polyamorie, Kaapse Brouwers Sour",
    url: "biersoorten/smoothie.html",
  },
  {
    id: "stout",
    name: "Stout",
    icon: "☕",
    tags: ["roast", "koffie"],
    description:
      "Donker, krachtig en troostend. Een stout ruikt naar koffie en pure chocolade, smaakt vol en geroosterd, en heeft een zijdezachte afdronk. Het zwarte goud van de bierwereld.",
    examples: "Bijv. Guinness, Brouwerij De Molen Tsarina Esra, Left Hand Milk Stout",
    url: "biersoorten/stout.html",
  },
  {
    id: "barrel",
    name: "Barrel Aged",
    icon: "🪵",
    tags: ["barrel", "eik"],
    description:
      "Gerijpt op eikenhouten vaten van bourbon, wijn of rum. Barrel aged bieren zijn complex, intens en vol vanille- en houtaroma's — ze verdienen alle aandacht.",
    examples: "Bijv. De Molen Hel & Verdoemenis BA, Struise Black Albert BA, Goose Island Bourbon County",
    url: "biersoorten/barrel.html",
  },
  {
    id: "tripel",
    name: "Tripel",
    icon: "✨",
    tags: ["sterk", "goud"],
    description:
      "Goudgeel, fris en onverwacht sterk. Een tripel is fruitig en kruidig van de gist, elegant koolzuurhoudend en heeft een lange droge afdronk. Deceptief licht van kleur voor zo'n karakter.",
    examples: "Bijv. Westmalle Tripel, La Trappe Tripel, Karmeliet Tripel",
    url: "biersoorten/tripel.html",
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
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
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
  const moreLink = document.getElementById("result-more-link");
  moreLink.href = best.url;
  moreLink.classList.remove("hidden");
}

function restartQuiz() {
  resultSection.classList.add("hidden");
  startQuiz();
}
