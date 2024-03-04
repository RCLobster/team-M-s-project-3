import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="error-page">
            <h2 className="error-page-title">404: ____ Not Found</h2>
            <h4>Give me a noun: _<u>Page</u>_</h4>
            <Link to='/'>
                <button className='button'>Return to Home</button>
            </Link>
        </div>
    );
};

export default NotFound;