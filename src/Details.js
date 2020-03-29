import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useApolloClient } from "@apollo/react-hooks";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function Details(props) {
  const classes = useStyles();
  const client = useApolloClient();
  const [name, setName] = React.useState();
  const { history } = props;
  const handleNext = e => {
    client.writeData({ data: { name: name } });

    history.push("/summary");
  };
  const handlename = event => {
    setName(event.target.value);
  };
  return (
    <>
      <div>
        <CardContent>
          <h4>Enter the details</h4>
          <TextField
            required
            id="standard-required"
            label="Name"
            onChange={handlename}
            value={name}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            required
            id="standard-required"
            label="Contact  number"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            required
            id="standard-required"
            label="E-mail"
            variant="outlined"
          />{" "}
          <br />
          <br />
          <TextField
            required
            id="standard-required"
            label=" GovtId Number"
            variant="outlined"
          />
          <p style={{ fontSize: "11px" }}>
            Please enter the valid Govt ID number this will be verified at the
            time of delivery
          </p>
        </CardContent>
        <CardActions style={{ float: "right" }}>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Continue
          </Button>
        </CardActions>
      </div>
    </>
  );
}
