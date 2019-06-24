import React from 'react';
import './App.css';
import {Container, Divider, Header} from "semantic-ui-react";
import TimerDashboard from "./Components/TimerDashboard";

function App() {
  return (
    <Container>
      <Header as="h1" textAlign='center' style={{padding: '20px'}}> Timers </Header>
      <Divider />

      <TimerDashboard />
    </Container>
  );
}

export default App;
