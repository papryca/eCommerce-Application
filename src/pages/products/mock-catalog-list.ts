interface IProductList {
  index: number;
  id: string;
  link: string;
}
type ProductDictionary = Record<string, IProductList>;

const products: ProductDictionary = {
  product1: {
    index: 1,
    id: "60499d07-6584-4832-8ef7-b57f0a46af6d",
    link: "/catalog/",
  },
  product2: {
    index: 2,
    id: "507d1ee2-47aa-4ee9-9931-60440a3cb8fa",
    link: "/catalog/",
  },
  product3: {
    index: 3,
    id: "45a651e7-a997-4d88-a88b-fcb815eece5d",
    link: "/catalog/",
  },
};
export default products;
