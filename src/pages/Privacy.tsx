import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

export function Privacy() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Legal / Privacy"
          title={
            <>
              Privacy, in <span className="italic text-muted">plain language.</span>
            </>
          }
          intro={
            <p>
              This notice explains what this portfolio collects, why it collects it, and the choices
              available. It is intentionally short because the site is intentionally simple.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4 text-xs leading-6">
              <p className="eyebrow text-muted">Effective</p>
              <p className="mt-2">27 October 2026</p>
              <p className="mt-1 text-muted">Applies to shineakhanda.dev</p>
            </div>
          }
        />
      </div>

      <article className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="eyebrow text-muted">Contents</p>
            <ul className="mt-4 space-y-2 border-l border-line pl-4 text-sm text-muted">
              <li><a href="#information" className="hover:text-ink">Information collected</a></li>
              <li><a href="#use" className="hover:text-ink">How it is used</a></li>
              <li><a href="#hosting" className="hover:text-ink">Hosting and services</a></li>
              <li><a href="#cookies" className="hover:text-ink">Cookies and analytics</a></li>
              <li><a href="#links" className="hover:text-ink">External links</a></li>
              <li><a href="#choices" className="hover:text-ink">Your choices</a></li>
            </ul>
          </aside>

          <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
            <section id="information" className="scroll-mt-28">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">Information collected</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  If you submit the contact form, the site asks for your name, email address, optional
                  telephone number, project type, optional budget range, and message. It also checks
                  a consent box and uses a hidden anti-spam field.
                </p>
                <p>
                  The form is intended for project enquiries. Please do not send passwords, private
                  server credentials, financial account details, or other sensitive information
                  through the form.
                </p>
              </div>
            </section>

            <section id="use" className="mt-12 scroll-mt-28 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">How it is used</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  The information is used to respond to your enquiry and understand the project
                  context. It is not sold, and it is not used to build an advertising profile.
                </p>
                <p>
                  If a delivery provider is configured, the message is processed by that provider for
                  the purpose of sending the enquiry to Shine Akhanda. Without that configuration,
                  the form returns an error rather than falsely claiming that a message was sent.
                </p>
                <p>
                  Enquiry information is retained only as long as needed for the conversation,
                  business records, or legal obligations. There is no automated marketing list.
                </p>
              </div>
            </section>

            <section id="hosting" className="mt-12 scroll-mt-28 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">Hosting and services</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  The production site is designed for Cloudflare Pages. Cloudflare and its underlying
                  infrastructure may process technical request data — such as IP address, user agent,
                  requested URL, and timestamps — to deliver the site, protect it from abuse, and
                  maintain service reliability.
                </p>
                <p>
                  If a contact-delivery provider is enabled, the information you submit is transmitted
                  to that provider so the message can be delivered. Provider details and retention
                  terms depend on the configured service.
                </p>
              </div>
            </section>

            <section id="cookies" className="mt-12 scroll-mt-28 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">Cookies and analytics</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  This site does not include advertising cookies or a third-party analytics script in
                  its current configuration. It does not set cookies for the contact form.
                </p>
                <p>
                  If analytics or other optional measurement is introduced later, this notice should
                  be updated and consent should be handled where required.
                </p>
              </div>
            </section>

            <section id="links" className="mt-12 scroll-mt-28 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">External links</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  This site links to project websites, social profiles, GitHub, and other external
                  destinations. Those sites have their own privacy practices and content policies.
                  Opening an external link leaves this website.
                </p>
                <p>
                  Project screenshots are used for portfolio reference and remain the property of
                  their respective owners.
                </p>
              </div>
            </section>

            <section id="choices" className="mt-12 scroll-mt-28 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-normal tracking-[-0.025em]">Your choices</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  You can ask what enquiry information is held about you, request a correction, or ask
                  for deletion where there is no overriding legal or operational reason to retain it.
                  Email{" "}
                  <a href={SITE.email.href} className="text-ink underline underline-offset-2">
                    {SITE.email.display}
                  </a>{" "}
                  or use the contact form to make the request.
                </p>
                <p>
                  If you do not want to submit a form, you can call{" "}
                  <a href={SITE.phone.href} className="text-ink underline underline-offset-2">
                    {SITE.phone.display}
                  </a>{" "}
                  or email{" "}
                  <a href={SITE.email.href} className="text-ink underline underline-offset-2">
                    {SITE.email.display}
                  </a>
                  .
                </p>
              </div>
            </section>

            <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
              <p>
                Return to the{" "}
                <Link to="/contact" className="text-ink underline underline-offset-2">
                  contact page
                </Link>{" "}
                if you have a question about this notice.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
