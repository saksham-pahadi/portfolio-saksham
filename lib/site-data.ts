export const demoProjects = [
  {
    _id: "demo-1",
    title: "Code Buddy",
    slug: "code-buddy",
    description:
      "AI-assisted multilingual code analyzer that explains bugs, complexity, and refactor paths inside a fast browser workspace.",
    stack: ["Next.js", "TypeScript", "AI", "Monaco"],
    image: "/project-1.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/saksham-pahadi/code-buddy",
    featured: true,
    accent: "#9b5cff",
  },
  {
    _id: "demo-2",
    title: "Loop AI",
    slug: "loop-ai",
    description:
      "Feedback intelligence platform that classifies product feedback, groups themes, and turns recurring signals into weekly reports.",
    stack: ["React", "Next.js", "MongoDB", "Claude"],
    image: "/project-2.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    featured: true,
    accent: "#7c4dff",
  },
  {
    _id: "demo-3",
    title: "Realm of Clans",
    slug: "realm-of-clans",
    description:
      "Real-time gamified simulation platform with clans, points, treasuries, missions, leaderboards, and a competitive weekly loop.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Auth"],
    image: "/project-3.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    featured: true,
    accent: "#d6ff3f",
  },
  {
    _id: "demo-4",
    title: "GMAC",
    slug: "gmac",
    description:
      "Social + crowdfunding experience focused on community-driven discovery, contribution flows, and responsive UI systems.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "/project-4.svg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    featured: false,
    accent: "#ef7cff",
  },
];
export const demoPosts = [
  {
    _id: "p1",
    title: "Designing APIs that survive version one",
    slug: "designing-apis-that-survive-version-one",
    excerpt:
      "The small choices that keep a backend flexible as the product moves from idea to actual users.",
    content:
      "Start with boring contracts. Validate at the boundary. Keep business logic independent from transport. Make every breaking change explicit.",
    tags: ["Backend", "API", "Architecture"],
    published: true,
    publishedAt: new Date("2026-08-19"),
  },
  {
    _id: "p2",
    title: "Why I still care about the boring 90%",
    slug: "why-i-still-care-about-the-boring-90",
    excerpt:
      "Polish is great. Reliability pays the bills. Here is how I balance both when shipping modern web products.",
    content:
      "The most satisfying part of engineering is often invisible: predictable state, sane errors, accessible forms, stable database connections and a deployment that does not surprise you.",
    tags: ["Engineering", "Next.js"],
    published: true,
    publishedAt: new Date("2026-07-28"),
  },
  {
    _id: "p3",
    title: "A practical mental model for Next.js App Router",
    slug: "practical-mental-model-for-nextjs-app-router",
    excerpt:
      "Server components, client islands, route handlers and mutations — mapped to the decisions that matter.",
    content:
      "Think of the App Router as a server-first application with carefully chosen interactive islands. Keep secrets and database work on the server, then hydrate only what needs browser state.",
    tags: ["Next.js", "React"],
    published: true,
    publishedAt: new Date("2026-06-11"),
  },
];
export const skills = {
  Languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "C",
    "HTML5",
    "CSS3",
  ],
  Frameworks: [
    "React",
    "Next.js",
    "Redux",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
  ],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["Git", "GitHub", "VS Code", "Postman", "REST API"],
  Other: ["UI/UX Design", "Data Structures", "SEO"],
};
