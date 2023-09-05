export interface IFilterComponentProps {
  onFilterChange: (newFilterCriteria: Record<string, string>) => void;
  selectedCategory: string | null;
}
