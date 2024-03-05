import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";
import { CREATE_STORY } from '../utils/mutations';
import StoryBlanks from '../components/StoryBlanks';
import Auth from '../utils/auth';
import CompletedStory from '../components/CompletedStory';
import { Button, Form, Input } from 'antd';

const CreateStory = () => {
    const [completeStoryId, setCompleteStoryId] = useState("");
    const navigate = useNavigate();

    const { storyId } = useParams();
    console.log(storyId);
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });

    const [createStory, { error }] = useMutation(CREATE_STORY);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        console.log(completeStoryId);
    }, [completeStoryId]);

    const story = data?.unfinishedStory || [];

    // finished text is currently set to a copy of the unfinishedText from db which includes __'s
    let finishedText = story.unfinishedText;
    let title = story.title;

    const handleClick = async (event) => {
        event.preventDefault();

        console.log(event.target);

        // when the submit button is clicked, create a userInputs array = to all the user data from input fields
        let userInputs = document.getElementsByClassName("userInput");

        // loop thourgh userInputs array and replace each __ with whatever the user input for that spot
        // finishedText will then hold a completed story text with no __'s
        for (let x = 0; x < userInputs.length; x++) {
            finishedText = finishedText.replace('__', userInputs[x].value)
        };

        console.log(finishedText);
        console.log(story.title);

        // send the newly finished story up to the db with createStory
        try {
            const { data } = await createStory({
                variables: {
                    title: title,
                    finishedText: finishedText,
                }
            });

            // useState to update the id of the created story
            setCompleteStoryId(data.createStory._id);

        } catch (err) {
            console.error(err);
        };

        // reset all the user input fields to be empty 
        for (let x = 0; x < userInputs.length; x++) {
            userInputs[x].value = "";
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!Auth.loggedIn()) return null;

    return (
        <div className='flex-parent'>
            <div className="story-blanks">
                <h2>Create Story Page</h2>
                <h3>{story.title}</h3>
                <Form onFinish={handleClick}>
                    {/* map through the queried story blanks and render them on screen */}
                    {story?.blanks && story.blanks.map((blank) => {
                        return (
                            <div key={blank._id}>
                                <StoryBlanks name="inputField" blankType={blank.blankType} />
                            </div>
                        )
                    })}
                    {/* create a button at bottom of input fields to submit all user answers */}
                    <Form.Item>
                        <Button type='primary' htmlType='submit' onClick={handleClick}>Submit All</Button>
                    </Form.Item>
                </Form>


            </div>

            <div className='finished-story'>
                {/* if submit button is clicked and a completedStoryId exists, render the finished story on screen with user inputs */}
                {completeStoryId ? (
                    <CompletedStory completeStoryId={completeStoryId} />
                ) : (
                    // else, render an empty div
                    <div></div>
                )}
            </div>

        </div>
    );
};

export default CreateStory;