import gql from "graphql-tag";

export const AMOUNT = gql`
  query amount {
    amount @client
  }
`;

export const EXCHAMOUNT = gql`
  query exchamount {
    exchamount @client
  }
`;

export const TOCURRENCY = gql`
  query tocurrency {
    tocurrency @client
  }
`;
export const FROMCURRENCY = gql`
  query fromcurrency {
    fromcurrency @client
  }
`;

export const NAME = gql`
  query name {
    name @client
  }
`;
