import logo from "./logo.svg";
import "./App.css";
import AppBar from "./components/AppBar";
import { ThemeProvider, makeStyles } from "@material-ui/core";
import theme from "./theme/Theme";
import { DependencyProvider } from "./di/DependencyProvider";
import BooksApi from "./api/BooksApi";
import BooksList from "./components/BooksList";
import LocalStorageService from "./service/LocalStorageService";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "./components/Search";

const dependencies = {
  booksApi: new BooksApi(),
  localStorageService: new LocalStorageService(),
};

function App() {
  let navigate = useNavigate();

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
        <Routes>
        <Route
            exact
            path="/"
            element={
              <div>
                <AppBar title = "My Reads 📚" />
                <BooksList onTapSearch={() => navigate('/search')} />
              </div>
            }
          />
              <Route
            exact
            path="/search"
            element={
              <Search/>
            }
          />
        </Routes>
      </ThemeProvider>
    ></DependencyProvider>
  );
}

export default App;
