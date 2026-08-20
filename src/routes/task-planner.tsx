import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Download, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AiDisclaimer, AppShell, PageHeader } from "@/components/AppShell";
import { Editable } from "@/components/Editable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { planTasks, type PlanResult } from "@/lib/ai.functions";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Describe your goals and get a prioritized task list plus a daily or weekly time-blocked schedule.",
      },
      { property: "og:title", content: "AI Task Planner — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Prioritized tasks and a time-blocked schedule, editable and exportable to PDF.",
      },
    ],
  }),
  component: TaskPlannerPage,
});

type ScheduleType = "Daily" | "Weekly";

const DOT: Record<string, string> = { High: "🔴", Medium: "🟡", Low: "🟢" };
const PRIORITY_CLASS: Record<string, string> = {
  High: "border-priority-high/40 bg-priority-high/10 text-priority-high",
  Medium: "border-priority-medium/40 bg-priority-medium/10 text-priority-medium",
  Low: "border-priority-low/40 bg-priority-low/10 text-priority-low",
};

function TaskPlannerPage() {
  const [goals, setGoals] = useState("");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("Daily");
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const run = useServerFn(planTasks);

  const mutation = useMutation({
    mutationFn: (input: { goals: string; scheduleType: ScheduleType }) => run({ data: input }),
    onSuccess: setPlan,
    onError: (e: Error) => toast.error(e.message || "Could not build a schedule."),
  });

  const submit = () => {
    if (goals.trim().length < 3) {
      toast.error("Describe the tasks or goals you want planned.");
      return;
    }
    mutation.mutate({ goals, scheduleType });
  };

  const downloadPdf = async () => {
    if (!plan) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    const width = doc.internal.pageSize.getWidth() - margin * 2;
    let y = margin;

    const line = (text: string, size = 11, bold = false, gap = 16) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      for (const row of doc.splitTextToSize(text, width)) {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(row, margin, y);
        y += gap;
      }
    };

    line(`${scheduleType} Plan`, 20, true, 26);
    line("Prioritized Task List", 14, true, 22);
    plan.tasks.forEach((t) =>
      line(`[${t.priority}] ${t.title}${t.note ? ` — ${t.note}` : ""}`, 11, false, 16),
    );
    y += 10;
    line("Suggested Schedule", 14, true, 22);
    plan.schedule.forEach((b) => {
      line(b.label, 12, true, 18);
      b.items.forEach((i) => line(`- ${i}`, 11, false, 16));
      y += 6;
    });
    y += 10;
    line("AI-generated content may contain errors. Please verify before use.", 9, false, 12);
    doc.save(`${scheduleType.toLowerCase()}-plan.pdf`);
  };

  const patchTask = (index: number, title: string) =>
    setPlan((p) =>
      p ? { ...p, tasks: p.tasks.map((t, i) => (i === index ? { ...t, title } : t)) } : p,
    );

  return (
    <AppShell>
      <PageHeader
        title="AI Task Planner"
        description="Get a prioritized task list and a realistic schedule you can edit and export."
      />

      <section className="card-surface p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="goals">Your tasks or goals</Label>
            <Input
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Finish project report, prepare presentation, respond to client emails, schedule team meeting"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="schedule-type">Schedule type</Label>
            <Select value={scheduleType} onValueChange={(v) => setScheduleType(v as ScheduleType)}>
              <SelectTrigger id="schedule-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-6" onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {mutation.isPending ? "Planning…" : "Generate Schedule"}
        </Button>
      </section>

      {mutation.isPending && !plan && (
        <section className="card-surface mt-6 space-y-3 p-5 sm:p-7">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-11/12" />
          <Skeleton className="h-10 w-3/4" />
        </section>
      )}

      {plan && (
        <section className="card-surface mt-6 p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-lg font-semibold">{scheduleType} plan</h2>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" onClick={downloadPdf}>
                <Download className="h-4 w-4" />
                Download as PDF
              </Button>
              <Button variant="secondary" size="sm" disabled={mutation.isPending} onClick={submit}>
                <RefreshCw className={mutation.isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                Regenerate
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-7">
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-navy uppercase">
                Prioritized Task List
              </h3>
              <ul className="space-y-2">
                {plan.tasks.map((task, i) => (
                  <li
                    key={i}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border p-3 ${
                      PRIORITY_CLASS[task.priority] ?? PRIORITY_CLASS["Medium"]
                    }`}
                  >
                    <div className="min-w-0">
                      <Editable
                        value={task.title}
                        onChange={(title) => patchTask(i, title)}
                        className="text-sm font-medium text-foreground"
                      />
                      {task.note && (
                        <Editable
                          value={task.note}
                          onChange={(note) =>
                            setPlan((p) =>
                              p
                                ? {
                                    ...p,
                                    tasks: p.tasks.map((t, j) => (j === i ? { ...t, note } : t)),
                                  }
                                : p,
                            )
                          }
                          className="text-xs text-muted-foreground"
                        />
                      )}
                    </div>
                    <span className="shrink-0 rounded-full border border-current/30 px-2.5 py-1 text-xs font-semibold">
                      {DOT[task.priority] ?? "🟡"} {task.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-navy uppercase">
                Suggested Schedule
              </h3>
              <div className="space-y-4">
                {plan.schedule.map((block, bi) => (
                  <div key={bi} className="rounded-lg border border-border bg-muted/40 p-3">
                    <Editable
                      value={block.label}
                      onChange={(label) =>
                        setPlan((p) =>
                          p
                            ? {
                                ...p,
                                schedule: p.schedule.map((b, j) =>
                                  j === bi ? { ...b, label } : b,
                                ),
                              }
                            : p,
                        )
                      }
                      className="text-sm font-semibold text-navy"
                    />
                    <ul className="mt-1 space-y-1">
                      {block.items.map((item, ii) => (
                        <li key={ii} className="flex gap-2 text-sm">
                          <span aria-hidden className="mt-1 shrink-0 text-muted-foreground">
                            •
                          </span>
                          <Editable
                            value={item}
                            onChange={(next) =>
                              setPlan((p) =>
                                p
                                  ? {
                                      ...p,
                                      schedule: p.schedule.map((b, j) =>
                                        j === bi
                                          ? {
                                              ...b,
                                              items: b.items.map((v, k) => (k === ii ? next : v)),
                                            }
                                          : b,
                                      ),
                                    }
                                  : p,
                              )
                            }
                            className="min-w-0 flex-1"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <AiDisclaimer />
    </AppShell>
  );
}
