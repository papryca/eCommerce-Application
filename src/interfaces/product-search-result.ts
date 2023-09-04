import { ICategory, ILocalizedText, IMasterVariant } from "./product-data";

export interface IProductSearchResult {
  id: string;
  name: ILocalizedText;
  description: ILocalizedText;
  categories: ICategory[];
  masterVariant: IMasterVariant;
  key: string;
  sku: string;
}
