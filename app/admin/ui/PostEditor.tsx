"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { PostFormValues } from "@/types/content";

const blank: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover: "",
  tags: "Next.js, TypeScript",
  published: true,
};

type PostEditorInitial = Partial<PostFormValues> & {
  tags?: string[] | string;
  _id?: string;
};

const fields: Array<[keyof PostFormValues, string]> = [
  ["title", "Title"],
  ["slug", "Slug (optional)"],
  ["excerpt", "Excerpt"],
  ["cover", "Cover image URL (optional)"],
  ["tags", "Tags, comma separated"],
];

export default function PostEditor({
  initial,
  id,
}: {
  initial?: PostEditorInitial;
  id?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>({
    ...blank,
    ...initial,
    tags: Array.isArray(initial?.tags)
      ? initial.tags.join(", ")
      : initial?.tags || blank.tags,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function updateValue<Key extends keyof PostFormValues>(
    key: Key,
    value: PostFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const body = {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    const response = await fetch(
      id ? `/api/admin/posts/${id}` : "/api/admin/posts",
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      setError("Could not save post.");
      setBusy(false);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-4">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="mb-2 block text-xs text-white/35">{label}</label>
          <input
            className="field"
            value={String(values[key])}
            onChange={(event) => updateValue(key, event.target.value)}
          />
        </div>
      ))}
      <div>
        <label className="mb-2 block text-xs text-white/35">Content</label>
        <textarea
          className="field"
          rows={14}
          value={values.content}
          onChange={(event) => updateValue("content", event.target.value)}
          placeholder="Use blank lines between paragraphs."
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-white/[.55]">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(event) => updateValue("published", event.target.checked)}
        />
        Published
      </label>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        disabled={busy}
        className="w-fit rounded-full bg-[#d6ff3f] px-6 py-3 text-sm font-bold text-black"
      >
        {busy ? "Saving..." : id ? "Save changes" : "Publish post"}
      </button>
    </form>
  );
}