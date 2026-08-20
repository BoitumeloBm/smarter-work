import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AiDisclaimer, AppShell, PageHeader } from "@/components/AppShell";
import { Editable } from "@/components/Editable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes, type SummaryResult } from "@/lib/ai.functions";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get an editable summary with action items, decisions and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Turn messy transcripts into structured summaries, action items and deadlines.",
      },
    ],
  }),
  component: SummarizerPage,
});

const PLACEHOLDER =
  "Team discussed Q4 marketing strategy. John presented the budget. We decided to launch in October. Sarah needs to finalize the design by Friday. Action items: John to update budget, Sarah to finalize design, Mike to prepare social media plan.";

function EditableList({
  items,
  onChange,
  bullet,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  bullet: string;
}) {
  if (items.length === 0) return <p className="px-2 text-sm text-muted-foreground">None noted.</p>;
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span aria-hidden className="mt-1 shrink-0 text-muted-foreground">
            {bullet}
          </span>
          <Editable
            value={item}
            onChange={(next) => onChange(items.map((v, j) => (j === i ? next : v)))}
            className="min-w-0 flex-1 leading-relaxed"
          />
        </li>
      ))}
    </ul>
  );
}

function SummarizerPage() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const run = useServerFn(summarizeNotes);

  const mutation = useMutation({
    mutationFn: (input: { notes: string }) => run({ data: input }),
    onSuccess: setResult,
    onError: (e: Error) => toast.error(e.message || "Could not summarize these notes."),
  });

  const submit = () => {
    if (notes.trim().length < 10) {
      toast.error("Paste a few lines of meeting notes first.");
      return;
    }
    mutation.mutate({ notes });
  };

  const copyAll = () => {
    if (!result) return;
    const block = (title: string, list: string[]) =>
      `${title}:\n${list.length ? list.map((i) => `• ${i}`).join("\n") : "• None noted."}`;
    navigator.clipboard.writeText(
      [
        `Summary:\n${result.summary}`,
        block("Action Items", result.actionItems),
        block("Decisions Made", result.decisions),
        block("Deadlines", result.deadlines),
      ].join("\n\n"),
    );
    toast.success("Summary copied to clipboard");
  };

  const patch = (p: Partial<SummaryResult>) => setResult((r) => (r ? { ...r, ...p } : r));

  return (
    <AppShell>
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Paste a transcript or rough notes and get a structured, editable recap."
      />

      <section className="card-surface p-5 sm:p-7">
        <div className="grid gap-2">
          <Label htmlFor="notes">Meeting notes or transcript</Label>
          <Textarea
            id="notes"
            rows={8}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={PLACEHOLDER}
            className="resize-y"
          />
        </div>
        <Button className="mt-6" onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {mutation.isPending ? "Summarizing…" : "Summarize"}
        </Button>
      </section>

      {mutation.isPending && !result && (
        <section className="card-surface mt-6 space-y-3 p-5 sm:p-7">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
        </section>
      )}

      {result && (
        <section className="card-surface mt-6 p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-lg font-semibold">Structured recap</h2>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" onClick={copyAll}>
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
              <Button variant="secondary" size="sm" disabled={mutation.isPending} onClick={submit}>
                <RefreshCw className={mutation.isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                Regenerate
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-7">
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Summary
              </h3>
              <Editable
                value={result.summary}
                onChange={(summary) => patch({ summary })}
                className="text-sm leading-relaxed"
              />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Action Items
              </h3>
              <EditableList
                items={result.actionItems}
                onChange={(actionItems) => patch({ actionItems })}
                bullet="•"
              />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Decisions Made
              </h3>
              <EditableList
                items={result.decisions}
                onChange={(decisions) => patch({ decisions })}
                bullet="•"
              />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Deadlines
              </h3>
              <EditableList
                items={result.deadlines}
                onChange={(deadlines) => patch({ deadlines })}
                bullet="📅"
              />
            </div>
          </div>
        </section>
      )}

      <AiDisclaimer />
    </AppShell>
  );
}
