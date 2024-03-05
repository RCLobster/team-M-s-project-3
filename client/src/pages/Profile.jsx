import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CompletedStoryList from '../components/CompletedStoryList';
import { QUERY_ME, QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME, {
        fetchPolicy: 'no-cache'
    });

    const user = data?.me || data?.user || {};

    console.log(user);

    if (loading) {
        return <div className='profile-window'>Loading...</div>;
    }

    // if the user is NOT logged in, render below
    if (!Auth.loggedIn()) {
        return (
            <h4 className='profile-window'>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    // if the user IS logged in, render their profile and display all their created stories
    return (
        <div className='profile-window'>
            <div>
                <h2>
                    Viewing your stories:
                </h2>

                <div>
                    <CompletedStoryList
                        stories={user.stories}
                    />
                </div>
                {/* {!userParam && (
                    <div
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px dotted #1a1a1a' }}
                    >
                        <ThoughtForm />
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Profile;