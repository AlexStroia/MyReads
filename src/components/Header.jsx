import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  h3: {
    textAlign: "start",
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    marginBottom: theme.spacing(2),
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.h3} variant="h3">
      {title}
    </Typography>
  );
};

export default Header;