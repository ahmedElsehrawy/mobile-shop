import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Query {
    products {
      categoryId
      code
      end_price
      count
      id
      name
      original_price
      start_price
    }
  }
`;

export const CREATEPRODUCT = gql`
  mutation Mutation($input: newProductInput!) {
    createProduct(input: $input) {
      id
      name
      categoryId
      code
      end_price
      count
      original_price
      start_price
    }
  }
`;
