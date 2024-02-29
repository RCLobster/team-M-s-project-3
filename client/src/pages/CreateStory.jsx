import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";
import { useQuery } from '@apollo/client';

const CreateStory = () => {
    const { storyId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });

    console.log(data);


    return (
        <div>Create Story Page</div>
    );
};

export default CreateStory;