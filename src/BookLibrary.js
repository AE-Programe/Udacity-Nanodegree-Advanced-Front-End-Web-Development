import React , {Component} from 'react'
import PropTypes from 'prop-types' ;
import BookCase from './BookCase'

class BookLibrary extends Component {

    render() {
      const {books , ChangeBookCase} = this.props;

      const CurrentlyReading = books.filter ( book =>
        book.shelf === 'currentlyReading'
      );

      const WannaRead = books.filter ( book =>
        book.shelf === 'wantToRead'
      );

      const Read = books.filter ( book =>
        book.shelf === 'read'
      );

        return (
          <div className="list-books">
            <div className="list-books-content">
              <BookCase CatBook = {CurrentlyReading} title = 'Currently Reading' ChangeBookCase={this.props.ChangeBookCase}/>
              <BookCase CatBook = {WannaRead} title = {'Want To Read'} ChangeBookCase={this.props.ChangeBookCase}/>
              <BookCase CatBook = {Read} title = {'Read'}     ChangeBookCase={this.props.ChangeBookCase}/>
            </div>
          </div>
        )
    }
}

BookLibrary.propTypes = {
  books : PropTypes.array.isRequired,
  ChangeBookCase : PropTypes.func.isRequired,
}
export default BookLibrary;
