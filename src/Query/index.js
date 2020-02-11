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