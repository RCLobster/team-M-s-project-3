import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CompletedStoryList from '../components/CompletedStoryList';
import { QUERY_COMPLETED_STORIES } from "../utils/queries";

import Auth from "../utils/auth";

const Stories = () => {
    const { loading, data } = useQuery(QUERY_COMPLETED_STORIES, {
        fetchPolicy: 'no-cache'
    });

    const stories = data?.completedStories || {};


    if (loading) {
        return <div className='profile-window'>Loading...</div>;
    }

    return (
        <div className='profile-window'>
            <div>

                <div>
                    <CompletedStoryList
                        stories={stories}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stories;