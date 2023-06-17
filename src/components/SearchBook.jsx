import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const notAvailableUrl = "https://cdn-icons-png.flaticon.com/512/16/16096.png";

const SearchBook = ({ book }) => {
  const styles = useStyles();
  const imageUrl =
    book.imageLinks != null ? book.imageLinks.smallThumbnail : notAvailableUrl;
  const title = book.title;

  return (
    <Card>
      <div className={styles.bookContainer}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} className={styles.image} alt="Book Cover Image" />
        </div>
        <Typography variant="body1">{title}</Typography>
      </div>
    </Card>
  );
};

export default SearchBook;
