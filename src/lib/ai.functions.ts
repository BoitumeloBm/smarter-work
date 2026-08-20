import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { callAI, parseJSON } from "./ai.server";

export type SummaryResult = {
  summary: string;
  actionItems: string[];
  decisions: string[];
  deadlines: string[];
};

export type PlanResult = {
  tasks: Array<{ title: string; priority: "High" | "Medium" | "Low"; note: string }>;
  schedule: Array<{ label: string; items: string[] }>;
};

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        prompt: z.string().min(3).max(4000),
        tone: z.enum(["Formal", "Friendly", "Persuasive"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const text = await callAI(
      `You are an expert business writer. Write a complete, ready-to-send workplace email in a ${data.tone.toLowerCase()} tone. Include a "Subject:" line, greeting, concise body paragraphs and a sign-off with [Your Name]. Return plain text only, no markdown fences or commentary.`,
      data.prompt,
    );
    return { email: text.trim() };
  });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ notes: z.string().min(10).max(20000) }).parse(data))
  .handler(async ({ data }): Promise<SummaryResult> => {
    const raw = await callAI(
      `You summarize meeting notes. Respond ONLY with JSON of shape {"summary": string (3-4 sentences), "actionItems": string[] (each starts with the owner name when known), "decisions": string[], "deadlines": string[] (include the date or day in each item)}. Use empty arrays when nothing applies.`,
      data.notes,
      true,
    );
    const parsed = parseJSON<SummaryResult>(raw);
    return {
      summary: parsed.summary ?? "",
      actionItems: parsed.actionItems ?? [],
      decisions: parsed.decisions ?? [],
      deadlines: parsed.deadlines ?? [],
    };
  });

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        goals: z.string().min(3).max(4000),
        scheduleType: z.enum(["Daily", "Weekly"]),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<PlanResult> => {
    const shape =
      data.scheduleType === "Daily"
        ? `"schedule" must be time blocks for one working day, e.g. label "09:00 - 10:30".`
        : `"schedule" must be a day-by-day breakdown, labels "Monday" through "Friday".`;
    const raw = await callAI(
      `You are a productivity planner. Respond ONLY with JSON of shape {"tasks": [{"title": string, "priority": "High"|"Medium"|"Low", "note": string}], "schedule": [{"label": string, "items": string[]}]}. Order tasks from highest to lowest priority. ${shape}`,
      data.goals,
      true,
    );
    const parsed = parseJSON<PlanResult>(raw);
    return { tasks: parsed.tasks ?? [], schedule: parsed.schedule ?? [] };
  });
