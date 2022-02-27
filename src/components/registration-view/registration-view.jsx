import React, { useState } from 'react';

export function RegistrationView(props) {
    const [newUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('')

    const handleRegistrationBtn = (e) => {
        e.preventDefault();
        props.closeRegistrationView(false)
    }
    

    return (
        <form>
            <label>
                Username:
                <input type='text' value={newUsername} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>Password:
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthdate:
                <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </label>
            <button type='submit' onClick={handleRegistrationBtn}>Submit</button>
        </form>
);
    }