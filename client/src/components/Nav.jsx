import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar';
import Auth from '../utils/auth';

export default function Nav() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    if (Auth.loggedIn()) {
        return (
            <Navbar
                links={[
                    <Link key={1} className="nav-link" to="/">
                        Home
                    </Link>,
                    <Link key={2} className="nav-link" to="/story-selector">
                        Create a Story!
                    </Link>,
                    <Link key={3} className="nav-link" to="/profile">
                        Profile
                    </Link>,
                    <Link key={4} className="nav-link" onClick={logout}>
                        Logout
                    </Link>
                ]}
            />
        );
    } else {
        return (
            <Navbar
                links={[
                    <Link key={1} className="nav-link" to="/">
                        Home
                    </Link>,
                    <Link key={2} className="nav-link" to="/story-selector">
                        Create a Story!
                    </Link>,
                    <Link key={3} className="nav-link" to="/login">
                        Login
                    </Link>
                ]}
            />
        );
    }
}