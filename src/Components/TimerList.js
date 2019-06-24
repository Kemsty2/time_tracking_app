import React from "react";
import { Grid } from "semantic-ui-react";
import EditableTimer from "./EditableTimer";

class TimerList extends React.Component {
  render() {
    return (
      <Grid>
        <EditableTimer />
        <EditableTimer />
      </Grid>
    );
  }
}

export default TimerList;
