import React from "react";
import { useEffect, useState } from "react";
import Book from "./Book";
import Header from "./Header";
import FabButton from "./FabButton";
import { useDependencies } from "../di/DependencyProvider";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./Spinner";
import Popup from "./Popup";

const useStyles = makeStyles((theme) => ({
  fabContainer: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
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
    justifyItems: "center", // Added to center the books horizontally in each column
  },
  bookItem: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

const BooksList = ({ onTapSearch }) => {
  const styles = useStyles();
  const dependencies = useDependencies();
  const booksApi = dependencies.booksApi;
  const localStorageService = dependencies.localStorageService;

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
    saveToLocalStorage(books);

    setBooksData(books);
  };

  const update = async(book,shelf) => {
      const result = await booksApi.update(book,shelf)
      console.log(result);
  }

  function saveToLocalStorage(books) {
    localStorageService.setItem("books", JSON.stringify(books));
  }

  function getFromLocalStorage() {
    return localStorageService.getItem("books");
  }

  function closePopup() {
    setIsOpen(false);
    setSelectedBook(null);
  }

  function openPopup(event, book) {
    const popupWidth = 400;
    const popupHeight = 200; 

    const centerX = (window.innerWidth - popupWidth) / 2;
    const centerY = (window.innerHeight - popupHeight) / 2;
    setIsOpen(true);
    setSelectedBook(book);
    setPosition({ x: centerX, y: centerY });
  }

  function handleOnPopupOptionMenu(index) {
    const shelf = selectedBook.shelf;
    const title = selectedBook.title;

    const headersMap = {
      wantToRead: "Want To Read",
      read: "Read",
      currentlyReading: "Currently Reading",
    };

    const shelfsMap = {
      "Want To Read": "wantToRead",
      Read: "read",
      "Currently Reading": "currentlyReading",
    };

    const updatedBooksData = booksData.map((bookSection) => ({
      ...bookSection,
      books:
        bookSection.header === headersMap[shelf]
          ? bookSection.books.filter((book) => {
              return (
                book.title.trim().toLowerCase() !== title.trim().toLowerCase()
              );
            })
          : bookSection.books,
    }));

    if (!updatedBooksData[index].books.includes(selectedBook)) {
      const futureShelf = shelfsMap[updatedBooksData[index].header];
      update(selectedBook, futureShelf)
      selectedBook.shelf = futureShelf;
      updatedBooksData[index].books.push(selectedBook);
    }
    setBooksData(updatedBooksData);
    saveToLocalStorage(updatedBooksData);

    closePopup();
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
            <div className={styles.fabContainer}>
              <FabButton onClick={onTapSearch} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BooksList;
