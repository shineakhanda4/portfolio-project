import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  company: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
  company: "",
  consent: false,
};

const projectTypes = [
  "Business website",
  "React / Next.js application",
  "Digital marketing",
  "SEO",
  "Linux / server infrastructure",
  "Something else",
];

const budgets = [
  "Not sure yet",
  "Under ৳20,000",
  "৳20,000–৳50,000",
  "৳50,000–৳1,00,000",
  "Above ৳1,00,000",
];

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.projectType) errors.projectType = "Please choose a project type.";
  if (form.message.trim().length < 20) {
    errors.message = "Please add at least 20 characters so the enquiry is useful.";
  }
  if (form.message.trim().length > 5000) {
    errors.message = "Please keep the message under 5,000 characters.";
  }
  if (!form.consent) errors.consent = "Please confirm that your details can be used to reply.";
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFeedback("");
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          projectType: form.projectType,
          budget: form.budget,
          message: form.message.trim(),
          company: form.company,
          consent: form.consent,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.message ||
            "The message could not be sent. Please try again or use the telephone number.",
        );
      }

      setStatus("success");
      setFeedback("Your message has been sent. Thank you for the enquiry.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again or use the telephone number.",
      );
    }
  }

  const inputClass = "form-field";

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Contact / Direct line"
          title={
            <>
              Tell me what you&rsquo;re trying to <span className="italic text-muted">build.</span>
            </>
          }
          intro={
            <p>
              Web development, digital marketing, technical SEO, or a Linux server that needs
              attention. Share the context and the next useful step. Call, email, or use the
              enquiry form.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <a
                href={SITE.phone.href}
                className="group flex items-start gap-3 transition-opacity hover:opacity-60"
              >
                <Phone size={16} strokeWidth={1.5} className="mt-1 text-muted" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted">Telephone</span>
                  <span className="mt-1 block font-serif text-2xl">{SITE.phone.display}</span>
                </span>
              </a>
              <a
                href={SITE.email.href}
                className="group mt-5 flex items-start gap-3 border-t border-line pt-4 transition-opacity hover:opacity-60"
              >
                <Mail size={16} strokeWidth={1.5} className="mt-1 text-muted" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted">Email</span>
                  <span className="mt-1 block break-all font-serif text-2xl">{SITE.email.display}</span>
                </span>
              </a>
              <div className="mt-5 flex items-start gap-3 border-t border-line pt-4">
                <MapPin size={16} strokeWidth={1.5} className="mt-1 text-muted" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted">Location</span>
                  <span className="mt-1 block text-sm">{SITE.location.display}</span>
                </span>
              </div>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">
                A short, useful <span className="italic">message.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted">
                Include what the business does, what needs to change, and any deadline or constraint
                that matters. If you are not sure what you need, say that too — a clear problem is
                more useful than a guessed solution.
              </p>

              <dl className="mt-8 border-t border-line">
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3 text-sm">
                  <dt className="text-muted">Company</dt>
                  <dd>Cave Technologies</dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3 text-sm">
                  <dt className="text-muted">Role</dt>
                  <dd>Founder &amp; CEO</dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3 text-sm">
                  <dt className="text-muted">Serving</dt>
                  <dd>Mymensingh, Bangladesh &amp; remote</dd>
                </div>
              </dl>

              <div className="mt-7">
                <p className="eyebrow text-muted">Profiles</p>
                <SocialLinks className="mt-3" />
              </div>

              <p className="mt-7 border-t border-line pt-4 text-[0.65rem] leading-5 text-muted">
                For privacy questions, email{" "}
                <a href={SITE.email.href} className="text-ink underline underline-offset-2">
                  {SITE.email.display}
                </a>{" "}
                or call {SITE.phone.display}.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border border-line bg-paper-light p-5 sm:p-7 md:p-9">
              <div className="flex items-start justify-between gap-5 border-b border-line pb-5">
                <div>
                  <p className="eyebrow text-muted">Project enquiry</p>
                  <h2 className="mt-3 font-serif text-3xl font-normal tracking-[-0.025em]">
                    Start a conversation
                  </h2>
                </div>
                <span className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">Required *</span>
              </div>

              {status === "success" ? (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 border border-ink bg-paper p-4 text-sm leading-6"
                >
                  <Check size={17} strokeWidth={1.6} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Message sent.</p>
                    <p className="mt-1 text-muted">{feedback}</p>
                  </div>
                </div>
              ) : null}

              {status === "error" ? (
                <div role="alert" className="mt-6 border border-ink bg-paper p-4 text-sm leading-6">
                  <p className="font-semibold">The message was not sent.</p>
                  <p className="mt-1 text-muted">{feedback}</p>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <a href={SITE.phone.href} className="link-underline inline-flex text-ink">
                      Call {SITE.phone.display}
                    </a>
                    <a href={SITE.email.href} className="link-underline inline-flex text-ink">
                      Email {SITE.email.display}
                    </a>
                  </div>
                </div>
              ) : null}

              <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow text-muted">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      className={`${inputClass} mt-2`}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      maxLength={100}
                      required
                    />
                    {errors.name ? (
                      <p id="name-error" className="mt-1.5 text-xs font-medium text-ink">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow text-muted">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      className={`${inputClass} mt-2`}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      maxLength={254}
                      required
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-1.5 text-xs font-medium text-ink">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="eyebrow text-muted">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className={`${inputClass} mt-2`}
                      maxLength={30}
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="eyebrow text-muted">
                      Project type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={(event) => update("projectType", event.target.value)}
                      className={`${inputClass} mt-2`}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? "projectType-error" : undefined}
                      required
                    >
                      <option value="">Select one</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType ? (
                      <p id="projectType-error" className="mt-1.5 text-xs font-medium text-ink">
                        {errors.projectType}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="eyebrow text-muted">
                    Budget range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(event) => update("budget", event.target.value)}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="">Prefer not to say</option>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="eyebrow text-muted">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    className={`${inputClass} mt-2 resize-y`}
                    placeholder="What are you trying to build, improve, or fix?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    maxLength={5000}
                    required
                  />
                  <div className="mt-1.5 flex justify-between gap-4 text-[0.65rem] text-muted">
                    {errors.message ? (
                      <p id="message-error" className="font-medium text-ink">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="message-hint">At least 20 characters. Please do not include passwords or secrets.</p>
                    )}
                    <span>{form.message.length}/5000</span>
                  </div>
                </div>

                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) => update("consent", event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      required
                    />
                    <span>
                      I agree that the details in this form may be used to respond to my enquiry, as
                      described in the{" "}
                      <Link to="/privacy" className="underline underline-offset-2 hover:text-ink">
                        privacy notice
                      </Link>
                      . *
                    </span>
                  </label>
                  {errors.consent ? (
                    <p id="consent-error" className="mt-1.5 text-xs font-medium text-ink">
                      {errors.consent}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[0.65rem] leading-5 text-muted">
                    This form is handled by a Hono API on Cloudflare Pages. If delivery is
                    unavailable, the form will show an error and email or phone remains available.
                  </p>
                  <button
                    type="submit"
                    className="button-primary shrink-0 disabled:cursor-wait disabled:opacity-60"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Send enquiry"}
                    <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
