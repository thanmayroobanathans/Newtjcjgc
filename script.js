const QUESTIONS = [
  {
    text: "It is 11:30 PM and you have work due tomorrow. What happens?",
    options: [
      ["I already finished it.", {academic: 3, discipline: 2}],
      ["I start now and somehow lock in.", {night: 2, chaos: 1}],
      ["I open Instagram first.", {chaos: 3}],
      ["I ask the group what the assignment even is.", {social: 3}]
    ]
  },
  {
    text: "Your ideal campus evening is…",
    options: [
      ["Library + headphones.", {academic: 3, night: 1}],
      ["Mess with friends until something happens.", {social: 3}],
      ["A completely unplanned adventure.", {chaos: 3}],
      ["Gaming / movies in my room.", {night: 2, chaos: 1}]
    ]
  },
  {
    text: "A friend says: “Let's go somewhere right now.”",
    options: [
      ["Absolutely. Where?", {chaos: 3}],
      ["Only if it doesn't ruin my schedule.", {academic: 2, discipline: 2}],
      ["Who else is coming?", {social: 3}],
      ["Maybe after midnight.", {night: 3}]
    ]
  },
  {
    text: "When do you do your best thinking?",
    options: [
      ["Early morning.", {discipline: 3}],
      ["Afternoon.", {academic: 2}],
      ["Late night.", {night: 3}],
      ["Whenever a deadline attacks me.", {chaos: 3}]
    ]
  },
  {
    text: "In a group project, you usually become…",
    options: [
      ["The planner.", {discipline: 3, academic: 1}],
      ["The presenter / social one.", {social: 3}],
      ["The person who fixes everything at 2 AM.", {chaos: 2, night: 2}],
      ["The person who quietly does their part.", {academic: 2, discipline: 1}]
    ]
  },
  {
    text: "Pick the sentence most likely to come from you.",
    options: [
      ["“Let's make a plan.”", {discipline: 3}],
      ["“Bro, we'll figure it out.”", {chaos: 3}],
      ["“Who all are coming?”", {social: 3}],
      ["“I'll do it tonight.”", {night: 3}]
    ]
  },
  {
    text: "Your relationship with deadlines is…",
    options: [
      ["Healthy and respectful.", {discipline: 3}],
      ["Complicated but functional.", {academic: 2, chaos: 1}],
      ["Enemies-to-lovers.", {chaos: 3}],
      ["I become powerful only when the deadline is terrifying.", {night: 2, chaos: 2}]
    ]
  },
  {
    text: "Which environment makes you most productive?",
    options: [
      ["Quiet library.", {academic: 3}],
      ["Coffee + a little background noise.", {social: 1, academic: 2}],
      ["My room at an unreasonable hour.", {night: 3}],
      ["Somehow, complete chaos.", {chaos: 3}]
    ]
  },
  {
    text: "If your friends describe you in one word, it is probably…",
    options: [
      ["Reliable.", {discipline: 3}],
      ["Funny.", {social: 2, chaos: 1}],
      ["Smart.", {academic: 3}],
      ["Unpredictable.", {chaos: 3}]
    ]
  },
  {
    text: "What would you rather discover?",
    options: [
      ["How to become extremely productive.", {discipline: 3}],
      ["A secret study shortcut.", {academic: 3}],
      ["A new group of people.", {social: 3}],
      ["A place nobody knows about.", {chaos: 2, night: 1}]
    ]
  }
];

const TYPES = {
  academic: {
    title: "THE ACADEMIC WEAPON",
    description: "You somehow make studying look like a competitive sport. Your browser has more PDFs than memes.",
    traits: ["High focus", "Strategic", "Deadline aware"]
  },
  discipline: {
    title: "THE ORGANIZED ONE",
    description: "There is a plan. There is probably a backup plan. Everyone else is slightly concerned by how functional you are.",
    traits: ["Planner", "Reliable", "Consistent"]
  },
  social: {
    title: "THE SOCIAL ENGINE",
    description: "You rarely do anything alone. Somehow every ordinary campus event turns into a story.",
    traits: ["Connector", "Outgoing", "People person"]
  },
  night: {
    title: "THE NIGHT OWL",
    description: "Your productivity starts exactly when normal people are considering sleep.",
    traits: ["Late-night brain", "Independent", "Midnight energy"]
  },
  chaos: {
    title: "THE CHAOS ENGINEER",
    description: "You don't follow the plan. You improvise until the plan becomes irrelevant—and somehow it works.",
    traits: ["Unpredictable", "Adaptable", "Last-minute genius"]
  }
};

