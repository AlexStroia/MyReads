import Book from "./Book";

const BooksList = ({ books }) => {
  return (
    <ul>
      {books.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </ul>
  );
};
