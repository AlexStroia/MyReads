import { createTheme, responsiveFontSizes } from "@material-ui/core"


const theme = responsiveFontSizes(createTheme({
    spacing: 4,
    typography: {
        fontFamily: [
            'Roboto',
            'Raleway',
            'Open Sans',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontFamily: 'Raleway',
        },
        h2: {
            fontSize: '3.5rem',
            fontFamily: 'Open Sans',
            fontStyle: 'bold',
        },
        h3: {
            fontSize: '2.5rem',
            fontFamily: 'Roboto',
        },
        h4: {
            fontSize: '2rem',
            fontFamily: 'Open Sans',
            fontWeight: 'bold',
          },
          body1: {
            fontSize: '1.2rem',
            fontFamily: 'Roboto',
          },
          subtitle1: {
            fontSize: '1.0rem',
            fontFamily: 'Raleway',
            fontStyle: 'italic',
          },
    },
    palette: {
        background: {
            default: '#009900'//green
        },
        primary: {
            main: '#2B37D4',//indigo
            white: "#FFFFFF", // white
        },
        secondary: {
            main: '#E769A6',//pink
        },
        error: {
            main: '#D72A2A',//red
        },
        warning: {
            main: '#FC7B09',//orange
        },
        info: {
            main: '#6B7D6A',//gray
        },
        success: {
            main: '#09FE00',//green
        },
        text: {
            primary: '#FFFFFF',//white
            secondary: '#000000',//black
        },
    },
}));
  
  
export default theme;