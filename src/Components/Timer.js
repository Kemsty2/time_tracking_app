import React from "react";
import { Grid, Card, Button, Header } from 'semantic-ui-react';

class Timer extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Card centered color="green">
            <Card.Content>
              <Button
                icon="trash"
                basic
                circular
                color="red"
                className="right floated"
              />
              <Button
                icon="edit"
                basic
                circular
                color="grey"
                className="right floated"
              />
              <Card.Header>Steve Sanders</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description textAlign="center">
                <Header as="h1">00 : 00</Header>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color="green" className="bottom attached fluid">
                Start
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Timer;
