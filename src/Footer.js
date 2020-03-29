import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white",
    textAlign: "center"
  }
});

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.footer}>
        <p style={{ wordSpacing: "1cm" }}>
          {<HomeIcon fontSize="small" />}
          <Link color="inherit" href="#">
            Home
          </Link>{" "}
          <Link color="inherit" href="#">
            About
          </Link>{" "}
          <Link color="inherit" href="#">
            Terms
          </Link>{" "}
          <Link color="inherit" href="#">
            Help
          </Link>{" "}
          <Link color="inherit" href="#">
            Contact
          </Link>
        </p>
        &copy; {new Date().getFullYear()} Copyright: Cashier
      </div>
    </>
  );
}
