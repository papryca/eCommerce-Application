import React from "react";

import product from "@components/tests/test-data";
import ProductEstimation from "@pages/products/product-estimation";
import { render, screen } from "@testing-library/react";

describe("ProductEstimation", () => {
  it("renders product component", () => {
    render(<ProductEstimation product={product} />);

    const priceElement = screen.getByText("30.00 USD");
    expect(priceElement).toBeInTheDocument();

    const salePriceElement = screen.getByText("50.00 USD");
    expect(salePriceElement).toBeInTheDocument();

    const elementWithAriaLabel = screen.getByLabelText("4 Stars");
    expect(elementWithAriaLabel).toBeInTheDocument();

    const starSpans = screen.getAllByTestId("StarIcon");
    expect(starSpans).toHaveLength(4);
  });
});
