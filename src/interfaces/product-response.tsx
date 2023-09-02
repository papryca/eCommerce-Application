interface IMasterData {
  current: IProductData;
}

export interface IImage {
  url: string;
}
interface IPrice {
  value: {
    centAmount: number;
  };
}

interface IVariant {
  images: IImage[];
  prices: IPrice[];
}
enum Locale {
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
