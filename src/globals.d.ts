declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.pcss' {
  const content: Record<string, string>;
  export default content;
}
