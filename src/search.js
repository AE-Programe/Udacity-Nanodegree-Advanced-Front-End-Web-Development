import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Search extends Component {
  state = {
    value: "",
    Books: [],
    searchErr: false
  }

  updateQuery = (query) => {
    this.setState({ value: query }, () => {
      this.props.onSearch(query)
    })
  }
  clearQuery = () => {
    this.updateQuery('');
    this.setState({ Books: [] })
  }

  render() {

    const { books, ChangeBookCase, onResetSearch, mainBook } = this.props;

    const updatedBooks = books.map(book => {
      mainBook.map(b => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
        }
        return b;
      });
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"  ><button className="close-search" onClick={onResetSearch}>Close</button></Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              value={this.state.value}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by Title or Author"
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {this.state.value === "" ? '--Search by Title or Author--' : updatedBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 153, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'icons/book_placeholder.svg'})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => ChangeBookCase(book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.join(' & ')}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  ChangeBookCase: PropTypes.func.isRequired,
}
export default Search;