let answers = [];
let current = 0;
const state = { academic: 0, discipline: 0, social: 0, night: 0, chaos: 0 };

const $ = id => document.getElementById(id);

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top: 0, behavior: "smooth"});
}

function renderQuestion() {
  const q = QUESTIONS[current];
  $("progressText").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  $("questionNumber").textContent = String(current + 1).padStart(2, "0");
  $("progressBar").style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
  $("question").textContent = q.text;

  const options = $("options");
  options.innerHTML = "";

  q.options.forEach(([label, points], index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = label;
    button.addEventListener("click", () => choose(index, points));
    options.appendChild(button);
  });
}

function choose(index, points) {
  answers.push(index);
  Object.entries(points).forEach(([key, value]) => state[key] += value);

  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion();
  } else {
    calculateResult();
  }
}

function calculateResult() {
  const winner = Object.keys(state).sort((a, b) => state[b] - state[a])[0];
  const type = TYPES[winner];

  $("resultTitle").textContent = type.title;
  $("resultDescription").textContent = type.description;
  $("traits").innerHTML = type.traits.map(t => `<span>${t}</span>`).join("");

  const twin = findTwin();
  $("twinTitle").textContent = twin.name;
  $("similarityValue").textContent = `${twin.score}%`;
  $("twinDescription").textContent = twin.description;

  show("result");
}

function findTwin() {
  // V1 is completely local/free: generate a statistical "campus twin"
  // from a small opt-in demo pool. Replace this pool with real opt-in
  // database records in V2.
  const pool = [
    {name:"Alex", answers:[2,1,0,2,2,1,2,2,1,2]},
    {name:"Sam", answers:[0,0,1,0,0,0,0,0,2,1]},
    {name:"Riya", answers:[3,2,2,1,1,2,1,1,1,2]},
    {name:"Arjun", answers:[1,3,3,2,2,1,2,0,3,3]},
    {name:"Karthik", answers:[2,1,3,3,3,1,3,2,1,3]},
    {name:"Meera", answers:[0,1,0,0,0,0,0,0,0,1]}
  ];

  let best = {name:"A VIT student", score: 0, description:"Your closest match will become more meaningful when V2 contains real opt-in participants."};

  for (const person of pool) {
    // Similarity = 100% minus normalized Manhattan distance.
    let distance = 0;
    const maxDistance = QUESTIONS.length * 3;
    for (let i = 0; i < QUESTIONS.length; i++) {
      distance += Math.abs(answers[i] - person.answers[i]);
    }
    const score = Math.max(0, Math.round((1 - distance / maxDistance) * 100));

    if (score > best.score) {
      best = {
        name: person.name,
        score,
        description: "Your answer pattern is closest to this demo participant. In V2, this can compare against real opt-in participants."
      };
    }
  }

  return best;
}

$("startBtn").addEventListener("click", () => {
  answers = [];
  current = 0;
  Object.keys(state).forEach(k => state[k] = 0);
  show("quiz");
  renderQuestion();
});

$("againBtn").addEventListener("click", () => {
  $("startBtn").click();
});

$("shareBtn").addEventListener("click", async () => {
  const title = $("resultTitle").textContent;
  const twin = $("twinTitle").textContent;
  const text = `I got "${title}" on VIT Pulse and my closest statistical VIT twin is ${twin}. Find yours!`;

  if (navigator.share) {
    try {
      await navigator.share({title: "VIT Pulse", text, url: location.href});
      $("shareStatus").textContent = "Shared.";
    } catch {
      $("shareStatus").textContent = "Share cancelled.";
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${text} ${location.href}`);
      $("shareStatus").textContent = "Result copied. Paste it into WhatsApp or Instagram.";
    } catch {
      $("shareStatus").textContent = `${text} ${location.href}`;
    }
  }
});
