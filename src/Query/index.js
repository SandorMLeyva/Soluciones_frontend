import { gql } from "apollo-boost";

export const GET_WORKSHOP_ENTRIES = gql`
    {
    entries{
      id
      client{
        id
        name
      }
      phoneNumber
      entryConditions
      hardware{
        brand
        model
        type
      }
      datetime
    }
  }
`;



export const UPDATE_ENTRY = gql`
    mutation UpdateEntry( $entryConditions: String!, $userId: String!, $id: Int!, $phoneNumber: String!, $clientId: String!, $hardwareId: String!){
        updateEntry( entryConditions: $entryConditions, userId: $userId, id: $id, phoneNumber: $phoneNumber, clientId: $clientId, hardwareId: $hardwareId){
        ok
        entry{
            id
            client{
                id
                name
            }
            phoneNumber
            entryConditions
            hardware{
                brand
                model
                type
            }
            datetime
          }
        }
    }
`;

export const CREATE_ENTRY = gql`
    mutation CreateEntry($entryConditions: String!, $userId: String!, $id: Int!, $phoneNumber: String!, $clientId: String!, $hardwareId: String!){
        createEntry(entryConditions: $entryConditions, userId: $userId, id: $id, phoneNumber: $phoneNumber, clientId: $clientId, hardwareId: $hardwareId){
        ok
        }
    }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($sourceId: String!, $municipality: String!, $phoneNumber: String!, $comment: String!, $address: String!, $name: String!){
  createClient(sourceId: $sourceId, municipality: $municipality, phoneNumber: $phoneNumber, comment: $comment, address: $address, name: $name){
    ok
    client{
      id
    }
  }
}
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($sourceId: String!, $municipality: String!, $phoneNumber: String!, $comment: String!, $address: String!, $name: String!, $id: Int!){
  updateClient(sourceId: $sourceId, municipality: $municipality, phoneNumber: $phoneNumber, comment: $comment, address: $address, name: $name){
    ok
    client{
      id
    }
  }
}
`;

export const GET_SOURCES = gql`
    {
      sources{
        id
        name
      }
    }
`;
