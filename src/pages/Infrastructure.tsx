import { ArrowUpRight, HardDrive, LifeBuoy, Server, ShieldCheck, SquareTerminal, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";

const capabilities = [
  {
    icon: SquareTerminal,
    title: "Linux server setup",
    body: "Provisioning, users, SSH, firewalls, web servers, services, and the deployment foundation a site needs to run predictably.",
  },
  {
    icon: HardDrive,
    title: "Bare-metal setup",
    body: "Installing and configuring physical servers, storage, networking, and operating systems — with recovery access considered before changes.",
  },
  {
    icon: Server,
    title: "Administration",
    body: "Package updates, service management, backups, monitoring, certificates, and routine maintenance for Debian/Ubuntu and RHEL-family systems.",
  },
  {
    icon: ActivityIcon,
    title: "Troubleshooting",
    body: "A methodical approach to boot, disk, memory, networking, DNS, TLS, and service failures. Preserve access, gather evidence, then change one thing.",
  },
  {
    icon: LifeBuoy,
    title: "Recovery & rescue",
    body: "Reaching a failed machine through console or rescue mode, restoring access, and bringing services back without turning the incident into data loss.",
  },
  {
    icon: Wrench,
    title: "Configuration & maintenance",
    body: "Documenting the current state, reducing avoidable failure, and leaving the system more understandable than it was found.",
  },
];

function ActivityIcon(props: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={props.size ?? 22}
      height={props.size ?? 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

const layers = [
  ["01", "Browser", "The interface a customer sees."],
  ["02", "Web server", "Requests, routing, TLS, caching."],
  ["03", "Application", "Business logic and integrations."],
  ["04", "Data", "Persistent state and backups."],
  ["05", "Linux", "Services, storage, network, users."],
  ["06", "Hardware", "The physical or virtual machine."],
];

export function Infrastructure() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Infrastructure" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Systems / Linux & bare metal"
          title={
            <>
              The website is only the <span className="italic text-muted">top layer.</span>
            </>
          }
          intro={
            <p>
              Linux server administration, bare-metal infrastructure, troubleshooting, and recovery.
              This is the practical systems work that keeps a digital product reachable when the
              interface is no longer the only thing that needs attention.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">Environment</p>
              <ul className="mt-4 space-y-2">
                {["Debian", "Ubuntu", "AlmaLinux", "CentOS", "Red Hat Enterprise Linux", "RHEL-based systems"].map(
                  (distribution) => (
                    <li
                      key={distribution}
                      className="flex items-center justify-between border-b border-line pb-2 text-xs"
                    >
                      <span>{distribution}</span>
                      <span className="text-[0.58rem] uppercase tracking-[0.12em] text-muted">Linux</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-4 text-[0.65rem] leading-5 text-muted">
                The operating systems are listed because they are part of the working practice — not
                as a certification claim.
              </p>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">01 / The interest</p>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-5 font-serif text-[clamp(1.18rem,1.8vw,1.42rem)] font-normal leading-[1.72] text-ink-soft">
              <p>
                Web development is my profession. System administration is my passion. The two are
                not separate hobbies for me; they are different views of the same promise that a
                digital service will be there when someone needs it.
              </p>
              <p>
                I enjoy the physicality of bare-metal work: installing an operating system, checking
                storage and network configuration, bringing services up in the right order, and
                understanding what the machine is actually doing. I also enjoy the detective work of
                a failure — reading logs, checking the layers, and finding the difference between a
                symptom and a cause.
              </p>
              <p>
                I have experience rescuing and recovering Linux servers. That work has taught me to
                respect access, backups, and reversibility. The best recovery is the one that does
                not destroy the evidence needed to prevent the next failure.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="border border-line bg-paper-light p-5">
              <ShieldCheck size={22} strokeWidth={1.4} className="text-ink" aria-hidden="true" />
              <p className="mt-5 font-serif text-xl leading-snug">
                No invented uptime figures. No fictional infrastructure clients.
              </p>
              <p className="mt-3 text-xs leading-6 text-muted">
                Public case-study detail is limited to what is genuinely verified. Client server
                names, specifications, and private operational data do not belong on a portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light py-14 md:py-20">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-muted">02 / Capabilities</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.8rem)]">
                Practical work, not a <span className="italic">logo wall.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted md:col-span-4">
              The scope of an infrastructure engagement is agreed around the actual system, access
              available, backup status, and recovery path.
            </p>
          </div>

          <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article
                  key={capability.title}
                  className="group min-h-[13rem] border-b border-r border-line p-6 transition-colors hover:bg-paper md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={22} strokeWidth={1.4} className="text-ink" aria-hidden="true" />
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.2}
                      className="text-line transition-colors group-hover:text-muted"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-normal tracking-[-0.02em]">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-muted">{capability.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">03 / The stack beneath the stack</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,4.4rem)]">
              Think in <span className="italic">layers.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              When something is unreachable, the useful question is which layer has actually failed.
              A browser error, a DNS problem, an expired certificate, a dead service, and a full disk
              can all look similar to the person waiting for the page.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-line">
              {layers.map(([number, title, body]) => (
                <li key={number} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[4rem_1fr_1.2fr]">
                  <span className="eyebrow text-muted">{number}</span>
                  <span className="text-sm font-semibold">{title}</span>
                  <span className="col-start-2 text-xs leading-5 text-muted sm:col-start-3">{body}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-6 text-muted">
              The discipline is to test the layer that is actually failing, with the least disruptive
              command that can confirm or reject a theory.
            </p>
          </div>
        </div>
      </section>

      <section className="dark-texture bg-charcoal py-16 text-paper md:py-24">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-paper/60">04 / Working approach</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,5.4vw,5rem)]">
              Calm beats <span className="italic text-paper/65">clever.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-5 text-sm leading-7 text-paper/60">
              <p>
                Before a risky change, I want to know how to get back in. Before a reboot, I want to
                know whether the machine will come back. Before deleting anything, I want to know
                what depends on it.
              </p>
              <p>
                That may sound slow during an incident, but it is usually faster than creating a
                second failure while trying to fix the first. The process is simple: establish
                access, record the state, check the evidence, protect what still works, make the
                smallest useful change, verify the result, and document what happened.
              </p>
              <p>
                This is also why I care about backups that have been restored, monitoring that can
                actually alert someone, and configuration that another person can understand.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services/linux-infrastructure" variant="inverse">
                Infrastructure services
              </ButtonLink>
              <Link
                to="/contact"
                className="inline-flex min-h-[3rem] items-center gap-2 border border-line-dark px-4 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-paper/65 transition-colors hover:border-paper hover:text-paper"
              >
                Discuss a server issue
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">Selected reading</p>
            <h2 className="display mt-4 text-[clamp(2.3rem,4.5vw,4rem)]">
              Learn how I <span className="italic">approach it.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              <Link
                to="/blog/linux-server-troubleshooting"
                className="group flex items-start justify-between gap-5 border-b border-line py-5"
              >
                <span>
                  <span className="eyebrow text-muted">Linux &amp; System Administration</span>
                  <span className="mt-2 block font-serif text-2xl leading-tight transition-opacity group-hover:opacity-55">
                    Linux Server Troubleshooting: A Practical Introduction
                  </span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.3} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
              </Link>
              <Link
                to="/blog/bare-metal-vs-vps"
                className="group flex items-start justify-between gap-5 border-b border-line py-5"
              >
                <span>
                  <span className="eyebrow text-muted">Bare-Metal Infrastructure</span>
                  <span className="mt-2 block font-serif text-2xl leading-tight transition-opacity group-hover:opacity-55">
                    Bare-Metal Servers vs VPS Hosting
                  </span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.3} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
