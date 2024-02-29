import { Link } from "react-router-dom";
import github from "/images/github.svg"

export default function Footer() {
    return (<footer>
        <Link to="https://github.com/RCLobster/team-M-s-project-3"><img id="githubsvg" src={github} alt="" /></Link>
    </footer>
    );
}