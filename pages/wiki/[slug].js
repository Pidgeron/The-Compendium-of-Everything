// pages/wiki/[slug].js
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WikiArticlePage() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return; // wait for slug to be available

    const title = decodeURIComponent(slug.replace(/-/g, " "));

    // Ensure the wikiLoadArticle function exists
    if (typeof window.wikiLoadArticle === "function") {
      window.wikiLoadArticle(title);
    } else {
      console.error("wikiLoadArticle function is not defined on window.");
    }
  }, [slug]);

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "1rem" }}>
      <h1>Loading Wikipedia Article...</h1>
      <div id="contentDiv" style={{ width: "100%", maxWidth: "960px" }}></div>
      <div id="resultsDiv" style={{ display: "none" }}></div>
    </main>
  );
}
