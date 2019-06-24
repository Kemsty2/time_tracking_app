import React from "react";
import { Grid, Card, Button, Form } from "semantic-ui-react";

class TimerForm extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Card centered color="green">
            <Card.Content>
              <Card.Header>
                 Create Timer
              </Card.Header>
              <Card.Description textAlign="center">
                <Form>
                  <Form.Field>
                    <input placeholder="First Name" />
                  </Form.Field>
                  <Form.Field>
                    <input placeholder="Last Name" />
                  </Form.Field>
                </Form>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Create
                </Button>
                <Button basic color="red">
                  Cancel
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TimerForm;
