// ---------- Select elements ----------
const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "noteDraft";
const THEME_KEY = "noteTheme";
const MAX_CHARS = 200;
const WARNING_AT = 180;

// ---------- Counters ----------
function updateCounts() {
  const text = noteText.value;
  const chars = text.length;
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

  charCount.textContent = `${chars} / ${MAX_CHARS} characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");
  if (chars > MAX_CHARS) {
    charCount.classList.add("over");
  } else if (chars > WARNING_AT) {
    charCount.classList.add("warning");
  }
}

// ---------- Draft ----------
function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, noteText.value);
  } catch (error) {
    // storage unavailable: ignore
  }
}

function loadDraft() {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft !== null) {
      noteText.value = draft;
    }
  } catch (error) {
    // storage unavailable: ignore
  }
}

function clearNote() {
  noteText.value = "";
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    // storage unavailable: ignore
  }
  updateCounts();
  noteText.focus();
}

// ---------- Theme ----------
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

function loadTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (error) {
    // storage unavailable: ignore
  }
  applyTheme(saved === "dark");
}

// ---------- Events ----------
noteText.addEventListener("input", function () {
  updateCounts();
  saveDraft();
});

noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

clearBtn.addEventListener("click", clearNote);

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  try {
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  } catch (error) {
    // storage unavailable: ignore
  }
});

// ---------- Start ----------
loadDraft();
loadTheme();
updateCounts();