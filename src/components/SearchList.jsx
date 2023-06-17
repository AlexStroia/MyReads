import { TextField, makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import { useDependencies } from "../di/DependencyProvider";
import { debounce } from "lodash";
import React, { useState, useRef } from "react";
import Spinner from "./Spinner";
import SearchBook from "./SearchBook";
import NoResult from "./NoResult";

const useStyles = makeStyles((theme) => ({
  bookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    rowGap: theme.spacing(2),
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

  async function handleSearchBook(event) {
    setLoading(true);
    const value = event.target.value;
    console.log("Value is " + value);
    if (!value) {
      setBooksData([]);
      setLoading(false);
      debounceSearch.current.cancel();
    } else {
      await debounceSearch.current(value);
      setLoading(false);
    }
  }

  const debounceSearch = useRef(
    debounce(async (value) => {
      const result = await booksApi.search(value);
      setBooksData(result);
    }, 500)
  );

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
                  <SearchBook book={book} />
                ))}
              </div>
            </ul>
          ) : (
            <NoResult />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchList;
