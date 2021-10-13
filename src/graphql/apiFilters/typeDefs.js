import { gql } from 'apollo-server-core';

const apiFiltersTypesDefs = gql`
  input apiFiltersInput {
    _sort: String
    _order: String
    _start: Int
    _limit: Int
  }
`;

export default apiFiltersTypesDefs;
