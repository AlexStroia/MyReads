import Book from "./Book";
import Header from "./Header";

const BooksList = ({ books }) => {
  return (
    <div className="books-list">
      <Header title="Want to read" />
      <ul>
        {books.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </ul>
    </div>
  );
};
