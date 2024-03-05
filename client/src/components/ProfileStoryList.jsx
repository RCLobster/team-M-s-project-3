import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_STORY } from '../utils/mutations';
import Auth from '../utils/auth';

const ProfileStoryList = ({
  stories
}) => {
  console.log(stories);
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteStory, { error }] = useMutation(DELETE_STORY);
  const [currentStories, setCurrentStories] = useState(stories);
  
  useEffect(() => {
    setCurrentStories(stories);
  }, [stories]);



  const handleDelete = async (storyId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteStory({
        variables: { storyId },
      });
      const updatedStories = currentStories.filter(story => story._id !== storyId);
      setCurrentStories(updatedStories);
    } catch (err) {
      console.error(err);
    }
  };

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
      {currentStories &&
        currentStories.map((story) => (
          <div key={story._id} className="finished-card">
            <div className={`card-body ${expandedStoryId === story._id ? 'active' : ''}`}>
              <h2>{story.title}</h2>
              <p>{story.finishedText}</p>
            </div>
            <div className='card-buttons'>
              <Button type="primary" onClick={()=> speackVoice(story.finishedText)}>Hey listen!</Button>
              <Button type="primary" onClick={() => toggleExpand(story._id)}>Expand</Button>
              <Button type="primary" onClick={() => handleDelete(story._id)}>Delete</Button>
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default ProfileStoryList;
