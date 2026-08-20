import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, LayoutDashboard, Mail, FileText, CalendarCheck, Sparkles } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Smart Email Generator", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: FileText },
  { to: "/task-planner", label: "AI Task Planner", icon: CalendarCheck },
] as const;

function NavLinks({ onNavigate, iconsOnly }: { onNavigate?: () => void; iconsOnly?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            title={label}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active &&
                "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
              iconsOnly && "justify-center px-0",
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {!iconsOnly && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ iconsOnly }: { iconsOnly?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5",
        iconsOnly && "justify-center px-0",
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Sparkles className="h-[18px] w-[18px]" />
      </span>
      {!iconsOnly && (
        <span className="min-w-0 text-sm leading-tight font-semibold text-sidebar-foreground">
          AI Workplace
          <span className="block text-xs font-normal text-sidebar-foreground/60">
            Productivity Assistant
          </span>
        </span>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar (240px) + tablet icon rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[72px] flex-col bg-sidebar md:flex lg:w-[240px]">
        <div className="lg:hidden">
          <Brand iconsOnly />
        </div>
        <div className="hidden lg:block">
          <Brand />
        </div>
        <div className="mt-4 lg:hidden">
          <NavLinks iconsOnly />
        </div>
        <div className="mt-4 hidden lg:block">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-4 py-3 md:hidden">
        <span className="truncate text-sm font-semibold">AI Workplace Assistant</span>
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border transition-colors hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy/60"
          />
          <div className="absolute inset-y-0 left-0 flex w-[260px] flex-col bg-sidebar shadow-xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
              <Brand />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="mr-3 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <main className="md:ml-[72px] lg:ml-[240px]">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-6 sm:mb-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
    </header>
  );
}

export function AiDisclaimer() {
  return (
    <p className="mt-8 rounded-lg border border-border bg-muted px-4 py-3 text-xs text-muted-foreground sm:text-sm">
      ⚠️ AI-generated content may contain errors. Please verify important information before use.
    </p>
  );
}
