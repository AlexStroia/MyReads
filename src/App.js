import logo from "./logo.svg";
import "./App.css";
import AppBar from "./components/AppBar";
import { ThemeProvider, makeStyles } from "@material-ui/core";
import theme from "./theme/Theme";
import FabButton from "./components/FabButton";
import Book from "./components/Book";
import { DependencyProvider } from "./di/DependencyProvider";
import BooksApi from "./api/BooksApi";
import BooksList from "./components/BooksList";
const styles = {
  fabContainer: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
};

const dependencies = {
  booksApi: new BooksApi(),
};

function App() {
  const book = {
    imageUrl:
      "https://www.shutterstock.com/image-vector/education-concept-stack-colored-books-260nw-587795549.jpg",
    title: "title",
    author: "author",
  };
  return (
    <DependencyProvider
      dependencies={dependencies}
      children=<ThemeProvider theme={theme}>
        <div className="MyReads">
          <AppBar />
          <BooksList />
          <div style={styles.fabContainer}>
            <FabButton />
          </div>
        </div>
      </ThemeProvider>
    ></DependencyProvider>
  );
}

export default App;
