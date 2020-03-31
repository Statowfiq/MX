import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import centers from "./centers.json";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.action.disabled,
    color: "white",
    width: "83%",
    padding: "10px"
  },
  normal: {
    width: "83%",
    padding: "10px"
  },
  button: {
    float: "right",
    marginTop: "31px",
    marginRight: "3px",
    height: "38px",
    backgroundColor: theme.palette.action.active
  }
}));
const List = ({ active, cen, onClick, onMouseEnter }) => {
  const classes = useStyles();
  return (
    <div>
      <Card
        variant="outlined"
        key={cen.id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseEnter}
        className={active ? classes.root : classes.normal}
        onClick={onClick}
      >
        <p
          style={{
            width: "60%",
            margin: "0px",
            textAlign: "left",
            float: "left"
          }}
        >
          <b>{cen.Name}</b>
          <p style={{ fontSize: "14px", margin: "0px" }}>
            {cen.Address}
            <br />
            {cen.Time}
          </p>
        </p>

        <Button type="submit" variant="contained" className={classes.button}>
          Select
        </Button>
      </Card>
      <br />
    </div>
  );
};

export default function Center(props) {
  const [chosen, setChosen] = React.useState();
  const { history } = props;
  console.log("history here", history);
  return (
    <div>
      <h4>Select a Cashier Center</h4>

      <p>
        {centers.map(cen => (
          <List
            key={cen.id}
            cen={cen}
            active={cen === chosen}
            onClick={() => {
              setChosen(cen);

              history.push("/details");
            }}
            onMouseEnter={() => {
              setChosen(cen);
            }}
          />
        ))}
      </p>
    </div>
  );
}
