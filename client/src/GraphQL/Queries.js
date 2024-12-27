import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
    query {
        allBooks{
            _id
            name
            genre
        }
    }
`;

/* export const GET_AUTHORS = gql`
    query {
        authors{
            _id
            authorName
            age
        }
    }
`; */