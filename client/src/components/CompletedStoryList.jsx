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

  var utterance = new SpeechSynthesisUtterance(stories[0].finishedText);

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

  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div>
      {stories &&
        stories.map((story) => (
          <div key={story._id} className="card mb-3">
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
            <div className="card-body bg-light p-2">
              <h2>Story</h2>
              <p>{story.finishedText}</p>
              <Button type="primary" onClick={speackVoice}>Hey listen!</Button>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/story/${story._id}`}
            >
              Click here to view the whole story!
            </Link> */}
          </div>
        ))
      }
    </div >
  );
};

export default CompletedStoryList;
