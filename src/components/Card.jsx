import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    borderRadius: "10px",
    boxShadow: "1px 1px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)",
    padding: "16px",
    margin: "16px",
    backgroundColor: "#FFFFFF",
    display: "inline-block",
  },
});

const Card = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.card}>{children}</div>;
};

export default Card;
