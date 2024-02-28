import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { UnfinishedStory } from '../components/UnfinishedStory';

const StorySelector = () => {
    //reference mini project unit 21
    // query for all unfinished stories

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("stuff");
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
                        <UnfinishedStory title="Go to the ___" />
                        <UnfinishedStory title="Over the ___" />
                    </form>
                )}
            </div>
        </div>
    );
};

export default StorySelector;