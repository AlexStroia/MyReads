import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
const useStyles = makeStyles({
  card: {
    borderRadius: "10px",
    boxShadow: "1px 1px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)",
    backgroundColor: "#FFFFFF",
    display: "inline-block",
  },
});

const Card = ({ children, onTap }) => {
  const styles = useStyles();

  const handleClick = () => {
    if(onTap != null) {
      onTap();
    }
  }

  return <div 
  onClick={handleClick}
  className={styles.card}>{children}</div>;
};

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  onTap: PropTypes.func,
};
