(() => {
  const existing = document.getElementById("wiki-dic-thes-sett-app");
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

      #wiki-dic-thes-sett-app {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.25);
      transform-origin: center;
      width: 400px;
      height: 600px;
      background-color: var(--bg-color, #fff);
      color: var(--text-color, #000);
      border-radius: 30px;
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
      font-weight: bold;
      color: #000;
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

      .author-title {
      font-size: 16px;
      position: absolute;
      bottom: 5px;
      left: 20px;
      font-family: 'EB Garamond', serif;
      font-style: italic;
      opacity: 0.6;
      color: #808080;
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
    
      header {
      display: flex;
      flex-direction: row;
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

      .version-details {
      user-select: none;
      position: absolute;
      bottom: 50px;   
      left: 20px;
      max-width: 200px;
      padding: 10px 15px;
      background: #f9f9f9;
      border: 1px solid #ccc;
      font-family: 'EB Garamond', serif;
      font-size: 14px;
      color: #444;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border-radius: 6px;
      z-index: 100;
      white-space: normal;
    }
      .version-label {
      cursor: pointer;
      user-select: none;
      position: absolute;
      bottom: 24px;
      left: 20px;
      font-size: 16px;
      font-style: italic;
      font-family: 'EB Garamond', serif;
      opacity: 0.6;
      color: #808080;
    }

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
      border-radius: 10px;
      border: 1px solid #ccc;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
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



    #content.weather-content {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      background: linear-gradient(to bottom, #ffffff, #f0f8ff);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      text-align: center;
      font-family: 'EB Garamond', serif;
  }

    #content.weather-content h3 {
      margin-bottom: 1rem;
      font-size: 1.6rem;
      color: #333;
  }

    #content.weather-content img {
      margin: 1rem 0;
      filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));
  }

    #content.weather-content p {
      margin: 0.3rem 0;
      font-size: 1rem;
      color: #444;
  }

     .input-group {
      display: flex;
      align-items: center;
  }

     #location-input {
      height: 22px;
      border: 1px solid black;
      border-radius: 12px 0 0 12px;
      padding: 0 8px;
      font-family: 'EB Garamond', serif;
      margin: 0;
      box-sizing: border-box;
      line-height: normal;|
  }
  
     #get-weather-btn {
      height: 22px;
      border: 1px solid black;
      border-left: none;
      border-radius: 0 12px 12px 0;
      background-color: var(--accent-color);
      color: white;
      margin: 0;
      padding: 0 10px;
      font-family: 'EB Garamond', serif;
      font-style: italic;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
      box-sizing: border-box;
      line-height: normal;
  }
     .input-group {
      text-align: center;
      margin-bottom: 1em;
  }
     .input-group input {
      padding: 0.5em 1em;
      font-size: 1rem;
      width: 250px;
      max-width: 90vw;
      margin-right: 0.5em;
      font-family: 'EB Garamond', serif;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
     .input-group button {
      padding: 0.5em 1.2em;
      font-size: 1rem;
      cursor: pointer;
      font-family: 'EB Garamond', serif;
      background-color: var(--accent-color);
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
  }

     .unit-toggle {
      text-align: center;
      margin-bottom: 1em;
      font-size: 0.9rem;
      user-select: none;
      font-family: 'EB Garamond', serif;
      color: var(--accent-color);
    }
     .unit-toggle input[type="checkbox"] {
      margin-right: 0.4em;
      transform: scale(1.2);
      cursor: pointer;
  }


     .weather-card {
      background: #f9f9f9;
      border-radius: 8px;
      max-width: 320px;
      margin: 0 auto;
      padding: 1.2em 1.5em;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      font-family: 'EB Garamond', serif;
      color: #222;
  }

     .weather-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6em;
      margin-bottom: 0.3em;
  }

     .weather-icon {
      font-size: 2.4rem;
      color: var(--accent-color);
  }

     .loading-spinner {
      font-size: 2rem;
      animation: spin 1.5s linear infinite;
      display: inline-block;
      vertical-align: middle;
      color: var(--accent-color);
  }

      @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
  }

     .wind-container {
      margin-top: 1em;
      user-select: none;
  }

     .wind-speed {
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 0.2em;
      color: var(--accent-color);
      font-family: 'EB Garamond', serif;
 }

     wind-compass {
      display: block;
      margin: 0 auto;
      max-width: 100px;
      height: 100px;
      stroke-linejoin: round;
  }

      input:focus {
      outline-color: var(--accent-color);
      border-color: var(--accent-color);
      box-shadow: 0 0 5px var(--accent-color);
  }

      button:hover {
      background-color: #2743c6; /* darker royal blue */
      transition: background-color 0.3s;
  }


  `;

  document.head.appendChild(style);

  const app = document.createElement("section");
  app.id = "wiki-dic-thes-sett-app";
  app.classList.add("light");

  app.innerHTML = `

   <header>
  <div class="tab selected" data-tab="wiki" title="Wikipedia">
    <span class="material-symbols-outlined">language</span>
  </div>
  <div class="tab" data-tab="dic" title="Dictionary">
    <span class="material-symbols-outlined">dictionary</span>
  </div>
  <div class="tab" data-tab="thes" title="Thesaurus">
    <span class="material-symbols-outlined">library_books</span>
  </div>
  <div class="tab" data-tab="weather" title="Weather">
  <span class="material-symbols-outlined">cloud</span>
