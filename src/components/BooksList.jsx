import { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import { useDependencies } from "../di/DependencyProvider";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./Spinner";
import Popup from "./Popup";

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

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [selectedBook, setSelectedBook] = useState(null);

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

  const closePopup = () => {
    setIsOpen(false);
    setSelectedBook(null);
  };

  function openPopup(event, book) {
    const targetRect = event.target.getBoundingClientRect();
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;
    setIsOpen(true);
    setSelectedBook(book);
    setPosition({ x: centerX, y: centerY });
  }

  // function handleOnTapWantToRead() {
  //   const shelf = selectedBook.shelf;
  //   const title = selectedBook.title;

  //   const headersMap = {
  //     "read":  "Read",
  //     "wantToRead" : "Want To Read",
  //     "currentlyReading": "Currently Reading"
  //   }
  
  //   const updatedBooksData = booksData.map((bookSection) => ({
  //     ...bookSection, 
  //     books: bookSection.header === headersMap[shelf] ? bookSection.books.filter((book) => book.title !== title) : bookSection.books
  //   }));

  //   updatedBooksData[0].books.push(selectedBook);
  //   setBooksData(updatedBooksData);  
  // }

  function handleOnPopupOptionMenu(index) {
    const shelf = selectedBook.shelf;
    const title = selectedBook.title;

    const headersMap = {
      "read":  "Read",
      "wantToRead" : "Want To Read",
      "currentlyReading": "Currently Reading"
    }
  
    const updatedBooksData = booksData.map((bookSection) => ({
      ...bookSection, 
      books: bookSection.header === headersMap[shelf] ? bookSection.books.filter((book) => book.title !== title) : bookSection.books
    }));

    updatedBooksData[index].books.push(selectedBook);
    setBooksData(updatedBooksData);  
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.booksList}>
      {booksData &&
        booksData.map((bookSection, sectionIndex) => (
          <div key={sectionIndex} className={styles.bookSection}>
            <Header title={bookSection.header} />
            <div className={styles.bookGrid}>
              {bookSection.books.map((book, bookIndex) => (
                <div key={bookIndex} className={styles.bookItem}>
                  <Book
                    book={book}
                    onButtonTap={(event) => openPopup(event, book)}
                  />
                </div>
              ))}
            </div>
            <Popup
              onTapCurrentlyReading={() => handleOnPopupOptionMenu(2)}
              onTapRead={() => handleOnPopupOptionMenu(1)}
              onTapWantToRead={() => handleOnPopupOptionMenu(0)}
              isOpen={isOpen}
              onRequestClose={closePopup}
              position={position}
            />
          </div>
        ))}
    </div>
  );
};

export default BooksList;
