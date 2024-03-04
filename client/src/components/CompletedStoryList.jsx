import { Link } from 'react-router-dom';
import Speech from 'react-speech';
// import speechUtteranceChunker from '../utils/chunkify';
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
  console.log(utterance)


  console.log(voiceArr)
  
  utterance.voice = voiceArr[4];

  console.log(utterance.voice)


  // function myTimer() {
  //     window.speechSynthesis.pause();
  //     window.speechSynthesis.resume();
  //     myTimeout = setTimeout(myTimer, 10000);
  // }


  // var speechUtteranceChunker = function (utt, settings, callback) {
  //   settings = settings || {};
  //   var newUtt;
  //   var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
  //   if (utt.voice) { // Not part of the spec
  //     newUtt = utt;
  //     newUtt.text = txt;
  //     newUtt.addEventListener('end', function () {
  //       if (speechUtteranceChunker.cancel) {
  //         speechUtteranceChunker.cancel = false;
  //       }
  //       if (callback !== undefined) {
  //         callback();
  //       }
  //     });
  //   }
  //   else {
  //     var chunkLength = (settings && settings.chunkLength) || 160;
  //     var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
  //     var chunkArr = txt.match(pattRegex);

  //     if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
  //       //call once all text has been spoken...
  //       if (callback !== undefined) {
  //         callback();
  //       }
  //       return;
  //     }
  //     var chunk = chunkArr[0];
  //     newUtt = new SpeechSynthesisUtterance(chunk);
  //     var x;
  //     for (x in utt) {
  //       if (utt.hasOwnProperty(x) && x !== 'text') {
  //         newUtt[x] = utt[x];
  //       }
  //     }
  //     newUtt.addEventListener('end', function () {
  //       if (speechUtteranceChunker.cancel) {
  //         speechUtteranceChunker.cancel = false;
  //         return;
  //       }
  //       settings.offset = settings.offset || 0;
  //       settings.offset += chunk.length - 1;
  //       speechUtteranceChunker(utt, settings, callback);
  //     });
  //   }

  //   if (settings.modifier) {
  //     settings.modifier(newUtt);
  //   }
  //   console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
  //   //placing the speak invocation inside a callback fixes ordering and onend issues.
  //   setTimeout(function () {
  //     speechSynthesis.speak(newUtt);
  //   }, 0);
  // };

  // const speech = async () => speechUtteranceChunker(utterance, {chunkLength: 120}, function () {console.log('done');})
  const speech = async () => {
    var myTimeout;

    function myTimer() {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      myTimeout = setTimeout(myTimer, 10000);
      
  }
  
  window.speechSynthesis.cancel();
  myTimeout = setTimeout(myTimer, 10000);
  utterance.onend =  function() { clearTimeout(myTimeout); }
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
              <Button type="primary" onClick={speech}>Submit All</Button>
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
