import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import Card from "./Card";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    boxShadow: "0px 2px 4px 4gba(0,0,0,0.2)",
    display: "inline-block",
    position: "relative", // Added relative positioning
  },
  image: {
    display: "block",
  },
  bookContainer: {
    height: "400px",
    width: "200px",
    padding: "16px 16px 16px 16px",
    flexDirection: "column",
    textAlign: "center",
  },
  author: {
    color: theme.palette.info.main,
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

const Book = ({ book, onButtonTap }) => {
  const styles = useStyles();
  const imageUrl = book.imageLinks.smallThumbnail;
  const title = book.title;
  const bookAuthors = book.authors;
  const authors = bookAuthors.join(", ");

  return (
    <Card>
      <div className={styles.bookContainer}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            className={styles.image}
            height="300"
            width= "200"
            alt="Book Cover Image"
          />
          <Button
            className={styles.button}
            variant="contained"
            onClick={(event) => onButtonTap(event)}
          >
            {<InfoIcon />}
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

export default Book;
