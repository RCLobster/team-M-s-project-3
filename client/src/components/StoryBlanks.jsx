export default function StoryBlanks({ blankType }) {
    return (
        <div>
            <p>Give me a {blankType}</p>
            <input className="userInput" placeholder="Type here!"></input>
        </div>
    )
}