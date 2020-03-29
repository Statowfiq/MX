import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import currencies from "./currencies.json";

const useStyles = makeStyles({
  root: {
    height: "550px"
  }
});

export default function Chart() {
  const classes = useStyles();

  // const [data, setData] = useState({ rates: [] });
  const [xaxis, setxaxis] = useState([]);
  const [yaxis, setyaxis] = useState([]);
  const [currency, setCurrency] = React.useState("CAD");

  const handleChange = event => {
    setCurrency(event.target.value);

    // foo();
  };

  function sortKeys(obj_1) {
    var key = Object.keys(obj_1).sort(function order(key1, key2) {
      if (key1 < key2) return -1;
      else if (key1 > key2) return +1;
      else return 0;
    });

    // Taking the object in 'temp' object
    // and deleting the original object.
    var temp = {};

    for (var i = 0; i < key.length; i++) {
      temp[key[i]] = obj_1[key[i]];
      delete obj_1[key[i]];
    }

    // Copying the object from 'temp' to
    // 'original object'.
    for (var i = 0; i < key.length; i++) {
      obj_1[key[i]] = temp[key[i]];
    }
    console.log(obj_1);
    return obj_1;
  }
  const data1 = {
    //  labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: xaxis,
    datasets: [
      {
        label: "Exchange Rates",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: [65, 59, 80, 81, 56, 55, 40]
        data: yaxis
      }
    ]
  };
  async function foo() {
    //  const base = "USD";
    const result = await axios(
      `https://api.exchangeratesapi.io/history?start_at=2019-03-01&end_at=2019-03-28&symbols=${currency}&base=USD`
    );

    setxaxis(Object.keys(sortKeys(result.data.rates)));
    setyaxis(Object.values(result.data.rates).map(x => x[currency]));
  }
  useEffect(() => {
    foo();
  }, [currency]);

  return (
    <div style={{ margin: "20px" }}>
      <Card className={classes.root}>
        <CardContent>
          <TextField
            style={{ width: "350px", float: "left" }}
            id="standard-select-currency"
            select
            label="Select a currency to see the exchange rate "
            value={currency}
            onChange={handleChange}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <Line data={data1} />
        </CardContent>
      </Card>
    </div>
  );
}
