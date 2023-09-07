interface IMasterData {
  current: IProductData;
}

export interface IImage {
  url: string;
}
export interface IAttribute {
  name: string;
  value: number;
}
interface IPrice {
  value: {
    centAmount: number;
  };
  discounted: {
    value: {
      centAmount: number;
    };
  };
}

interface IVariant {
  images: IImage[];
  prices: IPrice[];
  attributes: IAttribute[];
}
export enum Locale {
  EnUS = "en-US",
}

interface ITranslation {
  [Locale.EnUS]: string;
}

interface IProductData {
  name: ITranslation;

  description: ITranslation;

  masterVariant: IVariant;
}
export interface IProductResponse {
  id: string;
  version: number;
  key: string;
  masterData: IMasterData;
}
