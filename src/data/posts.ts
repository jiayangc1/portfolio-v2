// To add a post: create `src/content/blog/<slug>.mdx` and add an entry here.

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
};

const allPosts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    description:
      "My portfolio was one page. Now it has an About page, Projects, and this blog.",
    date: "2026-10-15",
  },
];

export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
