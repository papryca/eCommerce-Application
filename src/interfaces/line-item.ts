import { IAttribute, IImage, ILocalizedText, IPrice } from "./product-data";

export interface ILineItem {
  addedAt: string;
  id: string;
  lastModifiedAt: string;
  lineItemMode: string;
  name: ILocalizedText;
  price: IPrice[];
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: ILocalizedText;
  quantity: number;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  variant: IVariant[];
}

export interface IVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
  assets: IAttribute[];
}
