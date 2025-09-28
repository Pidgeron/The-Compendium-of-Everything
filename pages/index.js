import { useEffect } from "react";

export default function Home() {
  // Load your main.js script from public/
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/main.js"; // public/ folder is root
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Render your HTML content
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <section id="compendium-home" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg-color,#fff);color:var(--text-color,#000);font-family:'Roboto',sans-serif;">

            <noscript>
              <main>
                <h1>The Compendium of Everything</h1>
                <p>
                  A multi-tool web app for quick access to Wikipedia, dictionary, thesaurus, weather, and more.<br>
                  <b>Features:</b>
                  <ul>
                    <li>Wikipedia search and articles</li>
                    <li>Dictionary definitions</li>
                    <li>Thesaurus synonyms and antonyms</li>
                    <li>Weather forecasts</li>
                    <li>Bookmarks and notepad</li>
                  </ul>
                  <b>Sources:</b>
                  <ul>
                    <li><a href="https://en.wikipedia.org/" target="_blank">Wikipedia</a></li>
                    <li><a href="https://api.dictionaryapi.dev/" target="_blank">Free Dictionary API</a></li>
                    <li><a href="https://api.datamuse.com/" target="_blank">Datamuse Thesaurus API</a></li>
                    <li><a href="https://open-meteo.com/" target="_blank">Open-Meteo Weather API</a></li>
                  </ul>
                  <p>This site requires JavaScript to function. For direct access, visit the sources above.</p>
              </main>
            </noscript>

            <div id="app"></div>
          </section>
        `,
      }}
    />
  );
}
