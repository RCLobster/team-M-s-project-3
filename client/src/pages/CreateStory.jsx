import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";

const CreateStory = () => {
    const { storyId } = useParams();
    console.log(storyId);
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });

    const story = data?.unfinishedStory || [];

    console.log(story);


    return (
        <div>
            <h2>Create Story Page</h2>
            {/* <h3>{data.title}</h3> */}
        </div>
    );
};

export default CreateStory;