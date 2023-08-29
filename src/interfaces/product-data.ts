export interface IProductData {
  id: string;
  masterData: {
    current: {
      name: {
        "en-US": string;
      };
      description: {
        "en-US": string;
      };
      categories: {
        typeId: string;
        id: string;
      }[];
      masterVariant: {
        id: number;
        sku: string;
        key: string;
        prices: {
          id: string;
          value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
          };
          discounted?: {
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: number;
            };
          };
        }[];
        images: {
          url: string;
          dimensions: {
            w: number;
            h: number;
          };
        }[];
      };
    };
  };
}
