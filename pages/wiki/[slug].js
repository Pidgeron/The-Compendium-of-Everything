// pages/wiki/[slug].js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WikiArticle() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const title = decodeURIComponent(slug.replace(/-/g, " "));
    if (typeof window !== "undefined" && window.wikiLoadArticle) {
      window.wikiLoadArticle(title);
    }
  }, [slug]);

  return (
    <div id="app">
      <noscript>
        <main>
          <h1>The Compendium of Everything</h1>
          <p>
            A multi-tool web app for quick access to Wikipedia, dictionary, thesaurus, weather, and more.
          </p>
          <p>This site requires JavaScript to function. For direct access, visit Wikipedia.</p>
        </main>
      </noscript>
    </div>
  );
}

// Optional: prerender a few popular pages at build time
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "Douglas-Adams" } },
      { params: { slug: "JavaScript" } },
      { params: { slug: "Node.js" } },
    ],
    fallback: true, // true enables on-demand generation
  };
}

// Optional: pre-fetch some data or just pass slug
export async function getStaticProps({ params }) {
  return {
    props: { slug: params.slug },
  };
}
