import { ICategory, ILocalizedText } from "./product-data";

export interface Category {
  id: string;
  key: string;
  name: ILocalizedText;
  slug: ILocalizedText;
  description: ILocalizedText;
  ancestors: ICategory[];
  parent: ICategory;
  orderHint: string;
}
