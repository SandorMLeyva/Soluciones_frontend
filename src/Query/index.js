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
        user{
          id
          username
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

export const GET_ROAD_ENTRIES = gql`
    {
    roadentries{
      id
      client{
        id
        name
      }
      address
      phoneNumber
      hardware{
        id
        brand
        model
        type
      }
      fixedAppointmentDatetime
    }
  }
`;

export const DELETE_ROAD_ENTRY = gql`
  mutation DeleteRoadEntry($id:String!){
    deleteRoadentry(id: $id){
      ok
      roadentry{
        id
      }
    }
  }
`;

export const UPDATE_ROAD_ENTRY = gql`
  mutation UpdateRoadEntry($userId: String, $customerObservation: String, $clientId: String, $appointmentDatetime: String, $phoneNumber: String, $fixedAppointmentDatetime: String,  $address: String,  $hardwareId: String, $id: String!){
    updateRoadentry(userId: $userId, customerObservation: $customerObservation, clientId: $clientId, appointmentDatetime: $appointmentDatetime, phoneNumber: $phoneNumber, fixedAppointmentDatetime: $fixedAppointmentDatetime, address: $address, hardwareId: $hardwareId, id: $id){
      ok
      roadentry{
        id       
        address
        phoneNumber
        customerObservation
        appointmentDatetime
        fixedAppointmentDatetime
        client{
            id
            name
        }
        hardware{
          id
          brand
          model
          type
        }
        user{
          id
          username
        }

      }
    }
  }
`;


export const CREATE_ROAD_ENTRY = gql`
  mutation CreateRoadEntry($userId: String!, $customerObservation: String!, $clientId: String!, $appointmentDatetime: String, $phoneNumber: String!, $fixedAppointmentDatetime: String,  $address: String!,  $hardwareId: String!){
    createRoadentry(userId: $userId, customerObservation: $customerObservation, clientId: $clientId, appointmentDatetime: $appointmentDatetime, phoneNumber: $phoneNumber, fixedAppointmentDatetime: $fixedAppointmentDatetime, address: $address, hardwareId: $hardwareId){
    ok
    roadentry{
      id       
        address
        phoneNumber
        customerObservation
        appointmentDatetime
        fixedAppointmentDatetime
        client{
            id
            name
        }
        hardware{
          id
          brand
          model
          type
        }
    }
  }
  }
  
`;


export const GET_ROAD_ENTRY_BY_ID = gql`
    query RoadEntry($id: String){
      roadentry(id: $id){
        id
        client{
          id
          name
        }
        user{
          id
          username
        }
        address
        phoneNumber
        customerObservation
        appointmentDatetime
        fixedAppointmentDatetime
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

export const GET_USERS = gql`
  query{
    users{
      id
      username
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService($entryId: String!, $userId: String, $state: String, $datetime: String, $fixId: String, $staffAnnotations: String){
  createService(entryId: $entryId, userId: $userId, state: $state, datetime: $datetime, fixId: $fixId, staffAnnotations: $staffAnnotations){
    ok
    service{
      id
      user{
        username
        id
      }
      state
      entry{
        id
        client{
          id
          name
        }
        hardware{
          id
          type
          brand
        }
      }
      staffAnnotations
      date
      fix{
        id
        basePrice
        pieces{
            price
        }
        otherPieces{
          price
        }
      }
    }
  }
}
`;

export const GET_WORKSHOP_SERVICES = gql`
  query{
  services{
    id
    user{
      username
      id
    }
    state
    entry{
      id
      client{
        id
        name
      }
      hardware{
        id
        type
        brand
      }
    }
    staffAnnotations
    date
    fix{
      id
      basePrice
      pieces{
       	  price
      }
      otherPieces{
        price
      }
    }
  }
}
`;


export const UPDATE_SERVICE = gql`
  mutation UpdateService($entryId: String, $userId: String, $state: String, $datetime: String, $fixId: String, $staffAnnotations: String, $id: String!){
    updateService(entryId: $entryId, userId: $userId, state: $state, datetime: $datetime, fixId: $fixId, staffAnnotations: $staffAnnotations, id: $id){
    ok
    service{
      id
      user{
        username
        id
      }
      state
      entry{
        id
        client{
          id
          name
        }
        hardware{
          id
          type
          brand
        }
      }
      staffAnnotations
      date
      fix{
        id
        basePrice
        pieces{
            price
        }
        otherPieces{
          price
        }
      }
    }
  }
}
`;

export const GET_SERVICE_BY_ID = gql`
    query Service($id: String!){
      service(id: $id){
        id
        user{
          id
          username
        }
        entry{
          id
          client{
            id
            name
          }
          user{
            id
            username
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
        fix{
          id
        }
        state
        staffAnnotations
        date
        sealNumber
      }
    }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id:String!){
    deleteService(id: $id){
      ok
      service{
        id
      }
    }
  }
`;

export const GET_COUNT_SERVICE = gql`
  query ServicesCount($state: String, $time: String){
    servicesCount(state: $state, time: $time){
      count
    }
  }

`;

export const SET_STATE_SERVICE = gql`
    mutation SetStateService($setPrevious: Boolean!, $serviceId: String!){
      setStateService(setPrevious: $setPrevious, serviceId: $serviceId){
        service{
          id
          state
        }
      }
    }
`;



export const CREATE_FIX = gql`
    mutation CreateFix($pieces: [String]!, $basePrice: Float!,$otherPieces:[String]!){
      createFix(pieces: $pieces, basePrice: $basePrice, otherPieces: $otherPieces){
        ok
        fix{
          id
          basePrice
          pieces{
            id
          }
          otherPieces{
            id
          }
        }
      }
    }
`;


export const GET_PIECES = gql`
  query{
    pieces{
      id
      name
      model
      price
      count
      minCount
    }
  }
`;

export const GET_OTHER_PIECES = gql`
  query{
    otherpieces{
      id
      name
      price
      count    
    }
  }
`;


