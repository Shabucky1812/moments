import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {

  const setCurrentUser = useSetCurrentUser()
  useRedirect('loggedIn')

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = signInData;

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value
    })
  }

  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      const {data} = await axios.post('dj-rest-auth/login/', signInData)
      setCurrentUser(data.user)
      setTokenTimestamp(data)
      history.goBack()
    } catch(err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          {/* Add your form here */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" name="username" className={styles.Input} value={username} onChange={handleChange} />
            </Form.Group>
            {errors.username?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" className={styles.Input} value={password} onChange={handleChange} />
            </Form.Group>
            {errors.password?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button type="submit" className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            )}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
