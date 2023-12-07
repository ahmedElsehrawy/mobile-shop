import { gql } from "@apollo/client";

export const CREATECATEGORY = gql`
  mutation Mutation($input: newCategoryInput!) {
    createCategory(input: $input) {
      name
      id
    }
  }
`;

export const CATEGORIES = gql`
  query Query {
    categories {
      name
      id
      Product {
        id
      }
    }
  }
`;

export const DELETECATEGORY = gql`
  mutation Mutation($input: deleteCategoryInput!) {
    deleteCategory(input: $input) {
      id
      name
    }
  }
`;
