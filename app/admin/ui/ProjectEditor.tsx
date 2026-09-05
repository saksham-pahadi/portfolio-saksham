"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectFormValues } from "@/types/content";

const blank: ProjectFormValues = {
  title: "",
  slug: "",
  description: "",
  stack: "Next.js, TypeScript",
  image: "/project-1.svg",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  accent: "#9b5cff",
  order: 0,
};

type ProjectEditorInitial = Partial<ProjectFormValues> & {
  stack?: string[] | string;
  _id?: string;
};

const fields: Array<[keyof ProjectFormValues, string]> = [
  ["title", "Project title"],
  ["slug", "Slug (optional)"],
  ["description", "Description"],
  ["stack", "Stack, comma separated"],
  ["image", "Image path / URL"],
  ["liveUrl", "Live URL"],
  ["githubUrl", "GitHub URL"],
  ["accent", "Accent color"],
  ["order", "Order"],
];

export default function ProjectEditor({
  initial,
  id,
}: {
  initial?: ProjectEditorInitial;
  id?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>({
    ...blank,
    ...initial,
    stack: Array.isArray(initial?.stack)
      ? initial.stack.join(", ")
      : initial?.stack || blank.stack,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function updateValue<Key extends keyof ProjectFormValues>(
    key: Key,
    value: ProjectFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const body = {
      ...values,
      stack: values.stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    const response = await fetch(
      id ? `/api/admin/projects/${id}` : "/api/admin/projects",
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      setError("Could not save project.");
      setBusy(false);
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-4">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="mb-2 block text-xs text-white/35">{label}</label>
          {key === "description" ? (
            <textarea
              className="field"
              rows={5}
              value={values.description}
              onChange={(event) => updateValue("description", event.target.value)}
            />
          ) : (
            <input
              className="field"
              value={String(values[key])}
              type={key === "order" ? "number" : "text"}
              onChange={(event) =>
                updateValue(
                  key,
                  key === "order"
                    ? Number(event.target.value)
                    : event.target.value,
                )
              }
            />
          )}
        </div>
      ))}
      <label className="flex items-center gap-3 text-sm text-white/[.55]">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(event) => updateValue("featured", event.target.checked)}
        />
        Featured project
      </label>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        disabled={busy}
        className="w-fit rounded-full bg-[#d6ff3f] px-6 py-3 text-sm font-bold text-black"
      >
        {busy ? "Saving..." : id ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}