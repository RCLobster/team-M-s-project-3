import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || [];
console.log(me)
    return (
        <div className="home">
            <h1>Welcome to Mad Lib Generator!</h1>
            <Link to="/story-selector">Get started making a story here!</Link>
        </div>
    );
};

export default Home;