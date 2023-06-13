import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import theme from './theme/theme';
import FabButton from './components/FabButton';

const styles = {
  fabContainer: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="MyReads">
        <AppBar />
        <div style={styles.fabContainer}>
          <FabButton />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
