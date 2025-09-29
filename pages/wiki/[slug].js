import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;
    const title = decodeURIComponent(slug.replace(/-/g, " "));

    // Poll until the functions exist
    const interval = setInterval(() => {
      if (window.switchTab && window.wikiLoadArticle) {
        clearInterval(interval);
        window.switchTab("wiki");
        window.wikiLoadArticle(title);
      }
    }, 50);

    // Clean up
    return () => clearInterval(interval);
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
