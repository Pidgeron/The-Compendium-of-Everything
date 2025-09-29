import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    // Decode slug into actual Wikipedia title
    const title = decodeURIComponent(slug.replace(/-/g, " "));

    // Ensure global functions exist
    if (typeof window.switchTab === "function" && typeof window.wikiLoadArticle === "function") {
      // Switch to the Wikipedia tab
      window.switchTab("wiki");

      // Load the article
      window.wikiLoadArticle(title);
    } else {
      console.error("Required functions not found on window: switchTab or wikiLoadArticle");
    }
  }, [slug]);

  return (
    <div id="app">
      <div className="results"></div>
      <div className="content">
        <p style={{ fontFamily: "sans-serif", padding: "1rem" }}>
          Loading Wikipedia Article...
        </p>
      </div>
      <div className="settings" style={{ display: "none" }}></div>
    </div>
  );
}
