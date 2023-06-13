import { makeStyles } from "@material-ui/core";
import theme from "../theme/theme";
import Typography from "@material-ui/core/Typography";
import BookIcon from "@material-ui/icons/Book";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  h2: {
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  bookEmoji : {
    fontSize: '3.5rem'
  },
  appbarTitle : {
    display : 'flex',
    justifyContent: 'center'
  }
}));

const AppBar = () => {
  const styles = useStyles();
  return (
    <div className={styles.appBar}>
      <div className={styles.appbarTitle}>
        <Typography className={styles.h2} variant="h2">
          My Reads
        </Typography>
        <div className={styles.bookEmoji}> 📚</div>
      </div>
    </div>
  );
};

export default AppBar;
