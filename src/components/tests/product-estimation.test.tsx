import React from "react";

import { Locale } from "@interfaces/product-response";
import ProductEstimation from "@pages/products/product-estimation";
import { render, screen } from "@testing-library/react";

describe("ProductEstimation", () => {
  it("renders product component", () => {
    const product = {
      id: "e7ba4c75-b1bb-483d-94d8-2c4a10f78472",
      version: 2,
      key: "",
      masterData: {
        current: {
          name: {
            "en-US": "Product name in English",
          },
          description: {
            [Locale.EnUS]: "test",
          },
          masterVariant: {
            images: [
              {
                url: "test",
              },
            ],
            prices: [
              {
                value: {
                  centAmount: 3000,
                },
                discounted: {
                  value: {
                    centAmount: 5000,
                  },
                },
              },
            ],
            attributes: [
              {
                name: "Star-Rating",
                value: 4,
              },
            ],
          },
        },
      },
    };
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
