import { useState } from 'react';
import { Link } from 'react-router-dom'
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <main>
            <div className="login-window">
                <div className="login-box">
                    <h2>Login</h2>
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form className="form login-form" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="username-login">Username:</label>
                                <input
                                    className="form-input"
                                    placeholder="username"
                                    name="username"
                                    type="text"
                                    value={formState.username}
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-login">Password:</label>
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn" type="submit">Login</button>
                            </div>
                            <Link to="/signup">Don't have an account? Click here to sign up!</Link>
                        </form>
                    )}
                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Login;