import { createElement, type ComponentType } from "react";

type PageModule = Record<string, unknown>;

export type PageEntry = {
  Component: ComponentType;
  preload: () => Promise<void>;
};

function lazyPage(
  name: string,
  exportName: string,
  loader: () => Promise<PageModule>,
): PageEntry {
  let Loaded: ComponentType | null = null;
  let loading: Promise<void> | null = null;

  const preload = (): Promise<void> => {
    if (Loaded) return Promise.resolve();
    if (!loading) {
      loading = loader()
        .then((module) => {
          const component = module[exportName] ?? module.default;
          if (typeof component !== "function") {
            throw new Error(`Could not find the ${exportName} page export.`);
          }
          Loaded = component as ComponentType;
        })
        .catch((error: unknown) => {
          loading = null;
          throw error;
        });
    }
    return loading;
  };

  function AsyncPage() {
    if (!Loaded) {
      void preload();
      throw loading;
    }
    return createElement(Loaded);
  }

  AsyncPage.displayName = `Async${name}`;

  return { Component: AsyncPage, preload };
}

export const PAGES = {
  home: lazyPage("Home", "Home", () => import("@/pages/Home")),
  about: lazyPage("About", "About", () => import("@/pages/About")),
  projects: lazyPage("Projects", "Projects", () => import("@/pages/Projects")),
  projectDetails: lazyPage("ProjectDetails", "ProjectDetails", () => import("@/pages/ProjectDetails")),
  skills: lazyPage("Skills", "Skills", () => import("@/pages/Skills")),
  services: lazyPage("Services", "Services", () => import("@/pages/Services")),
  serviceDetails: lazyPage("ServiceDetail", "ServiceDetail", () => import("@/pages/ServiceDetail")),
  blog: lazyPage("Blog", "Blog", () => import("@/pages/Blog")),
  blogPost: lazyPage("BlogPost", "BlogPost", () => import("@/pages/BlogPost")),
  blogArchive: lazyPage("BlogArchive", "BlogArchive", () => import("@/pages/BlogArchive")),
  contact: lazyPage("Contact", "Contact", () => import("@/pages/Contact")),
  infrastructure: lazyPage("Infrastructure", "Infrastructure", () => import("@/pages/Infrastructure")),
  privacy: lazyPage("Privacy", "Privacy", () => import("@/pages/Privacy")),
  notFound: lazyPage("NotFound", "NotFound", () => import("@/pages/NotFound")),
} as const;

function normalisePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function getPageEntryForPath(pathname: string): PageEntry {
  const path = normalisePath(pathname);

  if (path === "/") return PAGES.home;
  if (path === "/about") return PAGES.about;
  if (path === "/projects") return PAGES.projects;
  if (/^\/projects\/[^/]+$/.test(path)) return PAGES.projectDetails;
  if (path === "/skills") return PAGES.skills;
  if (path === "/services") return PAGES.services;
  if (/^\/services\/[^/]+$/.test(path)) return PAGES.serviceDetails;
  if (path === "/blog") return PAGES.blog;
  if (/^\/blog\/categories\/[^/]+$/.test(path)) return PAGES.blogArchive;
  if (/^\/blog\/tags\/[^/]+$/.test(path)) return PAGES.blogArchive;
  if (/^\/blog\/[^/]+$/.test(path)) return PAGES.blogPost;
  if (path === "/contact") return PAGES.contact;
  if (path === "/infrastructure") return PAGES.infrastructure;
  if (path === "/privacy") return PAGES.privacy;
  return PAGES.notFound;
}

export function preloadPageForPath(pathname: string): Promise<void> {
  return getPageEntryForPath(pathname).preload();
}

export function preloadAllPages(): Promise<void[]> {
  return Promise.all(Object.values(PAGES).map((page) => page.preload()));
}
