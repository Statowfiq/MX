import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Money from "./money.jpg";

const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    margin: "20px"
  },
  button: {
    // backgroundColor: "green",
    // color: "white",
    // margin: theme.spacing(1)
    float: "center"
  }
}));

export default function Select() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");
  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <div className="Card">
      <Card className={classes.root} variant="outlined">
        <CardHeader title="Exchange Money Now" />
        <img src={Money} style={{ width: "150px", height: "80px" }} />
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-select-currency"
                select
                label="From"
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="TO"
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="standard-required"
                label="Enter Amount"
                // helperText="Enter Amount"
              />
            </div>
          </form>
        </CardContent>
        {/* <CardActions style={{ float: "right" }}> */}
        <Button className={classes.button} variant="contained" color="primary">
          Next
        </Button>
        {/* </CardActions> */}
      </Card>
    </div>
  );
}
