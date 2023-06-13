import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme = {theme}>
       <div className="MyReads">
      <AppBar/>
    </div>
    </ThemeProvider>
  
  );
}

export default App;
