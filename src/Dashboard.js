import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";
import Header from "./Header";
import Chart from "./Chart";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <Header />
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <Chart />
        </Grid>
        <Grid item xs={4}>
          <Select />
        </Grid>
      </Grid>
    </>
  );
}
