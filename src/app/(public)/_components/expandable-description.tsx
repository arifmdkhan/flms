"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { JSONContent } from "@tiptap/react";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";

// Recursively extract plain text from TipTap JSON
function extractText(node: JSONContent): string {
  if (!node) return "";

  let text = "";

  // If node has a `text` field, append it
  if (typeof node.text === "string") {
    text += node.text;
  }

  // If node has `content`, recursively parse it
  if (Array.isArray(node.content)) {
    text += " " + node.content.map(extractText).join(" ");
  }

  return text.trim();
}

interface ExpandableDescriptionProps {
  json: JSONContent;
  limit?: number;
}

export function ExpandableDescription({ json, limit = 200 }: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const fullText = useMemo(() => extractText(json), [json]);
  const isLong = fullText.length > limit;

  const preview = isLong ? fullText.slice(0, limit) + "..." : fullText;

  if (!isLong) {
    return <RenderDescription json={json} />;
  }

  return (
    <div className="space-y-3">
      {expanded ? (
        <RenderDescription json={json} />
      ) : (
        <p className="text-muted-foreground leading-relaxed text-base">
          {preview}
        </p>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-auto text-primary"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show less" : "Show more"}
      </Button>
    </div>
  );
}
