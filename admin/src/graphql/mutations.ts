import gql from 'graphql-tag';

export const createNodeQuery = gql`
  mutation Mutation($createContentDto: ContentInput) {
    createContent(dto: $createContentDto) {
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
      version
      description
    }
  }
`;
