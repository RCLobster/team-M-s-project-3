import { useEffect, useState } from 'react';
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

    // if the user is NOT logged in, redirect them to /login
    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        }
    }, [navigate]);

    if (!Auth.loggedIn()) return null;

    // if user IS logged in, render the story selector page
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
                                // display each unfinishedStory as a button which links user to /create-story/:storyId
                                <div key={story._id}>
                                    <Link to={`/create-story/${story._id}`}>
                                        <UnfinishedStory title={story.title} />
                                    </Link>
                                </div>
                            )
                        })}
                    </form>
                )}
            </div>
        </div>
    );

};

export default StorySelector;