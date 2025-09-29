import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query; // e.g. "Douglas-Adams"

  useEffect(() => {
    if (!slug) return;

    const articleTitle = decodeURIComponent(slug).replace(/-/g, " ");

    let intervalId = null;
    let attempts = 0;

    function tryLoadArticle() {
      attempts++;
      const appExists = document.getElementById("app");
      const switchTabExists = typeof window.switchTab === "function";
      const wikiLoadExists = typeof window.wikiLoadArticle === "function";

      if (appExists && switchTabExists && wikiLoadExists) {
        // Clear the interval
        clearInterval(intervalId);

        // Switch to wiki tab
        window.switchTab("wiki");

        // Load the article
        window.wikiLoadArticle(articleTitle);
      } else if (attempts > 50) {
        // Stop trying after ~5 seconds (50 * 100ms)
        clearInterval(intervalId);
        console.warn(
          "WikiSlug: Could not find required functions or #app element."
        );
      }
    }

    // Retry every 100ms until app and functions exist
    intervalId = setInterval(tryLoadArticle, 100);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [slug]);

  return (
    <div id="wiki-slug-container" style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <p>Loading Wikipedia Article...</p>
    </div>
  );
}
