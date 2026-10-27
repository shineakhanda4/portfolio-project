import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, meta, aside }: PageHeaderProps) {
  return (
    <header className="border-b border-line pb-10 pt-14 md:pb-16 md:pt-20">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end">
        <div className={meta ? "md:col-span-8" : "md:col-span-10"}>
          <h1 className="display max-w-5xl text-[clamp(3.1rem,8vw,7.8rem)]">{title}</h1>
          {intro ? (
            <div className="mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
              {intro}
            </div>
          ) : null}
        </div>
        {meta || aside ? (
          <div className="md:col-span-4">
            {meta}
            {aside}
          </div>
        ) : null}
      </div>
    </header>
  );
}
