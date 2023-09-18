import { IPrice } from "./product-data";

export interface ILineItem {
  price: IPrice;
  id: string;
  productId: string;
  productKey: string;
  variant: {
    prices: [
      {
        value: {
          currencyCode: string;
          centAmount: number;
        };
        discounted: {
          value: {
            currencyCode: string;
            centAmount: number;
          };
        };
      }
    ];
    images: { url: string }[];
  };
  quantity: number;
  totalPrice: {
    centAmount: number;
  };
}

export interface ICart {
  id: string;
  version: number;
  lineItems: ILineItem[];
  totalPrice: {
    currencyCode: string;
    centAmount: number;
  };
  discountCodes: IDiscountCode[];
}

interface IDiscountCode {
  discountCode: {
    typeId: string;
    id: string;
  };
  state: string;
}
