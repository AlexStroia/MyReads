import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: theme.palette.primary.light,
  },
  addIcon: {
    color: theme.palette.primary.white,
  },
}));

const FabButton = () => {
  const styles = useStyles();
  return (
    <Fab className={styles.fab} aria-label="add">
      <AddIcon className={styles.addIcon} />
    </Fab>
  );
};

export default FabButton;
