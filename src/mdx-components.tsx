import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  pre: (props) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-md border border-foreground/7 bg-foreground/5 px-4 py-3 font-mono text-foreground/80 text-sm [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded-md border border-foreground/7 bg-foreground/5 px-1.5 py-0.5 font-mono text-foreground/80 text-sm"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-foreground/15 border-l-2 pl-4 text-foreground/60 italic"
    />
  ),
  hr: () => <hr className="border-foreground/7" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
