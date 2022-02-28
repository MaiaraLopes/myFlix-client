import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function RegistrationView(props) {
    const [newUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('')

    const handleRegistrationBtn = (e) => {
        e.preventDefault();
        props.toggleRegistrationView(false)
    }
    

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>Please register here</Card.Title>
                        <Form>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control type='text' placeholder='Enter a username' value={newUsername} onChange={e => setUsername(e.target.value)} required/>
            </Form.Group>
            
            <Form.Group>
            <Form.Label>Password: </Form.Label>
                <Form.Control type='text' placeholder='Enter a password' value={password} onChange={e => setPassword(e.target.value)} required minLength='8'/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Email: </Form.Label>
                <Form.Control type='text' placeholder='Enter a valid email' value={email} onChange={e => setEmail(e.target.value)} required/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Birthdate: </Form.Label>
                <Form.Control type='text' placeholder='Enter your birthdate' value={birthdate} onChange={e => setBirthdate(e.target.value)} required/>
            </Form.Group>

            <Button variant='primary' type='submit' onClick={handleRegistrationBtn}>Submit</Button>
                                </Form>
                           </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>  
);
    }