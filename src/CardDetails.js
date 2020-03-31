import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  button: {
    float: "right",
    backgroundColor: theme.palette.action.active
  },

  cssLabel: {
    color: "white !important"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  }
}));

export default function CardDetails(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cardno, setCardno] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const { history } = props;
  const handleCardno = event => {
    setCardno(event.target.value);
  };
  const handlecvv = event => {
    setCvv(event.target.value);
  };
  const handleNext = e => {
    e.preventDefault();
    if (cardno === "" || cvv === "") {
      setOpen(true);
    } else {
      history.push("/success");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
            type="number"
            onChange={handleCardno}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
          />
          <br />
          <br />
          <TextField
            required
            id="standard-required"
            label="cvv"
            variant="outlined"
            style={{ width: "100%" }}
            type="number"
            onChange={handlecvv}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
          />
        </CardContent>
        <CardActions style={{ float: "right" }}>
          {/* <Link to="/success"> */}
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleNext}
          >
            Continue
          </Button>
          {/* </Link> */}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Enter all required fields
            </Alert>
          </Snackbar>
        </CardActions>
      </div>
    </>
  );
}
