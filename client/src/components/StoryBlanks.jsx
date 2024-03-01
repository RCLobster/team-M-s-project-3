export default function StoryBlanks({ blankType }) {
    return (
        <div>
            <p>Give me {blankType}</p>
            <input className="userInput" placeholder="Type here!" name="inputField"></input>
        </div>
    )
}