export interface ISortingFieldProps {
  sortingOption: string;
  setSortingOption: React.Dispatch<React.SetStateAction<string>>;
  onCloseSort: () => void;
}
