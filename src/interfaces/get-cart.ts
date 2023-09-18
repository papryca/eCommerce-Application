import { IImage, IPrice, IVariant } from "@interfaces/product-response";

enum Locale {
  EnUS = "en-US",
}

interface ITranslation {
  [Locale.EnUS]: string;
}
export interface ILineItem {
  variant: IVariant;
  images: IImage[];
  name: ITranslation;
  price: IPrice;

  productId: string;
  id: string;
}
export interface ICartResponse {
  version: number;
  lineItems: ILineItem[];
  id: string;
}
