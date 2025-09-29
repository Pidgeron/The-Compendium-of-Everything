// pages/wiki/[slug].js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    async function wikiLoadArticleFromSlug(title) {
      const contentDiv = document.getElementById("wiki-content");
      const resultsDiv = document.querySelector("#app .results");

      if (!contentDiv || !resultsDiv) {
        console.warn("WikiSlug: Could not find required functions or #app element.");
        return;
      }

      resultsDiv.innerHTML = "";
      contentDiv.innerHTML = "Loading Wikipedia Article...";

      try {
        // Fetch article HTML from Wikipedia
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodeURIComponent(
            title
          )}&prop=text`
        );
        const data = await res.json();
        let html = data?.parse?.text?.["*"] || "<i>Could not load content.</i>";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Remove edit sections
        doc.querySelectorAll(".mw-editsection").forEach((el) => el.remove());

        // Fix images
        doc.querySelectorAll("img").forEach((img) => {
          let src = img.getAttribute("src") || img.getAttribute("data-src") || "";
          if (!src) return;
          if (src.startsWith("//")) src = "https:" + src;
          else if (src.startsWith("/")) src = "https://en.wikipedia.org" + src;

          // Remove thumbnail cropping for non-SVGs
          const thumbMatch = src.match(/^(.*)\/thumb\/(.*?\/.*?)(?:\/[^\/]+)?$/);
          if (thumbMatch && !src.endsWith(".svg")) {
            src = `${thumbMatch[1]}/${thumbMatch[2]}`;
          }

          img.src = src;
          img.style.maxWidth = "100%";
          img.style.borderRadius = "12px";
          img.removeAttribute("srcset");
          img.onerror = function () {
            this.style.display = "none";
          };
        });

        // Remove links that wrap images
        doc.querySelectorAll("a > img").forEach((img) => {
          const a = img.parentElement;
          if (a && a.tagName === "A") a.replaceWith(img);
        });

        // Insert HTML into SPA content
        contentDiv.innerHTML = doc.body.innerHTML;

        // Call SPA helper if available to initialize popups, TOC, buttons
        if (window.initContentPopupsAndLinks) {
          window.initContentPopupsAndLinks();
        }

        // Update URL
        if (typeof window !== "undefined") {
          const param = encodeURIComponent(title.trim().replace(/ /g, "-"));
          const newUrl = `/wiki/${param}`;
          window.history.replaceState({}, "", newUrl);
        }
      } catch (e) {
        contentDiv.innerHTML = `Error fetching content: ${e.message || e}`;
      }
    }

    if (slug) {
      const title = decodeURIComponent(slug.replace(/-/g, " "));
      wikiLoadArticleFromSlug(title);
    }
  }, [slug]);

  return (
    <div id="wiki-slug-wrapper">
      <div id="app">
        <div className="results"></div>
        <div
          className="content"
          id="wiki-content"
          style={{ padding: "1rem", fontFamily: "var(--text-font,'Roboto'),sans-serif" }}
        >
          <p>Loading Wikipedia Article...</p>
        </div>
        <div className="settings" style={{ display: "none" }}></div>
      </div>
    </div>
  );
}
