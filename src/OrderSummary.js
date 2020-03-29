import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { AMOUNT, NAME } from "./Queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function OrderSummary(props) {
  const classes = useStyles();
  const [selectedvalue, setSelectedValue] = React.useState("cash");
  const client = useApolloClient();
  const { history } = props;
  const handleNext = e => {
    client.writeData({ data: { selectedvalue: selectedvalue } });

    history.push(selectedvalue === "cash" ? "/success" : "/carddet");
  };

  const { data: amount } = useQuery(AMOUNT);
  const { data: name } = useQuery(NAME);
  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div>
        <CardContent>
          <h4>Order details</h4>
          <p>
            Dear {name.name} your order of {amount.amount} is confirmed please
            select the payment mode to proceed
          </p>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment"
              name="pay"
              value={selectedvalue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on delivery"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Card payment"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions style={{ float: "right" }}>
          {/* <Link to={selectedvalue === "cash" ? "/success" : "/carddet"}> */}
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {selectedvalue === "cash" ? "Confirm" : "Proceed to pay"}
          </Button>
          {/* </Link> */}
        </CardActions>
      </div>
    </>
  );
}
