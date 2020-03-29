import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Door from "./DoorDel";
import Center from "./CenterDel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function DeliveryOpts(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { history } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNext = e => {
    history.push("/det");
  };

  return (
    <div>
      <CardContent>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label=" tabs ">
              <Tab label="Door Step Delivery" {...a11yProps(0)} />
              <Tab label="Collect at Center" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Door />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Center />
          </TabPanel>
        </div>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        {/* <Link to="/det"> */}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Continue
        </Button>
        {/* </Link> */}
      </CardActions>
      {/* </Card> */}
    </div>
  );
}
