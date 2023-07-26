import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";

var CryptoJS = require("crypto-js");

export default function RegisterForm() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("");
  const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const [usernameFeedback, setUsernameFeedback] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");

  const onChange = () => {
    const password = document.querySelector("input[name = password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;

    // check if password is valid
    if (!regex.test(password.value)) {
      setPasswordFeedback("Invalid password");
      setPasswordIsInvalid(true);
    } else {
      setPasswordFeedback("");
      setPasswordIsInvalid(false);
    }

    if (confirm.value !== password.value) {
      setConfirmPasswordFeedback("Passwords do not match.");
      setConfirmPasswordIsInvalid(true);
    } else {
      setConfirmPasswordFeedback("");
      setConfirmPasswordIsInvalid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;

    // Check if username is empty
    if (!name) {
      setUsernameIsInvalid(true);
      setUsernameFeedback("Please enter a username.");
      return;
    }
    if (!email) {
      setUsernameIsInvalid(true);
      setUsernameFeedback("Please enter an email.");
      return;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      var salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
      //const name = form.elements.name.value;
      const password = form.elements.password.value;
      //console.log(password);
      //console.log(sha256(password).toString());
      const hashPassword = sha256(password + salt).toString();

      const newAccount = {
        userName: name,
        email: email,
        password: hashPassword,
        salt: salt,
      };
      await fetch("http://localhost:5050/api/authentication/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      })
        .then((response) => {
          if (response.status === 409) {
            throw response;
          }
          return response.json(); //we only get here if there is no error
        })
        .then((json) => {
          navigate("/lobby");
        })
        .catch((err) => {
          console.log("im getting error")
          err.json().then((errorData) => {
            if (errorData.existUserName && errorData.existEmail) {
              console.log("both email and username exist")
              setUsernameIsInvalid(true);
              setUsernameFeedback("Username is already in use");
              setEmailIsInvalid(true);
              setEmailFeedback("Email is already in use");
            } else if (errorData.existUserName) {
              console.log("only username")
              setEmailIsInvalid(false);
              setEmailFeedback("");
              setUsernameIsInvalid(true);
              setUsernameFeedback("Username is already in use");
            } else if (errorData.existEmail) {
              console.log("only email");
              setUsernameIsInvalid(false);
              setUsernameFeedback("");
              setEmailIsInvalid(true);
              setEmailFeedback("Email is already in use");
            }
            setValidated(false);
            return;
          });
        });
    }
    setValidated(true);
  };
  return (
    <div>
      {/* Added navbar specifici to Registration page, no links other than to home */}
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
        <a class="navbar-brand" href="/">Group Out of Town - Create account</a>
      </nav>
    
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <h1 className="mb-5">Register</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="mb-3"
          >
            <Form.Group as={Col} md="6" controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="name"
                isInvalid={usernameIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {usernameFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                isInvalid={emailIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {emailFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="formPassword"
              className="mb-3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                minLength={8}
                onChange={onChange}
                isInvalid={passwordIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {passwordFeedback}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password must be 8+ characters with a mix of letters, numbers,
                and symbols.
              </Form.Text>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="formPasswordRepeat"
              className="mb-3"
            >
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Re-enter password"
                name="confirmPassword"
                minLength={8}
                onChange={onChange}
                isInvalid={confirmPasswordIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {confirmPasswordFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">
              {" "}
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Submit form{" "}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
