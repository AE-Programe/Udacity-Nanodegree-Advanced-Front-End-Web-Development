import React , {Component} from 'react'
import PropTypes from 'prop-types' ;

class BookCase extends Component {

    render() {
        const {CatBook , ChangeBookCase} = this.props

        return (

              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {CatBook.map( book => (
                        <li key = {book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value = {book.shelf} onChange= {(event) => ChangeBookCase (book , event.target.value)}>
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



            </div>

        )
    }
}

BookCase.propTypes = {
  CatBook : PropTypes.array.isRequired,
  title : PropTypes.string.isRequired,
  ChangeBookCase : PropTypes.func.isRequired,
}

export default BookCase;
