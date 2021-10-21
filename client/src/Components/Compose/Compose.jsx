import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useAlert } from 'react-alert';

export default function Compose(props) {
  const [message, setMessage] = useState("");
  const alert = useAlert()
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('You clicked submit');
    const info = new FormData();
    info.append('message', message);
    setMessage("")
    console.log(props.webURL + "/message");
    const RequestMessage = "Bearer " + props.messageToken;
    console.log(RequestMessage);
    await axios.post(props.webURL + "/message", info, {
      headers: {
        'Authorization': RequestMessage,
      }
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("correct token")
          console.log(response.headers)
          // console.log(response.data)
          props.messageTokenHandler(response.headers.token);
        }
        if (response.status === 409) {
          console.log("incorrect token")
          props.messageTokenHandler(response.headers.token);
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        alert.error("Error message")
      });
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label>Send a Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit">
          Send
        </Button>
      </Form>
    </div>
  )
};
