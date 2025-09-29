// pages/wiki/[slug].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query; // e.g., "Douglas-Adams"
  const [content, setContent] = useState("<p>Loading Wikipedia Article...</p>");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        const title = decodeURIComponent(slug.replace(/-/g, " "));
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodeURIComponent(
            title
          )}&prop=text`
        );

        const data = await res.json();
        if (!data.parse || !data.parse.text) {
          setError("Could not load article content.");
          return;
        }

        let html = data.parse.text["*"];

        // Minimal sanitisation & basic modifications
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Remove edit links
        doc.querySelectorAll(".mw-editsection").forEach((el) => el.remove());

        // Fix images
        doc.querySelectorAll("img").forEach((img) => {
          let src = img.getAttribute("src") || "";
          if (src.startsWith("//")) src = "https:" + src;
          else if (src.startsWith("/")) src = "https://en.wikipedia.org" + src;
          img.src = src;
        });

        setContent(doc.body.innerHTML);
      } catch (e) {
        console.error(e);
        setError("Error fetching article.");
      }
    }

    fetchArticle();
  }, [slug]);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      {error ? <p>{error}</p> : <div dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  );
}
