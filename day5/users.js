// ---------- Select elements ----------
const loadBtn = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

const API_URL = "https://jsonplaceholder.typicode.com/users";

// ---------- State ----------
let users = []; // all users loaded from the API

// ---------- Render ----------
function renderUsers(list) {
  usersList.textContent = "";

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No users match your filter.";
    usersList.appendChild(li);
    return;
  }

  for (const user of list) {
    const li = document.createElement("li");

    const name = document.createElement("strong");
    name.textContent = user.name;

    const email = document.createElement("div");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("div");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("div");
    company.textContent = `Company: ${user.company.name}`;

    li.append(name, email, city, company);
    usersList.appendChild(li);
  }
}

// ---------- Filter ----------
function applyFilter() {
  const term = filterInput.value.trim().toLowerCase();
  const matches = users.filter(function (user) {
    return user.name.toLowerCase().includes(term);
  });
  renderUsers(matches);
}

// ---------- Load ----------
async function loadUsers() {
  loadBtn.disabled = true;
  statusMessage.textContent = "Loading users...";
  usersList.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    users = await response.json();
    statusMessage.textContent = `Loaded ${users.length} users.`;
    applyFilter();
  } catch (error) {
    users = [];
    statusMessage.textContent = `Error: could not load users. ${error.message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

// ---------- Events ----------
loadBtn.addEventListener("click", loadUsers);
filterInput.addEventListener("input", function () {
  if (users.length > 0) {
    applyFilter();
  }
});