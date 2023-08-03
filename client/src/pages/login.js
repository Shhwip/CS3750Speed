import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import sha256 from 'crypto-js/sha256';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';




export default function LoginPage() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    function AlertError() {
  
        if (show) {
          return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Username or password are incorrect
              </p>
            </Alert>
          );
        }
      }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            let clientHashedPassword = ""
            // Fetch the salt
            const saltResponse = await fetch("http://localhost:5050/api/authentication/getSalt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            })
            .then(response => {
                // Check if the request was successful
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error('Server response: ' + response.status);
                }
            })
            .then(data => {
                
                const { salt } = data;
                console.log(password);
                console.log(salt);
                console.log(sha256(password + salt).toString());
            
                clientHashedPassword = sha256(password + salt).toString();
                console.log(clientHashedPassword);
            })
            .catch(error => {
                setShow(true);
                console.error('Error:', error);
            });

            const isMatch = await fetch("http://localhost:5050/api/authentication/login", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: clientHashedPassword }),
            })
            .then(response => {
                // Check if the request was successful
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error('Server response: ' + response.status);
                }
            })
            .then(data => {
                
                const { match } = data;
                //console.log(sha256(password).toString());
                if(match){
                    navigate("/lobby")
                }
                else{
                    throw new Error();
                }
            })
            .catch(error => {
                setShow(true);
                console.error('Error:', error);
            });
        }

        setValidated(true);
    };
    return (
    <div>
    
    <Container>
        <AlertError />
        <Row>
            <Col md={6}>
                <h1>Login</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            required
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            required
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            name="doNotLogout"
                            type="checkbox"
                            label="Do not logout"
                        />
                    </Form.Group>

                    <Row className="pb-2">
                        <Col>
                            Don't you have an account?
                            <Link to={"/register"}> Register </Link>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Login
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    </div>)
}