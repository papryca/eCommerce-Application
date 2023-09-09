import CategoryNavigation from "@components/category-navigation/category-navigation";
import categories from "@components/tests/test-data-categories";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("CategoryNavigation", () => {
  it("renders category chips", () => {
    render(
      <MemoryRouter>
        <CategoryNavigation
          categories={categories}
          selectedCategory={null}
          onClick={() => {}}
        />
      </MemoryRouter>
    );

    categories.forEach((category) => {
      const chipElement = screen.getByText(category.name["en-US"]);
      expect(chipElement).toBeInTheDocument();
    });
  });

  it("calls onClick when a category chip is clicked", () => {
    const onClickMock = jest.fn();

    render(
      <MemoryRouter>
        <CategoryNavigation
          categories={categories}
          selectedCategory={null}
          onClick={onClickMock}
        />
      </MemoryRouter>
    );

    const categoryToClick = categories[0];
    const chipElement = screen.getByText(categoryToClick.name["en-US"]);

    fireEvent.click(chipElement);

    expect(onClickMock).toHaveBeenCalledWith(
      expect.anything(),
      categoryToClick.id
    );
  });
});
