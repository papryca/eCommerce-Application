import { Locale } from "@interfaces/product-response";

const product = {
  id: "e7ba4c75-b1bb-483d-94d8-2c4a10f78472",
  version: 2,
  key: "",
  masterData: {
    current: {
      name: {
        "en-US": "Product name in English",
      },
      description: {
        [Locale.EnUS]: "test",
      },
      masterVariant: {
        images: [
          {
            url: "test",
          },
        ],
        prices: [
          {
            value: {
              centAmount: 3000,
            },
            discounted: {
              value: {
                centAmount: 5000,
              },
            },
          },
        ],
        attributes: [
          {
            name: "Star-Rating",
            value: 4,
          },
        ],
      },
    },
  },
};

export default product;