</div>

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
      <div id="calc-display"></div>
    </div>

      <div class="version-label" id="versionLabel">v. Beta 1.5</div>
      <div id="versionDetails" class="version-details" style="display:none;"></div>
      <div class="author-title">Made by L. Smalley</div>
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
  let fontSize = 14; // px
  let appSize = 1.25; //scale

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
    } else if (tab === "weather") {
      searchInput.style.display = "none";
      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = "";
      settingsDiv.style.display = "none";
      loadWeather();
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
    resultsDiv.innerHTML = ""; // clear search results
    contentDiv.innerHTML = "Loading article...";
    try {
      const articleRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodeURIComponent(
          title
        )}&prop=text`
      );
      const data = await articleRes.json();
      let html =
        data && data.parse && data.parse.text && data.parse.text["*"]? data.parse.text["*"]
          : "<i>Could not load content.</i>";

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      doc.querySelectorAll("a").forEach((a) => {
        a.removeAttribute("href");
        a.style.cursor = "default";
        a.style.color = "inherit";
        a.style.textDecoration = "none";
      });

      contentDiv.innerHTML = doc.body.innerHTML;
    } catch (e) {
      contentDiv.innerHTML = "<i>Error loading article.</i>";
    }
  }

  
  //Dictionary API (Free Dictionary API)
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
      const [synRes, antRes] = await Promise.all([
        fetch(
          `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(
            query
          )}&max=20`
        ),
        fetch(
          `https://api.datamuse.com/words?rel_ant=${encodeURIComponent(
            query
          )}&max=20`
        ),
      ]);

      const synData = await synRes.json();
      const antData = await antRes.json();

      resultsDiv.innerHTML = "";

      let html = `<h2>Thesaurus for "${query}"</h2>`;

      if (synData.length) {
        html +=
          `<h3>Synonyms</h3><ul>` +
          synData.map((w) => `<li>${w.word}</li>`).join("") +
          `</ul>`;
      } else {
        html += `<h3>Synonyms</h3><p><i>No synonyms found.</i></p>`;
      }

      if (antData.length) {
        html +=
          `<h3>Antonyms</h3><ul>` +
          antData.map((w) => `<li>${w.word}</li>`).join("") +
          `</ul>`;
      } else {
        html += `<h3>Antonyms</h3><p><i>No antonyms found.</i></p>`;
      }

      contentDiv.innerHTML = html;
    } catch (e) {
      resultsDiv.innerHTML = "<i>Error fetching thesaurus data.</i>";
    }
  }

  if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  async function loadWeather() {
    contentDiv.innerHTML = `
    <div class="input-group">
      <input type="text" id="location-input" placeholder="Enter ZIP or City, State">
      <button id="get-weather-btn">Get Weather</button>
    </div>
    <div class="unit-toggle">
      <label>
        <input type="checkbox" id="unit-toggle">
        Use Fahrenheit / Miles
      </label>
    </div>
    <div id="weather-output" class="weather-card" style="text-align:center;">
      <i>Enter a location to get weather.</i>
    </div>
  `;

    const input = document.getElementById("location-input");
    const button = document.getElementById("get-weather-btn");
    const output = document.getElementById("weather-output");
    const unitToggle = document.getElementById("unit-toggle");

    // Maps wind compass points to degrees for rotation (N=0°, E=90°, etc)
    const windDirDegrees = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5,
    };

    const weatherIcons = {
      Sunny: "wb_sunny",
      Clear: "nightlight_round",
      "Partly cloudy": "partly_cloudy_day",
      Cloudy: "cloud",
      Overcast: "cloud_queue",
      Mist: "foggy",
      "Patchy rain possible": "umbrella",
      "Light rain": "rainy",
      "Heavy rain": "rainy",
      Thunderstorm: "thunderstorm",
      Snow: "snowing",
      // fallback icon
      default: "wb_cloudy",
    };

    function getWeatherIcon(desc) {
      // Basic lookup ignoring case, fallback to default
      for (const key in weatherIcons) {
        if (desc.toLowerCase().includes(key.toLowerCase()))
          return weatherIcons[key];
      }
      return weatherIcons["default"];
    }

    async function fetchWeather(query) {
      if (!query) {
        output.innerHTML = `<i>Please enter a location.</i>`;
        return;
      }

      const isZip = /^[0-9]+$/.test(query.trim());
      const location = isZip ? `${query.trim()},US` : query.trim();

      output.innerHTML = `
      <span class="material-symbols-outlined loading-spinner">autorenew</span>
      <div>Loading weather...</div>`;

      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(location)}?format=j1`
        );
        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();
        const area = data.nearest_area?.[0]?.areaName?.[0]?.value || location;
        const cc = data.current_condition?.[0];
        if (!cc) throw new Error("No weather data");

        const desc = cc.weatherDesc?.[0]?.value;
        const tempC = parseFloat(cc.temp_C);
        const feelsLikeC = parseFloat(cc.FeelsLikeC);
        const humidity = cc.humidity;
        const windKmph = parseFloat(cc.windspeedKmph);
        const windDir = cc.winddir16Point;

        const useImperial = unitToggle.checked;

        const temp = useImperial? `${((tempC * 9) / 5 + 32).toFixed(1)}°F`
          : `${tempC}°C`;
        const feelsLike = useImperial? `${((feelsLikeC * 9) / 5 + 32).toFixed(1)}°F`
          : `${feelsLikeC}°C`;
        const windSpeed = useImperial? (windKmph * 0.621371).toFixed(1)
          : windKmph.toFixed(1);
        const windUnit = useImperial ? "mph" : "km/h";

        // Calculate wind arrow rotation
        const rotation = windDirDegrees[windDir] ?? 0;

        // Get icon name
        const iconName = getWeatherIcon(desc);

        output.innerHTML = `
        <div class="weather-header">
          <h3>Weather in ${area}</h3>
        </div>
        <p><strong>${desc}</strong></p>
          <span class="material-symbols-outlined weather-icon">${iconName}</span>
        <p>Temperature: ${temp}</p>
        <p>Feels like: ${feelsLike}</p>
        <p>Humidity: ${humidity}%</p>

        <div class="wind-container">
          <div class="wind-speed">${windSpeed} ${windUnit}</div>
          <svg class="wind-compass" viewBox="0 0 100 100" width="100" height="100" aria-label="Wind direction compass" role="img">
            <circle cx="50" cy="50" r="48" stroke="#666" stroke-width="2" fill="none"/>
            <text x="50" y="15" text-anchor="middle" font-size="12" fill="#666">N</text>
            <text x="85" y="55" text-anchor="middle" font-size="12" fill="#666">E</text>
            <text x="50" y="95" text-anchor="middle" font-size="12" fill="#666">S</text>
            <text x="15" y="55" text-anchor="middle" font-size="12" fill="#666">W</text>
            <line x1="50" y1="50" x2="50" y2="15" stroke="#d33" stroke-width="4" stroke-linecap="round" transform="rotate(${rotation}, 50, 50)"/>
            <circle cx="50" cy="50" r="5" fill="#d33"/>
          </svg>
        </div>
      `;
      } catch (err) {
        output.innerHTML = `<i>Could not load weather. Please try again.</i>`;
      }
    }

    button.addEventListener("click", () => {
      fetchWeather(input.value);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") fetchWeather(input.value);
    });

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

setInterval(updateClock, 1000);
updateClock(); // Call immediately to avoid delay

const versionLabel = document.getElementById("versionLabel");
const versionDetails = document.getElementById("versionDetails");

const updates = `
  <strong>v.Beta 1.5 Updates:</strong>
  <ul>
    <li> Added Weather tab
  </ul>
`;

versionLabel.addEventListener("click", () => {
  if (versionDetails.style.display === "none") {
    versionDetails.innerHTML = updates;
    versionDetails.style.display = "block";
  } else {
    versionDetails.style.display = "none";
  }
});

//Copyright 2025 by L. Smalley
