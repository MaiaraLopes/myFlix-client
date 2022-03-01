import React, { useState } from 'react';
import { Form, Button, Card, CardGroup } from 'react-bootstrap';

export function LoginView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    const handleRegisterBtn = (e) => {
        e.preventDefault();
        props.toggleRegistrationView(true)
    }

    return (
        
                    <CardGroup>
                        <Card>
                            <Card.Body>
        <Form>
            <Form.Group controlId='formUsername'>
                <Form.Label className='mt-2'>Username:</Form.Label>
                <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            
            <Form.Group controlId='formPassword'>
                <Form.Label className='mt-2'>Password:</Form.Label>
                <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className='mt-3 mr-2' variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
            <Button className='mt-3' variant='outline-primary' type='submit' onClick={handleRegisterBtn}>Register here</Button>
                            </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                
    );
}