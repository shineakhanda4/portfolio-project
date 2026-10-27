import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function SeoManager() {
  const location = useLocation();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (import.meta.env.SSR) return;

    let cancelled = false;

    void Promise.all([import("@/lib/seo"), import("@/lib/head")])
      .then(([seo, head]) => {
        if (!cancelled) {
          head.applyManagedHead(seo.getPageSeo(location.pathname));
        }
      })
      .catch((error: unknown) => {
        console.error("Could not update page metadata", error);
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return null;
}
