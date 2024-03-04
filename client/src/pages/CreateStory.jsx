import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";
import { CREATE_STORY } from '../utils/mutations';
import StoryBlanks from '../components/StoryBlanks';
import Auth from '../utils/auth';
import CompletedStory from '../components/CompletedStory';
import { Button, Form, Input } from 'antd';

const CreateStory = () => {
    const [completeStoryId, setCompleteStoryId] = useState("");

    const { storyId } = useParams();
    console.log(storyId);
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });

    const [createStory, { error }] = useMutation(CREATE_STORY);

    useEffect(() => {
        console.log(completeStoryId);
    }, [completeStoryId]);

    const story = data?.unfinishedStory || [];

    let finishedText = story.unfinishedText;
    let title = story.title;

    const handleClick = async (event) => {
        event.preventDefault();

        console.log(event.target);

        let userInputs = document.getElementsByClassName("userInput");

        for (let x = 0; x < userInputs.length; x++) {
            finishedText = finishedText.replace('__', userInputs[x].value)
        };

        console.log(finishedText);
        console.log(story.title);

        try {
            const { data } = await createStory({
                variables: {
                    title: title,
                    finishedText: finishedText,
                }
            });

            setCompleteStoryId(data.createStory._id);

        } catch (err) {
            console.error(err);
        };

        for (let x = 0; x < userInputs.length; x++) {
            userInputs[x].value = "";
        }
    };

    return (
        <div className='flex-parent'>
            <div className="story-blanks">
                <h2>Create Story Page</h2>
                <h3>{story.title}</h3>
                <Form onFinish={handleClick}>
                    {story?.blanks && story.blanks.map((blank) => {
                        return (
                            <div key={blank._id}>
                                <StoryBlanks name="inputField" blankType={blank.blankType} />
                            </div>
                        )
                    })}
                    <Form.Item>
                        <Button type='primary' htmlType='submit' onClick={handleClick}>Submit All</Button>
                    </Form.Item>
                </Form>


            </div>

            <div className='finished-story'>
                {completeStoryId ? (
                    <CompletedStory completeStoryId={completeStoryId} />
                ) : (
                    <div></div>
                )}
            </div>

        </div>
    );
};

export default CreateStory;