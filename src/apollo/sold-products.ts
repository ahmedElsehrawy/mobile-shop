import { gql } from "@apollo/client";

export const GET_SOLD_PRODUCTS = gql`
  query SoldProducts($input: inputObjectType!) {
    soldProducts(input: $input) {
      total
      totalOriginalPrice
      nodes {
        id
        salePrice
        quantity
        createdAt
        product {
          code
          name
        }
      }
    }
  }
`;

export const MAKE_PRODUCT_SOLD = gql`
  mutation Mutation($input: createSoldProductInput!) {
    createSoldProduct(input: $input) {
      productId
      id
      product {
        count
      }
      salePrice
      createdAt
    }
  }
`;

export const SOLD_PRODUCTS_CHARTS = gql`
  query soldProductsCharts {
    soldProductsCharts {
      soldProuctsCharts {
        from
        to
        totalOriginalPrice
        totalSaledPrice
      }
    }
  }
`;
