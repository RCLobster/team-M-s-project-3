import { Link } from 'react-router-dom';
import Nav from "./Nav";

export default function Header() {
    return (
        <header>
            <Link to="/" id='madlibshome'><h1>Mad Libs Generator</h1></Link>
            <Nav />
        </header>
    );
}