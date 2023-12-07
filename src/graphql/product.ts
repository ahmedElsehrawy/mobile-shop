import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($take: Int!, $skip: Int!, $where: fliterProductsInput) {
    products(take: $take, skip: $skip, where: $where) {
      count
      nodes {
        category {
          name
        }
        code
        count
        end_price
        id
        name
        original_price
        start_price
      }
    }
  }
`;

export const GETONEPRODUCT = gql`
  query GetOneProduct($where: getOneProductInput!) {
    getOneProduct(where: $where) {
      name
      start_price
      original_price
      end_price
    }
  }
`;

export const CREATEPRODUCT = gql`
  mutation Mutation($input: createProductInput!) {
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

export const DELETEPRODUCT = gql`
  mutation Mutation($input: deleteProductInput!) {
    deleteProduct(input: $input) {
      id
      name
    }
  }
`;

export const SELLPRODUCT = gql`
  mutation Mutation($input: sellProductInput!) {
    sellProduct(input: $input) {
      count
      name
      id
    }
  }
`;
