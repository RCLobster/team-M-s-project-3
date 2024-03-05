import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Mad Lib Generator!</h1>
            <Link to="/story-selector"><Button type="primary">Get started making a story here!</Button></Link>
            <p>or</p>
            <Link to="/stories"><Button type="primary">View all stories here!</Button></Link>
        </div>
    );
};

export default Home;