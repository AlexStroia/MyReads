import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  h2: {
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  emoji: {
    fontSize: "3.5rem",
  },
  appbarTitle: {
    display: "flex",
    justifyContent: "center",
  },
}));

const AppBar = ({title, emoji}) => {
  const styles = useStyles();
  return (
    <div className={styles.appBar}>
      <div className={styles.appbarTitle}>
        <Typography className={styles.h2} variant="h2">
         {title} 
        </Typography>
        <div className={styles.emoji}>{emoji}</div>
      </div>
    </div>
  );
};

export default AppBar;
