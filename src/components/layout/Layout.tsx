import { Component, Suspense, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

type RouteBoundaryProps = {
  children: ReactNode;
};

type RouteBoundaryState = {
  failed: boolean;
};

class RouteErrorBoundary extends Component<RouteBoundaryProps, RouteBoundaryState> {
  state: RouteBoundaryState = { failed: false };

  static getDerivedStateFromError(): RouteBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("Route render failed", error);
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="container-editorial py-20">
          <p className="eyebrow text-muted">Something went wrong</p>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5.2rem)]">
            This page could not be loaded.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
            The rest of the site is still available. Reload the page or return to the homepage.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="button-primary" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a href="/" className="button-outline">
              Return home
            </a>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function RouteFallback() {
  return (
    <div className="container-editorial flex min-h-[55vh] items-center" role="status" aria-live="polite">
      <div>
        <p className="eyebrow text-muted">Loading page</p>
        <div className="mt-3 h-px w-24 overflow-hidden bg-line">
          <span className="block h-full w-1/2 animate-[loading-line_1s_ease-in-out_infinite] bg-ink" />
        </div>
        <span className="sr-only">Loading page content</span>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <RouteErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
