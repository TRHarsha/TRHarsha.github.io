var facts = [
  {
    text: "India is the world's largest democracy."
  },
  {
    text: "Yoga originated in India over 5,000 years ago."
  },
  {
    text: "India is the second-most populous country in the world."
  },
  {
    text: "The Taj Mahal is one of the Seven Wonders of the World."
  },
  // Add more facts here...
];

var factText = document.getElementById("factText");

function getRandomFact() {
  var randomFact = facts[Math.floor(Math.random() * facts.length)];
  factText.textContent = randomFact.text;
}

function resetFact() {
  factText.textContent = "";
}
