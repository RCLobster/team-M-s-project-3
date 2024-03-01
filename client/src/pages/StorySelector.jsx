import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import UnfinishedStory from '../components/UnfinishedStory';
import { QUERY_SINGLE_UNFINISHED_STORY, QUERY_UNFINISHED_STORIES } from '../utils/queries';

const StorySelector = () => {
    const navigate = useNavigate();

    // grab all unfinished stories in DB and store in unfinishedStoryData as array
    const { loading, data } = useQuery(QUERY_UNFINISHED_STORIES);
    const unfinishedStoryData = data?.unfinishedStories || [];

    if (Auth.loggedIn()){
        return (
            <div className="create-story-window">
                <div>
                    <h2>Select your story!</h2>
                </div>
    
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <form >
                            {unfinishedStoryData.map((story) => {
                                return (
                                    <div key={story._id}>
                                        <Link to={`/create-story/${story._id}`}>
                                            <UnfinishedStory  title={story.title} />
                                        </Link>
                                    </div>
                                )
                            })}
                        </form>
                    )}
                </div>
            </div>
        );
    } else {
        navigate('/login');
    }
};

export default StorySelector;