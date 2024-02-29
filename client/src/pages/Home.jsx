import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Mad Lib Generator!</h1>
            <Link to="/story-selector">Get started making a story here!</Link>
        </div>
    );
};

export default Home;