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
import { AMOUNT, NAME, FROMCURRENCY, TOCURRENCY, EXCHAMOUNT } from "./Queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";

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
  const { data: fromcurrency } = useQuery(FROMCURRENCY);
  const { data: tocurrency } = useQuery(TOCURRENCY);
  const { data: exchamount } = useQuery(EXCHAMOUNT);
  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div>
        <CardContent>
          <h4>Order details</h4>
          <p>
            Dear {name.name} ,please confirm your order details and proceed with
            the payment.
          </p>
          <div style={{ backgroundColor: "#ffe9c6" }}>
            <Grid container spacing={24}>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <p>Exchange rate</p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold" }}>
                  {exchamount.exchamount.toFixed(2)}
                </p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p>{tocurrency.tocurrency}</p>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <p>Equivalent amount</p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold" }}>
                  {amount.amount > 0
                    ? Number(
                        exchamount.exchamount.toFixed(2) * Number(amount.amount)
                      ).toFixed(2)
                    : 0}
                </p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p>{tocurrency.tocurrency}</p>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <p>Fee</p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold" }}>
                  {amount.amount > 0 ? Number(amount.amount) * 0.02 : 0}
                </p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p>{fromcurrency.fromcurrency}</p>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <p>Total payable amount</p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold" }}>
                  {" "}
                  {amount.amount > 0
                    ? Number(amount.amount) * 0.02 + Number(amount.amount)
                    : 0}
                </p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <p>{fromcurrency.fromcurrency}</p>
              </Grid>
            </Grid>
          </div>
          <h4>Select a payment option to proceed</h4>
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
