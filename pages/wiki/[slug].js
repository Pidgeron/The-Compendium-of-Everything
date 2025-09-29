// pages/wiki/[slug].js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    // Wait until SPA functions exist
    const interval = setInterval(() => {
      if (
        typeof window.switchTab === "function" &&
        typeof window.wikiLoadArticle === "function" &&
        document.getElementById("app")
      ) {
        clearInterval(interval);

        // Switch to wiki tab
        window.switchTab("wiki");

        // Set search input to slug
        const searchInput = document.querySelector("#app input[type=text]");
        if (searchInput) {
          searchInput.value = decodeURIComponent(slug);
        }

        // Load the article
        window.wikiLoadArticle(decodeURIComponent(slug));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div id="wiki-slug-wrapper">
      {/* This mirrors your SPA's structure */}
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
