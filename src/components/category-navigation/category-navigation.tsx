import React from "react";

import { Category } from "@interfaces/category";

import Chip from "@mui/material/Chip";

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onClick: (
    event: React.MouseEvent<HTMLDivElement>,
    categoryId: string
  ) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  selectedCategory,
  onClick,
}) => {
  return (
    <>
      {categories.map((category: Category) => (
        <Chip
          label={category.name["en-US"]}
          key={category.id}
          clickable
          color={selectedCategory === category.id ? "primary" : "default"}
          onClick={(event) => onClick(event, category.id)}
        />
      ))}
    </>
  );
};

export default CategoryNavigation;
