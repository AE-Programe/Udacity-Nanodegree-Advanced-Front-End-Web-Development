import React from 'react'
import { Route , Link } from 'react-router-dom'
import Search from './search';
import BookLibrary from './BookLibrary';
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchBooks: [],
      error: false
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(book => this.setState({
      books: book
    }))
  }

  ChangeBookCase = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      BooksAPI.getAll().then(book => this.setState({
        books: book
      }))
    )
  }

  searchForBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          return this.setState({ searchBooks: [] });
        } else {
          return this.setState({ searchBooks: books });
        }
      });
    } else {
      return this.setState({ searchBooks: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {

    return (

      <div className="app">

        <Route path='/search' render={() => (
          <Search
            books={this.state.searchBooks}
            ChangeBookCase={this.ChangeBookCase}
            updateQuery={this.updateQuery}
            onSearch={this.searchForBooks}
            onResetSearch={this.resetSearch}
            mainBook={this.state.books}
          />
        )} />

        <Route exact path='/' render={() => (
            <>
            <div className="list-books-title">
            <h1>My Reads Application</h1>
          </div>

          <BookLibrary
            books={this.state.books}
            ChangeBookCase={this.ChangeBookCase}
          />

          <div className="open-search">
            <Link to='/search' ><button data-title="Search">Search</button></Link>
          </div>
        </>
        )} />

      </div>

    )
  }
}

export default App
