import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  container: {
    display: "flex"
  },
  cssLabel: {
    color: "white !important"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  }
}));

export default function Door(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const { history } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNext = e => {
    if (street === "" || city === "" || state === "" || zip === "") {
      setOpen(true);
      console.log("street", street, "city", city, "state", state, "zip", zip);
    } else {
      history.push("/details");
    }
  };
  const handleSChange = event => {
    setStreet(event.target.value);
  };
  const handleCChange = event => {
    setCity(event.target.value);
  };
  const handleStChange = event => {
    setState(event.target.value);
  };
  const handleZChange = event => {
    setZip(event.target.value);
  };
  return (
    <div style={{ padding: "0" }}>
      <h4>Enter the address where you want the cash to be delivered</h4>
      <form>
        <TextField
          required
          id="standard-required"
          label="Street Address"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleSChange}
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
          label="City"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleCChange}
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
          label="State"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleStChange}
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
          label="Zip code"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleZChange}
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
        <div>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Enter all required fields to continue
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
