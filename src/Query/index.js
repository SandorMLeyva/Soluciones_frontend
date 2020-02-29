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
        id
        brand
        model
        type
      }
      datetime
    }
  }
`;

export const GET_WORKSHOP_ENTRY_BY_ID = gql`
    query Entry($id: String){
      entry(id: $id){
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
          serialNumber
        }
        datetime
      }
    }
`;



export const UPDATE_ENTRY = gql`
    mutation UpdateEntry( $entryConditions: String!, $hardwareId: String!, $id: String!, $clientId: String!, $phoneNumber: String!, $userId: String!){
        updateEntry( entryConditions: $entryConditions, hardwareId: $hardwareId, id: $id, clientId: $clientId, phoneNumber: $phoneNumber, userId: $userId){
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


export const GET_CLIENTS_NAME = gql`
  {
    clients{
      id
      name
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


export const DELETE_ENTRY = gql`
  mutation DeleteWorkshopEntry($id:String!){
    deleteEntry(id: $id){
      ok
      entry{
        id
      }
    }
  }
`;
