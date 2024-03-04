import { useQuery } from "@apollo/client"
import { QUERY_SINGLE_COMPLETED_STORY } from "../utils/queries"
import { Button } from 'antd';


export default function CompletedStory({ completeStoryId }) {
    const { loading, data } = useQuery(QUERY_SINGLE_COMPLETED_STORY, {
        variables: { storyId: completeStoryId }
    });

    const finishedStory = data?.completedStory.finishedText || "";

    const synth = window.speechSynthesis;
    let voiceArr;
    voiceArr = synth.getVoices();
    if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = synth.getVoices();
    } else {
        synth.getVoices()
    }

    const utterance = new SpeechSynthesisUtterance(finishedStory);

    utterance.voice = voiceArr[6];

    const speackVoice = async () => {
        var myTimeout;

        function myTimer() {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
            myTimeout = setTimeout(myTimer, 1000);

        }

        window.speechSynthesis.cancel();
        myTimeout = setTimeout(myTimer, 1000);
        utterance.onend = function () { clearTimeout(myTimeout); }
        window.speechSynthesis.speak(utterance);
    }

    return (
        <div className="finished-text">
            <p>{finishedStory}</p>
            <Button type="primary" onClick={speackVoice}>Hey listen!</Button>
        </div>
    );

};
