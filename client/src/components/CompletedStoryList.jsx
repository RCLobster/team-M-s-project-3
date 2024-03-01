import { Link } from 'react-router-dom';

const CompletedStoryList = ({
    stories
}) => {
    console.log(stories);
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
                            <p>{story.finishedText}</p>
                        </div>
                        <Link
                            className="btn btn-primary btn-block btn-squared"
                            to={`/story/${story._id}`}
                        >
                            Click here to view the whole story!
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default CompletedStoryList;
