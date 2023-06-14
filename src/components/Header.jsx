import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  h3: {
    textAlign: "start";
    color: theme.palette.text.secondary;
  }
});

const Header = (title) => {
  const styles = useStyles();
  return <Typography className={styles.h3} variant="h3"></Typography>;
};

export default Header;
