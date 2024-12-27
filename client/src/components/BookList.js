import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_BOOKS } from '../GraphQL/Queries'
import { GET_AUTHORS } from '../GraphQL/Queries'    

const BookList = () => {
    const { loading:allBookLoading, error:allBookError, data:allBookData } = useQuery(GET_BOOKS);
    /* const { loading, error, data:allAuthorData } = useQuery(GET_AUTHORS); */

  return (
    <div>
        <div>
            <h1>Book List</h1>
            {allBookLoading ? <h1>Loading...</h1> : null}
            {allBookData ? 
                <ul>
                {allBookData.allBooks.map((book) => (
                    <li key={book._id}>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    </li>
                ))}
                </ul>
            : null}
         </div>
{/*          <div>
            <h1>Author List</h1>
            {allAuthorData ? 
                <ul>
                {allAuthorData.allAuthors.map((author) => (
                    <li key={author._id}>
                    <h2>{author.authorName}</h2>
                    <p>{author.age}</p>
                    </li>
                ))}
                </ul>
                : null}
         </div> */}
    </div>
  )
}

export default BookList