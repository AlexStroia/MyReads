import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import theme from './theme/theme';
import FabButton from './components/FabButton';
import Book from './components/Book';
const styles = {
  fabContainer: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
};

function App() {
  const book = {
    imageUrl:     "https://www.shutterstock.com/image-vector/education-concept-stack-colored-books-260nw-587795549.jpg",
    title: 'title',
    author: 'author'
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="MyReads">
        <AppBar />
        <Book book={book} />
        <div style={styles.fabContainer}>
          <FabButton />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
