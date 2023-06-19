import "./App.css";
import AppBar from "./components/AppBar";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme/Theme";
import { DependencyProvider } from "./di/DependencyProvider";
import BooksApi from "./api/BooksApi";
import BooksList from "./components/BooksList";
import LocalStorageService from "./service/LocalStorageService";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchList from "./components/SearchList";
import BookDetail from "./components/BookDetail";

const dependencies = {
  booksApi: new BooksApi(),
  localStorageService: new LocalStorageService(),
};

function App() {
  let navigate = useNavigate();
  return (
    <DependencyProvider dependencies={dependencies}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <AppBar title="My Reads 📚" />
                <BooksList
                  onTapSearch={() => navigate("/search")}
                  onTapBook={(id) => navigate(`/detail/${id}`)}
                />
              </div>
            }
          />
          <Route path="/search" element={<SearchList />} />
          <Route
            path="/detail/:id"
            element={<BookDetail/>}
          />
        </Routes>
      </ThemeProvider>
    </DependencyProvider>
  );
}

export default App;
