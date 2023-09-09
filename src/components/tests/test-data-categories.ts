import { Category } from "@interfaces/category";

const categories: Category[] = [
  {
    id: "1",
    name: { "en-US": "Spain" },
    key: "Spain",
    slug: { "en-US": "Spain" },
    description: { "en-US": "Spain" },
    ancestors: [
      {
        typeId: "test",
        id: "test",
      },
    ],
    parent: {
      typeId: "test",
      id: "test",
    },
    orderHint: "test",
  },
];

export default categories;
