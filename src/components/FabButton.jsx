import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: theme.palette.primary.light,
  },
  addIcon: {
    color: theme.palette.primary.white,
  },
}));

const FabButton = ({ onClick }) => {
  const styles = useStyles();
  return (
    <Fab onClick={onClick} className={styles.fab} aria-label="add">
      <AddIcon className={styles.addIcon} />
    </Fab>
  );
};

export default FabButton;

FabButton.prototypes = {
  onClick: PropTypes.func.isRequired,
};
