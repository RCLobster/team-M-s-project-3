import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const CompletedStoryList = ({
  stories
}) => {
  console.log(stories);

  // Speech synthesis is similar to that in the completed story component
  const synth = window.speechSynthesis;
  let voiceArr;
  voiceArr = synth.getVoices();
  if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = synth.getVoices();
  } else {
    synth.getVoices()
  }

  // The onClick function is slightly different since the buttons are mapped through
  // Speech object is constructed inside the function since the finished text is passed as a parameter
  // Otherwise functions the same
  
  let speackVoice = async (finishedText) => {
    const utterance = new SpeechSynthesisUtterance(finishedText);
    const randomIndex = Math.floor(voiceArr.length * Math.random());
    utterance.voice = voiceArr[randomIndex];
    console.log(utterance.voice)
    let myTimeout;

    function myTimer() {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      myTimeout = setTimeout(myTimer, 1000);

    }

    window.speechSynthesis.cancel();
    myTimeout = setTimeout(myTimer, 1000);
    utterance.onend = function () { clearTimeout(myTimeout); }
    window.speechSynthesis.speak(utterance);
  };

  const [expandedStoryId, setExpandedStoryId] = useState(null);

  const toggleExpand = (storyId) => {
    if (expandedStoryId === storyId) {
      setExpandedStoryId(null);
    } else {
      setExpandedStoryId(storyId);
    }
  };

  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div>
      {stories &&
        stories.map((story) => (
          <div key={story._id} className="finished-card">
            <div className={`card-body ${expandedStoryId === story._id ? 'active' : ''}`}>
              <h2>{story.title}</h2>
              <p>{story.finishedText}</p>
            </div>
            <div className='card-buttons'>
              <Button type="primary" onClick={()=> speackVoice(story.finishedText)}>Hey listen!</Button>
              <Button type="primary" onClick={() => toggleExpand(story._id)}>Expand</Button>
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default CompletedStoryList;
