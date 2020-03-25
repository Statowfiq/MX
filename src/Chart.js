import React, { useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const useStyles = makeStyles({
  root: {
    height: "483px"
  }
});

export default function Chart() {
  const classes = useStyles();
  // displayName: "LineExample",
  const [rates, setRate] = React.useState([]);
  const fetchData = async () => {
    return "abc";
    // try {
    //   return await axios.get(
    //     `https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-02-01&base=USD`
    //   );
    // } catch (error) {}
    // await axios
    //   .get(
    //     `https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-02-01&base=USD`
    //   )
    //   .then(res => {
    //     const rates = res.data;
    //     // setRate(res.data);
    //     //console.log(res.data);
    //   });
  };

  useEffect(() => {
    const x = fetchData();
    console.log(x);
  }, []);
  return (
    <div style={{ margin: "20px" }}>
      <Card className={classes.root}>
        <CardContent>
          <Line data={data} />
          {/* <p>
        {rates.map(rate => (
          <li>{rate.rates}</li>
        ))}
      </p> */}
        </CardContent>
      </Card>
    </div>
  );
}
