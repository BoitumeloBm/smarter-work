import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Click-to-edit text. Uncontrolled contentEditable that syncs on blur/input. */
export function Editable({
  value,
  onChange,
  className,
  as: Tag = "div",
}: {
  value: string;
  onChange: (next: string) => void;
  className?: string;
  as?: "div" | "span" | "p" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerText !== value) el.innerText = value;
  }, [value]);

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      title="Click to edit"
      onInput={(e: React.FormEvent<HTMLElement>) => onChange(e.currentTarget.innerText)}
      className={cn("editable cursor-text px-2 py-1", className)}
    />
  );
}
