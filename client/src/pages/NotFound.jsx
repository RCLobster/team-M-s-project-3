import { Link } from 'react-router-dom'
import { Button } from 'antd';

const NotFound = () => {
    return (
        <div className="error-page">
            <h2 className="error-page-title">404: ____ Not Found</h2>
            <h4>Give me a noun: _<u>Page</u>_</h4>
            <Link to='/'>
                <Button type='primary' className='button'>Return to Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;