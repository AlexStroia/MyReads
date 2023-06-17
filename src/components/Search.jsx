import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import { useDependencies } from "../di/DependencyProvider";
import { debounce } from "lodash";
import { useState, } from "react";
import BooksList from "./BooksList";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
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

const Search = () => {
  const styles = useStyles();
  const dependencies = useDependencies();
  const booksApi = dependencies.booksApi;

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearchBook(event) {
    setLoading(true);
    const value = event.target.value;
    // const result =      await booksApi.search(value);
    const result = await debounceSearch(value);

      setLoading(false);
    console.log(result);
  }

  const debounceSearch = debounce(async (value) => {
    return await booksApi.search(value);
  }, 500);

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
      loading ? <Spinner/> : <div>Nothing</div>
    </div>
  );
};

export default Search;
