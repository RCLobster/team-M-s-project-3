import { useState } from 'react';
import { Link } from 'react-router-dom'
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
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
            <div class="login-window">
                <div class="login-box">
                    <h2>Login</h2>
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form class="form login-form" onSubmit={handleFormSubmit}>
                            <div class="form-group">
                                <label for="username-login">Username:</label>
                                <input
                                    class="form-input"
                                    type="text"
                                    id="username-login"
                                    value={formState.username}
                                    onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="password-login">Password:</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    id="password-login"
                                    value={formState.password}
                                    onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <button class="btn" type="submit">Login</button>
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