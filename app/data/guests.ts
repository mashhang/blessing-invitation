export type Guest = {
  id: string;
  name: string;
  slug: string; // unique identifier for the URL
};

export const guests: Guest[] = [
  { id: "1", name: "Uncle Paul", slug: "paul" },
  { id: "2", name: "Uncle Ziv", slug: "ziv" },
  { id: "3", name: "Uncle Renzo", slug: "renzo" },
  { id: "4", name: "Uncle Bitoy", slug: "bitoy" },
  { id: "5", name: "Aunt Angelika", slug: "angelika" },
  { id: "6", name: "Aunt Angelika", slug: "angelika" },
];
