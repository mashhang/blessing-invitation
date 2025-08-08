export type Guest = {
  id: string;
  name: string;
  slug: string; // unique identifier for the URL
};

export const guests: Guest[] = [
  { id: "1", name: "Uncle John", slug: "john" },
  { id: "2", name: "Aunt Mary", slug: "mary" },
  { id: "3", name: "Uncle Paul", slug: "paul" },
  { id: "4", name: "Aunt Jane", slug: "jane" },
];
