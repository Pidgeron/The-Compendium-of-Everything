(() => {
  const existing = document.getElementById("wiki-dic-thes-sett-app");
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
 
    #wiki-dic-thes-sett-app {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      background-color: var(--bg-color, #fff);
      color: var(--text-color, #000);
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      font-family: 'EB Garamond', serif;
      z-index: 999999999;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
      font-size: var(--font-size, 16px);
  } 
      #clock-container {
      position: absolute;
      bottom: 10px;
      right: 15px;
      text-align: right;
      font-family: 'EB Garamond', serif;
      font-size: 16px;
      font-style: italic;
      font-weight: bold;
      color: var(--text-color);
      text-shadow:
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white;
  }  



      .compendium-title {
      font-size: 1.4em;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      margin: 10px 0;
      font-family: 'EB Garamond', serif;
      color: var(--text-color);
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
      #wiki-dic-thes-sett-app.dark {
      --bg-color: #121212;
      --text-color: #eee;
      accent-color: royalblue;
    }


    #wiki-dic-thes-sett-app.light {
      --bg-color: #fff;
      --text-color: #000;
      --accent-color: royalblue;
      background-color: var(--bg-color);
      color: var(--text-color);
    }

    #wiki-dic-thes-sett-app header {
      display: flex;
      justify-content: space-around;
      padding: 12px 0;
      border-bottom: 1px solid #ccc;
      background-color: var(--bg-color);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    #wiki-dic-thes-sett-app header .tab {
      flex: 1;
      text-align: center;
      cursor: pointer;
      font-weight: 500;
      padding: 6px 0;
      color: var(--text-color);
      transition: color 0.3s;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    #wiki-dic-thes-sett-app header .tab.selected {
      color: var(--accent-color, royalblue);
      font-weight: 700;
    }

    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
      font-size: 28px;
      user-select: none;
    }

    #wiki-dic-thes-sett-app main {
      flex: 1;
      padding: 10px 16px;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    #wiki-dic-thes-sett-app input[type="search"] {
      width: 100%;
      padding: 10px 14px;
      border-radius: 24px;
      border: 1px solid #ccc;
      font-size: 1em;
      font-family: 'EB Garamond', serif;
      box-sizing: border-box;
      background-color: var(--bg-color);
      color: var(--text-color);
      outline-offset: 2px;
      outline-color: var(--accent-color, royalblue);
      transition: border-color 0.3s;
    }

    #wiki-dic-thes-sett-app input[type="search"]::placeholder {
      color: var(--text-color);
      opacity: 0.5;
    }

    .results, .content {
      margin-top: 14px;
      max-width: 100%;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    <style>
      header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
  }

      header .tab {
      display: inline-block;
      margin: 0 5px;
  }

     .material-symbols-outlined {
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

      #wiki-dic-thes-sett-app input[type="search"] {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

      .version-label {
      position: absolute;
      bottom: 5px;
      left: 20px;
      font-size: 16px;
      font-family: 'EB Garamond', serif;
      color: #808080;  
      user-select: none; /* so they can’t accidentally highlight it */
      opacity: 0.6; /* slightly ghostly, like the beta's soul */
      pointer-events: none; /* clicks pass through, no annoying blocking */
  }

</style>

      .result-item {
      padding: 8px 10px;
      border-radius: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      user-select: none;
      font-weight: 500;
    }

    .result-item:hover {
      background-color: var(--accent-color, royalblue);
      color: #fff;
    }

    .content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 10px 0;
      display: block;
    }

    .setting-item {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
    }

    .setting-item label {
      cursor: pointer;
    }

    .toggle-switch {
      position: relative;
      width: 40px;
      height: 22px;
      background-color: #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }

    .toggle-slider {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.3s;
    }

    .toggle-switch input:checked + .toggle-slider {
      transform: translateX(18px);
      background-color: var(--accent-color, royalblue);
    }

    input[type="range"] {
      width: 140px;
    }
  `;

  document.head.appendChild(style);

  const app = document.createElement("section");
  app.id = "wiki-dic-thes-sett-app";
  app.classList.add("light");

  app.innerHTML = `

    <header>
      <div class="tab selected" data-tab="wiki" title="Wikipedia">
        <span class="material-symbols-outlined">language<span>
      </div>
      <div class="tab" data-tab="dic" title="Dictionary">
        <span class="material-symbols-outlined">dictionary</span>
      </div>
      <div class="tab" data-tab="thes" title="Thesaurus">
        <span class="material-symbols-outlined">library_books</span>
      </div>
      <div class="tab" data-tab="sett" title="Settings">
        <span class="material-symbols-outlined">settings</span>
      </div>
    </header>
    <main>
      <div class="compendium-title">The Compendium of Everything</div>
      <input type="search" placeholder="Search Encyclopedia..." id="search-input" autocomplete="off" />
      <div class="results"></div>
      <div class="content"></div>
      <div class="settings" style="display:none;"></div>
      <div id="clock-container">
      <div id="time"></div>
      <div id="date"></div>
     
      </div>
      <div class="version-label">v. Beta 1.0</div>
    </main>
  `;

  document.body.appendChild(app);

  const tabs = app.querySelectorAll(".tab");
  const searchInput = app.querySelector("#search-input");
  const resultsDiv = app.querySelector(".results");
  const contentDiv = app.querySelector(".content");
  const settingsDiv = app.querySelector(".settings");

  let currentTab = "wiki";

  let darkMode = false;
  let fontSize = 16; // px

  function switchTab(tab) {
    currentTab = tab;
    tabs.forEach((t) => t.classList.toggle("selected", t.dataset.tab === tab));
    resultsDiv.innerHTML = "";
    contentDiv.innerHTML = "";
    settingsDiv.style.display = "none";
    searchInput.style.display = "block";
    searchInput.value = "";
    if (tab === "wiki") {
      searchInput.placeholder = "Search Wikipedia...";
      searchInput.disabled = false;
      settingsDiv.style.display = "none";
    } else if (tab === "dic") {
      searchInput.placeholder = "Search Dictionary...";
      searchInput.disabled = false;
      settingsDiv.style.display = "none";
    } else if (tab === "thes") {
      searchInput.placeholder = "Search Thesaurus...";
      searchInput.disabled = false;
      settingsDiv.style.display = "none";
    } else if (tab === "sett") {
      searchInput.style.display = "none";
      settingsDiv.style.display = "block";
      loadSettings();
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Wikipedia API
  async function wikiSearch(query) {
    if (!query) {
      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = "";
      return;
    }
    resultsDiv.innerHTML = "Searching...";
    contentDiv.innerHTML = "";
    try {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(
          query
        )}&utf8=1&srlimit=10`
      );
      const searchData = await searchRes.json();

      if (!searchData.query.search.length) {
        resultsDiv.innerHTML = "<i>No results found.</i>";
        return;
      }

      resultsDiv.innerHTML = "";
      searchData.query.search.forEach((item) => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.textContent = item.title;
        div.addEventListener("click", () => wikiLoadArticle(item.title));
        resultsDiv.appendChild(div);
      });
    } catch (e) {
      resultsDiv.innerHTML = `<i>Error fetching Wikipedia results.</i>`;
    }
  }

  async function wikiLoadArticle(title) {
    resultsDiv.innerHTML = "Loading article...";
    contentDiv.innerHTML = "";
    try {
      const articleRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          title
        )}`
      );
      const articleData = await articleRes.json();

      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = `
        <h2>${articleData.title}</h2>
        ${
          articleData.thumbnail
            ? `<img src="${articleData.thumbnail.source}" alt="${articleData.title} thumbnail"/>`
            : ""
        }
        <p>${articleData.extract}</p>
        <p><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(
          articleData.title
        )}" target="_blank" rel="noopener">Read more on Wikipedia</a></p>
      `;
    } catch (e) {
      contentDiv.innerHTML = `<i>Error loading article.</i>`;
    }
  }

  // Dictionary API (Free Dictionary API)
  async function dicSearch(query) {
    if (!query) {
      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = "";
      return;
    }
    resultsDiv.innerHTML = "Searching...";
    contentDiv.innerHTML = "";
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          query
        )}`
      );
      if (res.status === 404) {
        resultsDiv.innerHTML = "<i>No definitions found.</i>";
        return;
      }
      const data = await res.json();

      resultsDiv.innerHTML = "";

      displayDictionary(data[0]);
    } catch (e) {
      resultsDiv.innerHTML = "<i>Error fetching dictionary data.</i>";
    }
  }

  function displayDictionary(entry) {
    if (!entry) {
      contentDiv.innerHTML = "<i>No data.</i>";
      return;
    }
    let html = `<h2>${entry.word}</h2>`;
    if (entry.phonetics && entry.phonetics[0]?.text) {
      html += `<p><i>Pronunciation: ${entry.phonetics[0].text}</i></p>`;
    }
    if (entry.meanings && entry.meanings.length) {
      entry.meanings.forEach((meaning) => {
        html += `<h3>${meaning.partOfSpeech}</h3><ul>`;
        meaning.definitions.forEach((def) => {
          html += `<li>${def.definition}`;
          if (def.example) html += `<br><em>Example: ${def.example}</em>`;
          html += `</li>`;
        });
        html += `</ul>`;
      });
    }
    contentDiv.innerHTML = html;
  }

  // Thesaurus API (Datamuse API)
  async function thesSearch(query) {
    if (!query) {
      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = "";
      return;
    }
    resultsDiv.innerHTML = "Searching...";
    contentDiv.innerHTML = "";
    try {
      const res = await fetch(
        `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(
          query
        )}&max=20`
      );
      const data = await res.json();
      if (!data.length) {
        resultsDiv.innerHTML = "<i>No synonyms found.</i>";
        return;
      }
      resultsDiv.innerHTML = "";
      contentDiv.innerHTML =
        `<h2>Synonyms for "${query}"</h2><ul>` +
        data.map((w) => `<li>${w.word}</li>`).join("") +
        `</ul>`;
    } catch (e) {
      resultsDiv.innerHTML = "<i>Error fetching thesaurus data.</i>";
    }
  }

  function loadSettings() {
    settingsDiv.innerHTML = `
      <div class="setting-item">
        <label for="dark-mode-toggle">Dark Mode</label>
        <label class="toggle-switch">
          <input type="checkbox" id="dark-mode-toggle" ${
            darkMode ? "checked" : ""
          }>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="setting-item">
        <label for="font-size-range">Text Size (${fontSize}px)</label>
        <input type="range" id="font-size-range" min="12" max="24" value="${fontSize}">
      </div>
    `;

    settingsDiv
      .querySelector("#dark-mode-toggle")
      .addEventListener("change", (e) => {
        darkMode = e.target.checked;
        if (darkMode) {
          app.classList.add("dark");
          app.classList.remove("light");
        } else {
          app.classList.remove("dark");
          app.classList.add("light");
        }
      });

    settingsDiv
      .querySelector("#font-size-range")
      .addEventListener("input", (e) => {
        fontSize = e.target.value;
        app.style.setProperty("--font-size", `${fontSize}px`);
        // Update label text
        e.target.previousElementSibling.textContent = `Text Size (${fontSize}px)`;
      });
  }

  // Input handler
  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const q = searchInput.value.trim();
    debounceTimer = setTimeout(() => {
      if (currentTab === "wiki") {
        wikiSearch(q);
      } else if (currentTab === "dic") {
        dicSearch(q);
      } else if (currentTab === "thes") {
        thesSearch(q);
      }
    }, 400);
  });

  switchTab("wiki");

  // Initialise theme
  app.classList.add("light");
  app.style.setProperty("--font-size", `${fontSize}px`);
})();

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString();

  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

//Copyright 2025 by L. Smalley

setInterval(updateClock, 1000);
updateClock(); // Call immediately to avoid delay
