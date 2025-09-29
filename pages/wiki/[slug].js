'use client'; // Disable SSR/prerendering

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WikiSlug() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Only run once the SPA functions are ready
    function tryLoad() {
      if (typeof window === 'undefined') return;
      if (!window.switchTab || !window.wikiLoadArticle) {
        console.warn('WikiSlug: Waiting for required SPA functions...');
        setTimeout(tryLoad, 50);
        return;
      }

      const title = slug ? decodeURIComponent(slug.replace(/-/g, ' ')) : '';
      if (!title) return;

      // Switch to wiki tab and load article
      window.switchTab('wiki');
      window.wikiLoadArticle(title);
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
