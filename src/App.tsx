import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SeoManager } from "@/components/seo/SeoManager";
import { getPageEntryForPath, PAGES } from "@/lib/pageRegistry";

const Home = PAGES.home.Component;
const About = PAGES.about.Component;
const Projects = PAGES.projects.Component;
const ProjectDetails = PAGES.projectDetails.Component;
const Skills = PAGES.skills.Component;
const Blog = PAGES.blog.Component;
const BlogPost = PAGES.blogPost.Component;
const BlogArchive = PAGES.blogArchive.Component;
const Services = PAGES.services.Component;
const ServiceDetail = PAGES.serviceDetails.Component;
const Contact = PAGES.contact.Component;
const Infrastructure = PAGES.infrastructure.Component;
const Privacy = PAGES.privacy.Component;
const NotFound = PAGES.notFound.Component;

function RoutePrefetcher() {
  useEffect(() => {
    const preloadFromEvent = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (/\.(xml|txt|webmanifest|png|jpe?g|webp|svg|ico)$/i.test(url.pathname)) return;

      void getPageEntryForPath(url.pathname).preload();
    };

    document.addEventListener("pointerover", preloadFromEvent, { passive: true });
    document.addEventListener("focusin", preloadFromEvent);
    return () => {
      document.removeEventListener("pointerover", preloadFromEvent);
      document.removeEventListener("focusin", preloadFromEvent);
    };
  }, []);

  return null;
}

export function App() {
  return (
    <>
      <SeoManager />
      <RoutePrefetcher />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetails />} />
          <Route path="skills" element={<Skills />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/categories/:slug" element={<BlogArchive />} />
          <Route path="blog/tags/:slug" element={<BlogArchive />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
