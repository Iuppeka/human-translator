const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthSelect = document.getElementById("length");
const difficultySelect = document.getElementById("difficulty");
const toneSelect = document.getElementById("tone");

// Simple mapping presets
function humanize(text, length, difficulty, tone) {
  // Base replacements
  let result = text;

  // Tone replacements
  const toneMap = {
    friendly: result.replace(/per my last email/gi, "hey! just checking in").replace(/follow up/gi, "check in"),
    neutral: result.replace(/per my last email/gi, "following up").replace(/just wanted to follow up/gi, "checking"),
    confident: result.replace(/just wanted to follow up/gi, "following up on"),
    polite: result.replace(/just wanted to follow up/gi, "checking in, please let me know"),
    gentle: result.replace(/per my last email/gi, "hey, just wanted to see if")
  };
  result = toneMap[tone] || result;

  // Length adjustments
  if(length === "short") result = result.split(" ").slice(0,10).join(" ");
  else if(length === "medium") result = result.split(" ").slice(0,20).join(" ");
  else if(length === "long") result = result + " Let me know what you think.";

  // Difficulty adjustments
  if(difficulty === "none") result = result.replace(/regarding|please|following up|just/gi, "");
  if(difficulty === "high") result = result.replace(/check in/gi, "follow up on matters");

  return result.trim();
}

// Translate button
translateBtn.addEventListener("click", () => {
  const text = inputText.value;
  const length = lengthSelect.value;
  const difficulty = difficultySelect.value;
  const tone = toneSelect.value;

  outputText.value = humanize(text, length, difficulty, tone);
});

// Copy button
copyBtn.addEventListener("click", () => {
  outputText.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});
