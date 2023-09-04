export interface IProductData {
  id: string;
  masterData: {
    current: {
      name: ILocalizedText;
      description: ILocalizedText;
      categories: ICategory[];
      masterVariant: IMasterVariant;
    };
  };
}

export interface ILocalizedText {
  "en-US": string;
}

export interface ICategory {
  typeId: string;
  id: string;
}

export interface IMasterVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
}

export interface IPrice {
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
}

export interface IImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IProductSearchResult {
  id: string;
  name: ILocalizedText;
  description: ILocalizedText;
  categories: ICategory[];
  masterVariant: IMasterVariant;
  key: string;
  sku: string;
}

export interface IAttribute {
  name: string;
  value: string | number;
}
