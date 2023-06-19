import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDependencies } from "../di/DependencyProvider";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./Spinner";
import AppBar from "./AppBar";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  bookDetail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bookContent: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bookCover: {
    padding: "16px",
    width: "200px",
    height: "300px",
  },
  appBar: {
    width: "100%",
  },
}));

const BookDetail = () => {
  const styles = useStyles();
  const { id } = useParams();
  const dependencies = useDependencies();
  const booksApi = dependencies.booksApi;
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    setLoading(true);
    const bookData = await booksApi.get(id);
    setBook(bookData);
    setLoading(false);
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.bookDetail}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.appBar}>
          <AppBar title={book?.title ?? ""} />
          <div className={styles.bookContent}>
            <Card>
              <img
                src={book?.imageLinks?.thumbnail}
                alt="Book Cover"
                className={styles.bookCover}
              />
            </Card>
            <Typography variant="h5">{book?.title}</Typography>
            <Typography variant="subtitle1">
              {book?.authors?.join(", ")}
            </Typography>
            <Typography variant="body1">{book?.description}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
