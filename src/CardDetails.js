import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function CardDetails() {
  const classes = useStyles();

  return (
    <>
      <div>
        <CardContent>
          <h4>Enter the card details</h4>
          <TextField
            required
            id="standard-required"
            label="Card no"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            required
            id="standard-required"
            label="cvv"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </CardContent>
        <CardActions style={{ float: "right" }}>
          <Link to="/success">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
          </Link>
        </CardActions>
      </div>
    </>
  );
}
