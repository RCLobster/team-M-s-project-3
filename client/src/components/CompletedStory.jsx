import { useQuery } from "@apollo/client"
import { QUERY_SINGLE_COMPLETED_STORY } from "../utils/queries"
import Speech from 'react-speech';

export default function CompletedStory({ completeStoryId }) {
    const { loading, data } = useQuery(QUERY_SINGLE_COMPLETED_STORY, {
        variables: { storyId: completeStoryId }
    });

    const finishedStory = data?.completedStory.finishedText || "";

    return (
        <div>
            <p>{finishedStory}</p>
            <Speech
                text={finishedStory}
                voice="Google UK English Male" />
        </div>
    );

};
