import CardComponent from "@components/card/card";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import productData from "./test-data-card";

describe("CardComponent", () => {
  it("renders product name", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const nameElement = screen.getByText("Product Name");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders product description", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText("Product Description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the product image", () => {
    render(
      <MemoryRouter>
        <CardComponent product={productData} />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText("Product Name");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "product-image.jpg");
  });
});
