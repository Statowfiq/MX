import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Leftarrow from "./arrow1.svg";
import currencies from "./currencies.json";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { useApolloClient } from "@apollo/react-hooks";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "20px",
    marginLeft: "40px",
    // marginTop: "50px",
    height: "483px"
  },
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

export default function Select(props) {
  const classes = useStyles();
  const [fromcurrency, setFromCurrency] = React.useState("USD");
  const [tocurrency, setToCurrency] = React.useState("AUD");
  const [amount, setAmount] = React.useState("");
  const [exchamount, setExchAmount] = React.useState(0);
  const isDisabled = Number(amount) <= 0;
  const client = useApolloClient();
  const { history } = props;
  const [open, setOpen] = React.useState(false);

  const handleNext = e => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      setOpen(true);
    } else {
      client.writeData({ data: { tocurrency: tocurrency } });
      client.writeData({ data: { fromcurrency: fromcurrency } });
      client.writeData({ data: { exchamount: exchamount } });
      client.writeData({ data: { amount: amount } });

      history.push("/deliveryoption");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function foo() {
    //  const base = "USD";
    const result = await axios(
      `https://api.exchangeratesapi.io/latest?symbols=${tocurrency}&base=${fromcurrency}`
    );
    setExchAmount(result.data.rates[tocurrency]);
  }
  const handleFChange = event => {
    setFromCurrency(event.target.value);
    //  foo();
  };
  const handleTChange = event => {
    setToCurrency(event.target.value);
    //  foo();

    // foo();
  };
  const handleamount = event => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    foo();
  }, [fromcurrency, tocurrency]);

  return (
    <div>
      <CardHeader title="Exchange Money Now" style={{ tesxtAlign: "left" }} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Enter a valid amount
        </Alert>
      </Snackbar>
      <CardContent>
        <form>
          {fromcurrency === tocurrency
            ? alert("Select different from and to currencies")
            : null}
          <TextField
            id="standard-select-currency"
            select
            label="From"
            value={fromcurrency}
            onChange={handleFChange}
            style={{ float: "left" }}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <img
            src={Leftarrow}
            style={{
              // width: "42px",
              height: "38px",
              margin: "15px"
            }}
          />
          <TextField
            id="standard-select-currency"
            select
            label="To"
            value={tocurrency}
            onChange={handleTChange}
            style={{ float: "right" }}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            required
            id="standard-required"
            label="Enter Amount"
            //helperText="Enter Amount"
            onChange={handleamount}
            value={amount}
            variant="outlined"
            type="Number"
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
          <Grid container spacing={24} justify="space-between">
            <Grid item xs={8} style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "0" }}>Exchange rate</p>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0" }}>
                {exchamount.toFixed(2)}
              </p>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "right" }}>
              <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                {tocurrency}
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={24} justify="space-between">
            <Grid item xs={8} style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "0" }}>Equivalent amount</p>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0" }}>
                {amount > 0
                  ? Number(exchamount.toFixed(2) * Number(amount)).toFixed(2)
                  : 0}
              </p>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "right" }}>
              <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                {tocurrency}
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={12} justify="space-between">
            <Grid item xs={8} style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "0" }}>Fee</p>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0" }}>
                {amount > 0 ? Number(amount) * 0.02 : 0}
              </p>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "right" }}>
              <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                {fromcurrency}
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={12} justify="space-between">
            <Grid item xs={8} style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "0" }}>Total payable amount</p>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "0"
                }}
              >
                {amount > 0 ? Number(amount) * 0.02 + Number(amount) : 0}
              </p>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "right" }}>
              <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                {fromcurrency}
              </p>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          // color="primary"
          onClick={handleNext}
          // disabled={isDisabled}
        >
          Continue
        </Button>
      </CardActions>
      {/* </Card> */}
    </div>
  );
}
