
import Card from 'react-bootstrap/Card';
 
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);



function Home() {
    const [header, setHeader] = useState("Response from AI:")
    const [response, setResponse] = useState("... awaiting response")

    async function fetchOpenAi(prompt) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        return response;

    }

    function onFormSubmit(e) {
        e.preventDefault()
    
        const formData = new FormData(e.target),
        formDataObject = Object.fromEntries(formData.entries())
        console.log(formDataObject.description)

        fetchOpenAi(`Generate ideas for an icebreaker for ${formDataObject.description}`).then((data) => {
            console.log(`data from open ai ${JSON.stringify(data)}`)
            setHeader(`AI Results for: ${formDataObject.description} Icebreakers`);
            setResponse(data.data.choices[0].text);
        })
        

        
    }

	return (
        <div>
            <br/>
            <h1>Welcome to an AI Powered Icebreaker Generator!</h1>
            <br/>
            <Form  onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Generate Icebreakers here</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Enter description of the type of icebreaker you want here" />
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
