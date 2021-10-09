import { gql } from 'apollo-server-core';

const documentsTypesDefs = gql`
  extend type Query {
    documents: Documents
  }

  type Documents {
    RG: String
    CPF: String
  }
`;

export default documentsTypesDefs;
