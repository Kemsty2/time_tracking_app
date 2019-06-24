import React from "react";
import {Container} from "semantic-ui-react";
import TimerList from "./TimerList";
import TimerAdd from "./TimerAdd";

class TimerDashboard extends React.Component {
  
  render(){
    return (
      <Container>
        <TimerList/>
        <TimerAdd/>
      </Container>
    );
  }
}

export default TimerDashboard;
