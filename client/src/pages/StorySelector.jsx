import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import UnfinishedStory from '../components/UnfinishedStory';
import { QUERY_SINGLE_UNFINISHED_STORY, QUERY_UNFINISHED_STORIES } from '../utils/queries';

const StorySelector = () => {

    // grab all unfinished stories in DB and store in unfinishedStoryData as array
    const { loading, data } = useQuery(QUERY_UNFINISHED_STORIES);
    const unfinishedStoryData = data?.unfinishedStories || [];


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            navigate(`/create-story/${event.target.key}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>
                <h2>Select your story!</h2>
            </div>

            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        {unfinishedStoryData.map((story) => {
                            return (
                                <div>
                                    <UnfinishedStory key={story._id} title={story.title} />
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