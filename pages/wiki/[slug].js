'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    function tryLoad() {
      if (typeof window === 'undefined') return;

      if (!window.switchTab || !window.wikiLoadArticle) {
        console.warn('WikiSlug: Waiting for required SPA functions...');
        setTimeout(tryLoad, 50);
        return;
      }

      window.switchTab('wiki');

      const title = slug ? decodeURIComponent(slug.replace(/-/g, ' ')) : '';
      const contentDiv = document.querySelector('#app .content');

      if (title) {
        window.wikiLoadArticle(title);
      } else if (contentDiv) {
        contentDiv.innerHTML = `<p style="font-family: sans-serif; padding: 1rem;">
          Welcome to the Wikipedia tab! Use the search box to find an article.
        </p>`;
      }
    }

    tryLoad();
  }, [slug]);

  return (
    <div id="wiki-slug-wrapper">
      <div id="app">
        <div className="results"></div>
        <div className="content">
          <p style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
            Loading Wikipedia Article...
          </p>
        </div>
        <div className="settings" style={{ display: 'none' }}></div>
      </div>
    </div>
  );
}
