import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Exchange from "./compare_arrows-24px.svg";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import currencies from "./currencies.json";
import axios from "axios";
import { useApolloClient } from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "20px",
    marginLeft: "40px",
    // marginTop: "50px",
    height: "483px"
  },
  button: {
    float: "right"
  }
}));

// function validate(amount) {
//   // true means invalid, so our conditions got reversed
//   return {
//     amount: Number(amount) <= 0
//   };
// }

export default function Select(props) {
  // const errors = validate(amount);
  const classes = useStyles();
  const [fromcurrency, setFromCurrency] = React.useState("USD");
  const [tocurrency, setToCurrency] = React.useState("INR");
  const [amount, setAmount] = React.useState("");
  const [exchamount, setExchAmount] = React.useState(0);
  const isDisabled = Number(amount) <= 0;
  const client = useApolloClient();
  const { history } = props;
  const handleNext = e => {
    e.preventDefault();
    client.writeData({ data: { tocurrency: tocurrency } });
    client.writeData({ data: { fromcurrency: fromcurrency } });
    client.writeData({ data: { exchamount: exchamount } });
    client.writeData({ data: { amount: amount } });

    history.push("/delopt");
  };

  async function foo() {
    //  const base = "USD";
    const result = await axios(
      `https://api.exchangeratesapi.io/latest?symbols=${tocurrency}&base=${fromcurrency}`
    );
    setExchAmount(result.data.rates[tocurrency]);
    console.log(result.data.rates[tocurrency]);
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
      <CardHeader title="Exchange Money Now" />
      <CardContent>
        <form>
          {/* {fromcurrency === tocurrency
            ? alert("Select different from and to currencies")
            : null} */}
          <TextField
            id="standard-select-currency"
            select
            label="From"
            value={fromcurrency}
            onChange={handleFChange}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <img
            src={Exchange}
            style={{ width: "75px", height: "60px", margin: "5px" }}
          />
          <TextField
            id="standard-select-currency"
            select
            label="TO"
            value={tocurrency}
            onChange={handleTChange}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            id="standard-required"
            label="Enter Amount"
            // helperText="Enter Amount"
            onChange={handleamount}
            value={amount}
          />
          <Typography>
            Exchange rate:
            {exchamount.toFixed(2)} {tocurrency}
          </Typography>
          <Typography>
            Equivalent amount:
            {amount > 0
              ? Number(exchamount.toFixed(2) * Number(amount)).toFixed(2)
              : 0}{" "}
            {tocurrency}
          </Typography>

          <Typography>
            Fee:{amount > 0 ? Number(amount) * 0.02 : 0} {fromcurrency}
          </Typography>
          <Typography>
            Total payable amount:
            {amount > 0 ? Number(amount) * 0.02 + Number(amount) : 0}{" "}
            {fromcurrency}
          </Typography>
        </form>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        {/* <Link to="/delopt"> */}
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isDisabled}
        >
          Next
        </Button>
        {/* </Link> */}
      </CardActions>
      {/* </Card> */}
    </div>
  );
}
