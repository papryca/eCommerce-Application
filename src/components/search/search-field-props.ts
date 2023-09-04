export interface ISearchFieldProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchHandler: () => void;
  isLoading: boolean;
}
