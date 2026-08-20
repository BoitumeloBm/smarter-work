import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
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
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Describe your message, pick a tone, and generate a polished, editable workplace email in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Generate formal, friendly or persuasive workplace emails with AI.",
      },
    ],
  }),
  component: EmailGeneratorPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

function EmailGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [email, setEmail] = useState("");
  const run = useServerFn(generateEmail);

  const mutation = useMutation({
    mutationFn: (input: { prompt: string; tone: Tone }) => run({ data: input }),
    onSuccess: (res) => setEmail(res.email),
    onError: (e: Error) => toast.error(e.message || "Could not generate the email."),
  });

  const submit = () => {
    if (prompt.trim().length < 3) {
      toast.error("Tell the assistant what the email should be about.");
      return;
    }
    mutation.mutate({ prompt, tone });
  };

  return (
    <AppShell>
      <PageHeader
        title="Smart Email Generator"
        description="Turn a one-line brief into a ready-to-send email, then edit it inline."
      />

      <section className="card-surface p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="brief">What should the email be about?</Label>
            <Input
              id="brief"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Request a project update from a client"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
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
          {mutation.isPending ? "Generating…" : "Generate Email"}
        </Button>
      </section>

      {mutation.isPending && !email && (
        <section className="card-surface mt-6 space-y-3 p-5 sm:p-7">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </section>
      )}

      {email && (
        <section className="card-surface mt-6 p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-lg font-semibold">Generated email</h2>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                  toast.success("Email copied to clipboard");
                }}
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={mutation.isPending}
                onClick={submit}
              >
                <RefreshCw className={mutation.isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                Regenerate
              </Button>
            </div>
          </div>
          <Editable
            value={email}
            onChange={setEmail}
            className="mt-4 min-h-40 text-sm leading-relaxed whitespace-pre-wrap"
          />
        </section>
      )}

      <AiDisclaimer />
    </AppShell>
  );
}
