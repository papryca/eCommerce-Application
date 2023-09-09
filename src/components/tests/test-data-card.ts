import { IProductData, IProductSearchResult } from "@interfaces/product-data";

const productData: IProductData | IProductSearchResult = {
  id: "1",
  masterData: {
    current: {
      name: {
        "en-US": "Product Name",
      },
      description: {
        "en-US": "Product Description",
      },
      categories: [
        {
          typeId: "test",
          id: "test",
        },
      ],
      masterVariant: {
        id: 1,
        sku: "test",
        key: "test",
        images: [
          {
            url: "product-image.jpg",
            dimensions: {
              w: 100,
              h: 100,
            },
          },
        ],
        prices: [
          {
            id: "test",
            value: {
              type: "test",
              currencyCode: "test",
              centAmount: 3000,
              fractionDigits: 3000,
            },
            discounted: {
              value: {
                type: "test",
                currencyCode: "test",
                centAmount: 3000,
                fractionDigits: 3000,
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

export default productData;
