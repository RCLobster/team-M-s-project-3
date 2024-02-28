import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar';

export default function Nav() {
    if (Auth.loggedIn()){
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