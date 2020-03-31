import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useApolloClient } from "@apollo/react-hooks";
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

export default function Details(props) {
  const classes = useStyles();
  const client = useApolloClient();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [no, setNo] = React.useState("");
  const [id, setId] = React.useState("");
  const { history } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleNext = e => {
    if (name === "" || email === "" || no === "" || id === "") {
      setOpen(true);
    } else {
      client.writeData({ data: { name: name } });

      history.push("/summary");
    }
  };
  const handlename = event => {
    setName(event.target.value);
  };
  const handlemail = event => {
    setEmail(event.target.value);
  };
  const handleno = event => {
    setNo(event.target.value);
  };
  const handleid = event => {
    setId(event.target.value);
  };
  return (
    <>
      <div>
        <CardContent>
          {/* <div style={{ padding: "24px" }}> */}
          <h4>Personal Details</h4>
          <TextField
            required
            id="standard-required"
            label="Name"
            onChange={handlename}
            value={name}
            variant="outlined"
            style={{ width: "100%" }}
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
            label="Contact  number"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleno}
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
            label="E-mail"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handlemail}
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
            label=" GovtId Number"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleid}
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
          {/* </div> */}
          <p style={{ fontSize: "11px", textAlign: "left" }}>
            Please enter the valid Govt ID number this will be verified at the
            time of delivery
          </p>
        </CardContent>
        <CardActions style={{ float: "right", paddingRight: "24px" }}>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            onClick={handleNext}
          >
            Continue
          </Button>
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
