export interface IFilterComponentProps {
  onFilterChange: (newFilterCriteria: Record<string, string>) => void;
  selectedCategory: string | null;
  onCountryFilterChange: (countryFilter: string) => void;
  onCloseFilter: () => void;
  countryFilter: string;
  setCountryFilter: React.Dispatch<React.SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  starRating: string;
  setStarRating: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
