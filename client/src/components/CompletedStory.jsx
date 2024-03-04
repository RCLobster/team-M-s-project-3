import { useQuery } from "@apollo/client"
import { QUERY_SINGLE_COMPLETED_STORY } from "../utils/queries"
import Speech from 'react-speech';
import speechUtteranceChunker from '../utils/chunkify';

export default function CompletedStory({ completeStoryId }) {
    const { loading, data } = useQuery(QUERY_SINGLE_COMPLETED_STORY, {
        variables: { storyId: completeStoryId }
    });

    const finishedStory = data?.completedStory.finishedText || "";
    var utterance = new SpeechSynthesisUtterance(finishedStory);
    var voiceArr = speechSynthesis.getVoices();
    utterance.voice = voiceArr[2];

    // pass it into the chunking function to have it played out.
    // you can set the max number of characters by changing the chunkLength property below.
    // a callback function can also be added that will fire once the entire text has been spoken.
    speechUtteranceChunker(utterance, {
        chunkLength: 120
    }, function () {
        //some code to execute when done
        console.log('done');
    });
    return (
        <div className="finished-text">
            <p>{finishedStory}</p>
            <Speech
                text={finishedStory}
                voice={voiceArr} />
        </div>
    );

};
