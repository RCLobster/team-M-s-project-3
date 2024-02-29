import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

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
            const { data } = await addUser({
                variables: { ...formState },
            });

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

                        <form className="form signup-form" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-input"
                                    placeholder="username"
                                    name="username"
                                    type="text"
                                    id="name-signup"
                                    value={formState.username}
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-input"
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    id="password-signup"
                                    value={formState.password}
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn" type="submit">Signup</button>
                            </div>
                            <Link to="/login">Already have an account? Click here to login!</Link>
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
    )
}

export default Signup;