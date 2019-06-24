import React from "react";
import TimerForm from './TimerForm';
import { Icon, Button, Grid } from "semantic-ui-react";

class TimerAdd extends React.Component {
  render() {
    return (
      <Grid>
        <TimerForm />
      </Grid>
    );
  }
}

class TimerAddButton extends React.Component {

  render(){
    return (
      <Grid>
        <Grid.Row centered>
          <Button icon circular basic color="green">
            <Icon name="plus" />
          </Button>
        </Grid.Row>
      </Grid>
    )
  }
}

export default TimerAdd;
