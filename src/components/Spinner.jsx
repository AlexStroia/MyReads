import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    spinnerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
}));

const Spinner = () => {
    const styles = useStyles();
return <div className={styles.spinnerContainer}>
    <CircularProgress/>
</div>
}

export default Spinner;