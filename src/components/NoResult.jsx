import { Typography, makeStyles } from "@material-ui/core"

const useStyles =  makeStyles((theme) => ({
    noResult : {
        textAlign: 'center',
        alignItems: 'center'
    }
}));


const NoResult = () => {
    const styles = useStyles();
    return <Typography
    className={styles.noResult}
    variant = "h3">No result 😔</Typography>
}

export default NoResult;