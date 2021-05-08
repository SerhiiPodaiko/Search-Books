import React from 'react';

import BookCard from "../BookCard";

const BookList = (props) => {
  return(
    <div className="list">
      {
        props.books.map((book, id) => {
            return <BookCard key={id}
                             image={book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail}
                             title={book.volumeInfo.title}
                             author={book.volumeInfo.authors}
                             published={book.volumeInfo.publishedDate} />
        })
      }
    </div>
  );
}

export default BookList;
