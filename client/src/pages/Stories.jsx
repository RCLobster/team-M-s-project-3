import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CompletedStoryList from '../components/CompletedStoryList';
import { QUERY_USERS } from "../utils/queries";

import Auth from "../utils/auth";

const Stories = () => {
    const { loading, data } = useQuery(QUERY_COMPLETED_STORIES, {
        fetchPolicy: 'no-cache'
    });

    const stories = data?.completedStories || {};

    console.log(user);

    if (loading) {
        return <div className='profile-window'>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return (
            <h4 className='profile-window'>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        <div className='profile-window'>
            <div>

                <div>
                    <CompletedStoryList
                        stories={stories.finishedText}
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

export default Stories;