import { Link } from "react-router-dom";
import github from "../../public/images/github"

export default function Footer() {
    return(<footer>
        <Link to="https://github.com/RCLobster/team-M-s-project-3"><img src={ github } alt="" /></Link>
    </footer>
    );
}