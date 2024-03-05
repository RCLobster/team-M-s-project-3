import { useQuery } from "@apollo/client"
import { QUERY_SINGLE_COMPLETED_STORY } from "../utils/queries"
import { Button } from 'antd';


export default function CompletedStory({ completeStoryId }) {
    const { loading, data } = useQuery(QUERY_SINGLE_COMPLETED_STORY, {
        variables: { storyId: completeStoryId }
    });

    const finishedStory = data?.completedStory.finishedText || "";

    // Text to speech uses the Web Speech API to generate speech from text
    // Voices can vary between users
    // Both system and browser dependent
    const synth = window.speechSynthesis;
    let voiceArr;
    
    // If block is for chrome, doesn't load voices on page load
    voiceArr = synth.getVoices();
    if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = synth.getVoices();
    } else {
        synth.getVoices()
    }

    // Speech object is created based on text of completed story
    const utterance = new SpeechSynthesisUtterance(finishedStory);

    // Randomly assign a voice to the speech object, array will be different from user to user
    const randomIndex = Math.floor(voiceArr.length * Math.random());
    utterance.voice = voiceArr[randomIndex];

    console.log(voiceArr);

    // function for the on click to play the voice
    const speackVoice = async () => {

        // Uses a timer based on quirks in Chrome that limits the length of TTS
        // Continuously starts and stops the speech playback
        // Inspired and informed by this thread on stackoverflow: https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts

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
