import React from 'react';

import SearchArea from "../SearchArea";
import BookList from "../BookList";

class Books extends React.Component {
  state = {
    books: [],
    searchField: '',
    sort: ''
  };

  searchBook = (event) => {
    event.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        const cleanData = this.cleanData(data);
        this.setState({
          books: cleanData
        })
      })
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleSort = (event) => {
    this.setState({ sort: event.target.value });
  };

  cleanData = (data) => {
      const cleanedData = data.items.map((book) => {
        if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
          book.volumeInfo['publishedDate'] = '0000';
        }
        else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
          book.volumeInfo['imageLinks'] = { thumbnail: 'https://www.sion-consulting.com/wp-content/themes/consultix/images/no-image-found-360x250.png' }
        }

        return book;
      })

    return cleanedData;
  };

  render() {
    const { books = [], sort } = this.state;
    const sortedBooks = books.sort((a, b) => {
        if (sort === 'Newest') {
          return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4));
        }
        else if (sort === 'Oldest') {
          return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4));
        }
    });
    return (
      <div className="search-area">
        <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort} />
        <BookList books={sortedBooks} />
      </div>
    )
  }
}

export default Books;
