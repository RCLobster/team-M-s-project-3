import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Input, Button, Form } from 'antd';

import Auth from '../utils/auth';

const Signup = () => {
    // by default, form state is empty input fields for username and password
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
    // when a user signs up, mutate the db to add that user's info to the db
    const [addUser, { error, data }] = useMutation(ADD_USER);

    // when user types into input fields update the fields as they type
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // when the signup button is clicked...
    const handleFormSubmit = async (event) => {
        console.log(formState);

        // call addUser and send over input field values
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            // create a new token with user data
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div className="login-window">
                <div className="login-box">
                    <h2>Signup</h2>
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (

                        <Form className="form signup-form" onFinish={handleFormSubmit}>
                            <Form.Item className="form-group">
                                <Input
                                    className="form-input"
                                    placeholder="username"
                                    name="username"
                                    type="text"
                                    id="name-signup"
                                    value={formState.username}
                                    onChange={handleChange} />
                            </Form.Item>
                            <Form.Item className="form-group">
                                <Input
                                    className="form-input"
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    id="password-signup"
                                    value={formState.password}
                                    onChange={handleChange} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType='submit'>Signup</Button>
                            </Form.Item>
                            <Link to="/login">Already have an account? Click here to login!</Link>
                        </Form>
                    )}
                    {error && (
                        <div>
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Signup;