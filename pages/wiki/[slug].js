import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiSlugPage() {
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    // Wait for your main app functions to exist
    function tryLoad() {
      if (window.switchTab && window.wikiLoadArticle) {
        // Switch to the Wikipedia tab
        window.switchTab("wiki");

        // Convert slug to normal title
        const title = slug ? slug.replace(/-/g, " ") : "";
        if (title) {
          window.wikiLoadArticle(title);
        }
      } else {
        // Retry in 50ms if functions aren't ready yet
        setTimeout(tryLoad, 50);
      }
    }

    tryLoad();
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
