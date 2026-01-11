const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");

function getRandomLength() {
  const options = ["short", "medium", "long"];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomDifficulty() {
  const options = ["none", "medium", "high"];
  return options[Math.floor(Math.random() * options.length)];
}

translateBtn.addEventListener("click", async () => {
  const message = inputText.value;
  let tone = document.getElementById("tone").value;
  let length = document.getElementById("length").value;
  let difficulty = document.getElementById("difficulty").value;

  // Randomize if set to Auto / None
  if(length === "auto") length = getRandomLength();
  if(difficulty === "none") difficulty = getRandomDifficulty();

  outputText.value = "Generating...";
  outputText.classList.remove("visible");

  try {
    const res = await fetch("https://YOUR_BACKEND_URL/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, tone, length, difficulty })
    });

    const data = await res.json();
    outputText.value = data.result;

    // Fade-in animation
    setTimeout(() => {
      outputText.classList.add("visible");
    }, 50);

  } catch (err) {
    outputText.value = "Error generating message. Try again!";
    console.error(err);
  }
});

copyBtn.addEventListener("click", () => {
  outputText.select();
  document.execCommand("copy");
  alert("Copied!");
});
