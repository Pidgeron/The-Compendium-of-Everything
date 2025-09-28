import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load your main.js script dynamically
    const script = document.createElement('script');
    script.src = '/main.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>The Compendium of Everything</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A minimalist multi-tool app for fast access to knowledge all in one place." />
        <link rel="icon" type="image/png" href="https://cdn.compendiumofeverything.org/images/Compendium_Logo.png" />
        <style>{`
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden; /* Prevents unwanted scrollbars */
          }
        `}</style>
      </Head>

      <noscript>
        <main>
          <h1>The Compendium of Everything</h1>
          <p>
            A multi-tool web app for quick access to Wikipedia, dictionary, thesaurus, weather, and more.<br/>
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
    </>
  );
}
