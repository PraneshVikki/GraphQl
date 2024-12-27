import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient , InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';  
import BookList from './components/BookList';


function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
      <BookList></BookList>

      </div>
    </ApolloProvider>
  );
}

export default App;
