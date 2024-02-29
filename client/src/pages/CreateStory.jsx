import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";
import StoryBlanks from '../components/StoryBlanks';

const CreateStory = () => {
    const { storyId } = useParams();
    console.log(storyId);
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });

    const story = data?.unfinishedStory || [];

    console.log(story.blanks);

    const handleClick = async (event) => {
        event.preventDefault();

        console.log(event.target);

        let userInputs = document.getElementsByClassName("userInput");
        console.log(userInputs);
    }

    return (
        <div>
            <h2>Create Story Page</h2>
            <h3>{story.title}</h3>
            <div>
                {story?.blanks && story.blanks.map((blank) => {
                    return (
                        <div key={blank._id}>
                            <StoryBlanks blankType={blank.blankType} />
                        </div>
                    )
                })}
            </div>
            <button className="btn" type='submit' onClick={handleClick}>Submit All</button>
        </div>
    );
};

export default CreateStory;