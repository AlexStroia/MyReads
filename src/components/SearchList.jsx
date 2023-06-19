import { TextField, makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import { useDependencies } from "../di/DependencyProvider";
import { debounce } from "lodash";
import React, { useState, useRef } from "react";
import Spinner from "./Spinner";
import SearchBook from "./SearchBook";
import NoResult from "./NoResult";
import Popup from "./Popup";
import SnackBar from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  bookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    rowGap: theme.spacing(5),
    gap: theme.spacing(5),
  },
  inputWrapper: {
    marginLeft: "16px",
    marginRight: "16px",
  },
  input: {
    marginTop: "8px",
    paddingStart: "8px",
    borderRadius: "8px",
    width: "100%",
    border: "1px solid",
    borderColor: theme.palette.background.default,
    "& input": {
      color: theme.palette.text.secondary, // Replace with your desired text color
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
}));

const SearchList = () => {
  const styles = useStyles();
  const dependencies = useDependencies();
  const booksApi = dependencies.booksApi;

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isPopupOpen, setPopupIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isSnackbarShowing, setIsSnackbarShowing] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  function openSnackBar() {
    setIsSnackbarShowing(true);
  }

  function hideSnackbar() {
    setIsSnackbarShowing(false);
  }

  async function handleSearchBook(event) {
    setLoading(true);
    const value = event.target.value;
    if (!value) {
      setBooksData([]);
      setLoading(false);
      debounceSearch.current.cancel();
    } else {
      await debounceSearch.current(value);
      setLoading(false);
    }
  }

  function openPopup(event, book) {
    const popupWidth = 400;
    const popupHeight = 200;

    const centerX = (window.innerWidth - popupWidth) / 2;
    const centerY = (window.innerHeight - popupHeight) / 2;
    setPopupIsOpen(true);
    setSelectedBook(book);
    setPosition({ x: centerX, y: centerY });
  }

  const debounceSearch = useRef(
    debounce(async (value) => {
      const result = await booksApi.search(value);
      setBooksData(result);
    }, 500)
  );

  async function handleOnTap(index) {
    const shelfs = ["wantToRead", "read", "currentlyReading"];
    const books = booksData;
    setLoading(true);
    await booksApi.update(selectedBook, shelfs[index]);
    setLoading(false);
    setBooksData(books);
    closePopup();
    openSnackBar();
  }

  function closePopup() {
    setPopupIsOpen(false);
    setSelectedBook(null);
  }

  return (
    <div className="search-content">
      <AppBar title="Search" emoji="🔍" />
      <div className={styles.inputWrapper}>
        <TextField
          onChange={handleSearchBook}
          className={styles.input}
          placeholder="Search"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="searched-books">
          {Array.isArray(booksData) ? (
            <ul>
              <div className={styles.bookGrid}>
                {booksData.map((book, index) => (
                  <div className="book-item" key={index}>
                    <SearchBook
                      book={book}
                      onTapAdd={(event) => openPopup(event, book)}
                    />
                  </div>
                ))}
              </div>
            </ul>
          ) : (
            <NoResult />
          )}
          <Popup
          onTapNone={() => closePopup()}
            isOpen={isPopupOpen}
            onRequestClose={() => closePopup()}
            position={position}
            onTapWantToRead={() => {
              handleOnTap(0);
            }}
            onTapRead={() => {
              handleOnTap(1);
            }}
            onTapCurrentlyReading={() => {
              handleOnTap(2);
            }}
          />
          <SnackBar
            message="Saved with success"
            isOpen={isSnackbarShowing}
            handleCloseSnackBar={() => hideSnackbar()}
          ></SnackBar>
        </div>
      )}
    </div>
  );
};

export default SearchList;
