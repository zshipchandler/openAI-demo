
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import CardGroup from 'react-bootstrap/CardGroup';
 
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
const {Configuration, OpenAIApi} = require("openai");


function Home() {
    const [header, setHeader] = useState("Response from AI:")
    const [response, setResponse] = useState("... awaiting response")

    function onFormSubmit(e) {
        e.preventDefault()
    
        const formData = new FormData(e.target),
        formDataObject = Object.fromEntries(formData.entries())
        console.log(formDataObject.description)

        setHeader(`AI Results for: ${formDataObject.description}`)
        setResponse(`Update to show response`)
    }

	return (
        <div>
            <br/>
            <h1>Welcome to an AI Powered Generator!</h1>
            <br/>
            <Form  onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Generate X here</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Enter description here" />
                    <Form.Text className="text-muted">
                    The more specific the description, the better the response.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" size="lg" type="submit">
                    Get AI Response
                </Button>
            </Form>
            <br/>
            <br/>

            <Card>
                <Card.Body>
                    <Card.Title><h1>{header}</h1></Card.Title>
                    <hr/>
                    <br/>
                    <Card.Text>
                        <h4>
                            {response}
                        </h4>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
	);
  }

export default Home;
