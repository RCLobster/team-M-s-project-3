import { Input, Form } from "antd";

export default function StoryBlanks({ blankType }) {
    return (
        <Form.Item>
            <p>Give me {blankType}</p>
            <Input className="userInput" placeholder="Type here!" name="inputField"></Input>
        </Form.Item>
    )
}