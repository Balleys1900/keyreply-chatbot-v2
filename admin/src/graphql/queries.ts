import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const getAll = gql`
  query Query {
    getAll {
      content {
        name
        language {
          lang
          buttons {
            text
            event
            data
          }
          conditions {
            property
            value
            operator
          }
          text
          regex
        }
      }
    }
  }
`;
