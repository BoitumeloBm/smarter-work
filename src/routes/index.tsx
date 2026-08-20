import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, FileText, Mail } from "lucide-react";
import { AiDisclaimer, AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "One workspace to draft emails, summarize meetings and plan your day with AI assistance.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Draft emails, summarize meeting notes and plan tasks — all in one AI workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email-generator",
    label: "Smart Email Generator",
    icon: Mail,
    copy: "Describe the message, choose a tone, and get a polished email you can edit and copy.",
  },
  {
    to: "/meeting-summarizer",
    label: "Meeting Summarizer",
    icon: FileText,
    copy: "Paste notes or a transcript to get a summary, action items, decisions and deadlines.",
  },
  {
    to: "/task-planner",
    label: "AI Task Planner",
    icon: CalendarCheck,
    copy: "Turn a list of goals into prioritized tasks and a daily or weekly time-blocked plan.",
  },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <section className="card-surface overflow-hidden p-6 sm:p-9">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">
          AI Workplace Productivity Assistant
        </p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-4xl">
          Welcome back — let's clear your busywork
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Three assistants in one workspace: write better emails, turn meetings into clear
          follow-ups, and plan your time with realistic schedules. Every output is editable inline.
        </p>
      </section>

      <h2 className="mt-8 mb-4 text-lg font-semibold">Your tools</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ to, label, icon: Icon, copy }) => (
          <Link
            key={to}
            to={to}
            className="card-surface card-interactive group flex flex-col p-5 sm:p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{label}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{copy}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
