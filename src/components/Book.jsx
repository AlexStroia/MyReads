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
    padding: "16px 16px 16px 16px",
    flexDirection: "column",
    textAlign: "center",
  },
  author: {
    color: theme.palette.info.main,
  },
  button: {
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

const Book = ({ key, book }) => {
  const styles = useStyles();
  const imageUrl = book.imageUrl;
  const title = book.title;
  const author = book.author;
  return (
    <Card key={key}>
      <div className={styles.bookContainer}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            className={styles.image}
            height="300"
            alt="Book Cover Image"
          />
          <Button className={styles.button} variant="contained">
            {<InfoIcon />}
          </Button>
        </div>
        <Typography variant="body1">{title}</Typography>
        <Typography className={styles.author} variant="subtitle1">
          {author}
        </Typography>
      </div>
    </Card>
  );
};

export default Book;