import { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import { useDependencies } from "../di/DependencyProvider";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
  booksList: {
    margin: "16px",
  },
  bookSection: {
    marginBottom: theme.spacing(2),
  },
  bookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridGap: theme.spacing(2),
  },
  bookItem: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

const BooksList = () => {
  const styles = useStyles();
  const dependencies = useDependencies();
  const booksApi = dependencies.booksApi;

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const fetchedBooks = await booksApi.getAll();
    const books = [
      {
        header: "Want To Read",
        books: fetchedBooks.filter((value) => value.shelf === "wantToRead"),
      },
      {
        header: "Read",
        books: fetchedBooks.filter((value) => value.shelf === "read"),
      },
      {
        header: "Currently Reading",
        books: fetchedBooks.filter(
          (value) => value.shelf === "currentlyReading"
        ),
      },
    ];
    setLoading(false);
    setBooksData(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.booksList}>
      {loading ? (
        <Spinner />
      ) : (
        booksData &&
        booksData.map((bookSection, sectionIndex) => (
          <div key={sectionIndex} className={styles.bookSection}>
            <Header title={bookSection.header} />
            <div className={styles.bookGrid}>
              {bookSection.books.map((book, bookIndex) => (
                <div key={bookIndex} className={styles.bookItem}>
                  <Book book={book} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BooksList;
