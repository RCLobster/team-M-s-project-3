export default function StoryBlanks({ blankType }) {
    return (
        <div>
            <p>Give me a {blankType}</p>
            <input className="input" placeholder="Type here!"></input>
        </div>
    )
}