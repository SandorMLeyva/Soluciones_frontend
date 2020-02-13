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
    mutation UpdateEntry( $entryConditions: String!, $userId: String!, $id: String!, $phoneNumber: String!, $clientId: String!, $hardwareId: String!){
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
              id
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
    mutation CreateEntry($clientId: String!, $entryConditions: String!, $userId: String!, $hardwareId: String!, $phoneNumber: String!){
        createEntry(clientId: $clientId, entryConditions: $entryConditions, userId: $userId, hardwareId: $hardwareId, phoneNumber: $phoneNumber){
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
              id
                brand
                model
                type
            }
            datetime
          }
        }
    }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($sourceId: String!, $municipality: String!, $phoneNumber: String!, $comment: String!, $address: String!, $name: String!){
  createClient(sourceId: $sourceId, municipality: $municipality, phoneNumber: $phoneNumber, comment: $comment, address: $address, name: $name){
    ok
    client{
      id
      name
      phoneNumber
      address
      municipality
      source{
        id
      }
      comment
    }
  }
}
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($sourceId: String!, $municipality: String!, $phoneNumber: String!, $comment: String!, $address: String!, $name: String!, $id: String!){
  updateClient(sourceId: $sourceId, municipality: $municipality, phoneNumber: $phoneNumber, comment: $comment, address: $address, name: $name, id:$id){
    ok
    client{
      id
      name
      phoneNumber
      address
      municipality
      source{
        id
      }
      comment
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
        brand
        model
        type
        serialNumber
      }
    }
  }
`;

export const UPDATE_HARDWARE = gql`
  mutation UpdateHardware($brand: String!, $serialNumber: String!, $id: String!, $model: String!, $type: String!){
    updateHardware(brand: $brand, serialNumber: $serialNumber, id:$id, model: $model, type: $type){
      ok
      hardware{
        id
        brand
        model
        type
        serialNumber
      }
    }
  }
`;
