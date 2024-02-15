import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import './app.css';
import { FaAccusoft, FaGithub, FaSearch } from 'react-icons/fa';

const API = 'http://localhost:8000/api/sentiment/';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [result, setResult] = useState('');
  const [model, setModel] = useState('nltk');

  const apiCall = async (dat) => {

    const api = API + model + '/';

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: dat})
    });
    const data = await response.json();
    setResult(data['Sentiment']);
  }

  const handleClick = () => {
    apiCall(textAreaValue);
  }

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
    console.log(JSON.stringify({text: event.target.value}));
  }

  const handleModelChange = (event) => {
    setModel(event.target.value);
    console.log(event.target.value);
  }

  return (
    <>
      <Container className='p-3 mt-4'>
        <h1 className="text-center mb-5">SENTIMENT ANALYSIS TOOL <FaSearch/></h1>
        <Form.Label className="mb-2 font-weight-bold fs-5">Choose a model to analyze text:</Form.Label>
        <Form.Select aria-label="nltk" onChange={handleModelChange} className='mb-3'>
          <option value="nltk">nltk</option>
          <option value="svc">svc</option>
          <option value="bayes">bayes</option>
          <option value="test">test</option>
        </Form.Select>
        <InputGroup size="lg">
          <Form.Control 
            as="textarea" 
            aria-label="With textarea" 
            rows={13} 
            columns={200}
            value={textAreaValue} 
            onChange={handleTextAreaChange} 
          />
        </InputGroup>
        <InputGroup>
          <Button variant="dark" size="lg mt-2 fs-4" onClick={handleClick} id='button'>Analyze text now</Button>
        </InputGroup>

        {result && (
          <div key={result} id='result' className={`text-center text-white mt-2 p-3 dark ${result ? 'fade-in' : ''}`}>
            <h2>{result}</h2>
          </div>
        )}


        <h4 className="mt-5 text-center">
          Source code available at <a href="https://github.com/janneheldan" className="text-decoration-none text-dark"><FaGithub/></a>
        </h4>
      </Container>
    </>
  )
}

export default App
