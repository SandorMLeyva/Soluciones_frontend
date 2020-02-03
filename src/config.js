import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let protocol = "http";
let domain = "localhost";
let port = 8000;
let endpoint = "graphql";

if (process.env.NODE_ENV === 'production'){
    domain = "soluciones.cu";
}


export const api = `${protocol}://${domain}:${port}/${endpoint}/`;
export const resources = `${protocol}://${domain}:${port}/`;


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: api
});

export const Client = new ApolloClient({ cache, link });
