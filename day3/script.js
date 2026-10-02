// ---------- Starting data ----------
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const VALID_CATEGORIES = ["personal", "work", "study"];

// ---------- 1. searchNotes ----------
function searchNotes(word) {
  const search = word.toLowerCase();
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });
}

// ---------- 2. longestNote ----------
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// ---------- 3. countByCategory ----------
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 1;
    } else {
      counts[note.category]++;
    }
  }
  return counts;
}

// ---------- 4. getSummary ----------
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";

  if (total === 0) {
    return `0 ${word}.`;
  }

  const parts = [];
  for (const category of VALID_CATEGORIES) {
    if (counts[category]) {
      parts.push(`${counts[category]} ${category}`);
    }
  }
  return `${total} ${word}: ${parts.join(", ")}.`;
}

// ---------- 5. isDuplicate ----------
function normalise(text) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

function isDuplicate(text) {
  const target = normalise(text);
  return notes.some(function (note) {
    return normalise(note.text) === target;
  });
}

// ---------- 6. addNote ----------
function addNote(text, category) {
  const cleaned = text.trim();

  if (cleaned.length < 1 || cleaned.length > 200) {
    console.log("Rejected: text must be 1-200 characters.");
    return false;
  }
  if (isDuplicate(cleaned)) {
    console.log("Rejected: duplicate note.");
    return false;
  }
  if (!VALID_CATEGORIES.includes(category)) {
    console.log("Rejected: category must be personal, work or study.");
    return false;
  }

  let maxId = 0;
  for (const note of notes) {
    if (note.id > maxId) {
      maxId = note.id;
    }
  }
  notes.push({ id: maxId + 1, text: cleaned, category: category });
  return true;
}

// =====================================================
// TESTS (expected output in the comment next to each)
// =====================================================

// --- searchNotes ---
console.log("searchNotes('MILK'):", searchNotes("MILK"));
// [ { id: 1, text: "Buy milk and bread", category: "personal" } ]  (ignores case)
console.log("searchNotes('the'):", searchNotes("the"));
// 2 notes: ids 2 and 3
console.log("searchNotes('xyz'):", searchNotes("xyz"));
// []  (edge case: no results)

// --- longestNote ---
console.log("longestNote():", longestNote());
// { id: 3, text: "Email the project report to Grace", category: "work" }
const backup = notes;
notes = [];
console.log("longestNote() on empty array:", longestNote());
// null  (edge case)
notes = backup;

// --- countByCategory ---
console.log("countByCategory():", countByCategory());
// { personal: 2, study: 2, work: 1 }
notes = [];
console.log("countByCategory() on empty array:", countByCategory());
// {}  (edge case)
notes = backup;

// --- getSummary ---
console.log("getSummary():", getSummary());
// "5 notes: 2 personal, 1 work, 2 study."
notes = [backup[0]];
console.log("getSummary() with one note:", getSummary());
// "1 note: 1 personal."  (edge case: singular)
notes = [];
console.log("getSummary() with no notes:", getSummary());
// "0 notes."  (edge case)
notes = backup;

// --- isDuplicate ---
console.log("isDuplicate('buy milk and bread'):", isDuplicate("buy milk and bread"));
// true  (ignores case)
console.log("isDuplicate('  BUY   milk and   bread '):", isDuplicate("  BUY   milk and   bread "));
// true  (ignores case and extra spaces)
console.log("isDuplicate('Walk the dog'):", isDuplicate("Walk the dog"));
// false

// --- addNote ---
console.log("addNote('Walk the dog', 'personal'):", addNote("Walk the dog", "personal"));
// true
console.log("addNote('walk the dog', 'work'):", addNote("walk the dog", "work"));
// logs "Rejected: duplicate note." then false
console.log("addNote('', 'work'):", addNote("", "work"));
// logs "Rejected: text must be 1-200 characters." then false
console.log("addNote(201 characters, 'work'):", addNote("a".repeat(201), "work"));
// logs "Rejected: text must be 1-200 characters." then false
console.log("addNote('Plan trip', 'fun'):", addNote("Plan trip", "fun"));
// logs "Rejected: category must be personal, work or study." then false
console.log("addNote(200 characters, 'work'):", addNote("b".repeat(200), "work"));
// true  (edge case: exactly 200 is allowed)
console.log("getSummary() after adding:", getSummary());
// "7 notes: 3 personal, 2 work, 2 study."