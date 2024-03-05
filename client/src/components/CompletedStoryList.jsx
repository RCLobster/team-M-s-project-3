import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const CompletedStoryList = ({
  stories
}) => {
  console.log(stories);

  const synth = window.speechSynthesis;
  let voiceArr;
  voiceArr = synth.getVoices();
  if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = synth.getVoices();
  } else {
    synth.getVoices()
  }

  let speackVoice = async (finishedText) => {
    const utterance = new SpeechSynthesisUtterance(finishedText)
    utterance.voice = voiceArr[6];
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
            {/* <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${story.userId}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </>
              )}
            </h4> */}
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
