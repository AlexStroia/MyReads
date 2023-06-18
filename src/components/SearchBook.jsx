import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import Card from "./Card";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  author: {
    color: theme.palette.info.main,
  },
  imageContainer: {
    boxShadow: "0px 2px 4px 4gba(0,0,0,0.2)",
    display: "inline-block",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    display: "block",
    height: "200px",
    width: "200px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  bookContainer: {
    padding: "16px",
    display: "flex",
    height: "300px",
    width: '200px',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
    borderRadius: "50%",
    width: "56px",
    height: "56px",
    position: "absolute", // Changed to absolute positioning
    bottom: "8px", // Adjust as needed
    right: "8px", // Adjust as needed
    color: theme.palette.primary.white,
    backgroundColor: theme.palette.background.default,
  },
}));

const notAvailableUrl = "https://cdn-icons-png.flaticon.com/512/16/16096.png";

const SearchBook = ({ book, onTapAdd}) => {
  const styles = useStyles();
  const imageUrl =
    book.imageLinks != null ? book.imageLinks.smallThumbnail : notAvailableUrl;
  const title = book.title;
  const authors = book.authors != null ? book.authors.join(',') : '';

  return (
    <Card>
      <div className={styles.bookContainer}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} className={styles.image} alt="Book Cover Image" />
          <Button
            className={styles.button}
            variant="contained"
            onClick={(event) => onTapAdd(event)}
          >
            {<AddIcon />}
          </Button>
        </div>
        <Typography variant="body1">{title}</Typography>
        <Typography className={styles.author} variant="subtitle1">
          {authors}
        </Typography>
      </div>
    </Card>
  );
};

export default SearchBook;
