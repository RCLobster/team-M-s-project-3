import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_UNFINISHED_STORY } from "../utils/queries";

const CreateStory = () => {
    const { storyId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_UNFINISHED_STORY, {
        variables: { storyId: storyId }
    });


    return (
        <div>Create Story Page</div>
    );
};

export default CreateStory;