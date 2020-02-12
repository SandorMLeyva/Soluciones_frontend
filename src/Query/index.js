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


export const CREATE_HARDWARE = gql`
  mutation CreateHardware($brand: String!, $serialNumber: String!, $model: String!, $type: String!){
    createHardware(brand: $brand, serialNumber: $serialNumber, model: $model, type: $type){
      ok
      hardware{
        id
      }
    }
  }
`;

export const UPDATE_HARDWARE = gql`
  mutation UpdateHardware($brand: String!, $serialNumber: String!, $id: Int!, $model: String!, $type: String!){
    updateHardware(brand: $brand, serialNumber: $serialNumber, id:$id, model: $model, type: $type){
      ok
      hardware{
        id
      }
    }
  }
`;
