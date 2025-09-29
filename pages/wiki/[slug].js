import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure this only runs in the browser
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !slug) return;

    // Retry until your functions and app element exist
    const interval = setInterval(() => {
      if (
        typeof window.switchTab === "function" &&
        typeof window.wikiLoadArticle === "function" &&
        document.getElementById("app")
      ) {
        clearInterval(interval);

        // Switch to the Wikipedia tab
        window.switchTab("wiki");

        // Decode slug back to normal title
        const title = decodeURIComponent(slug).replace(/-/g, " ");

        // Load the article
        window.wikiLoadArticle(title);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [mounted, slug]);

  return (
    <div id="wiki-slug-wrapper">
      <div id="app">
        <div className="results"></div>
        <div className="content">
          <p style={{ fontFamily: "sans-serif", padding: "1rem" }}>
            Loading Wikipedia Article...
          </p>
        </div>
        <div className="settings" style={{ display: "none" }}></div>
      </div>
    </div>
  );
}
