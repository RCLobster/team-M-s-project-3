import { Button } from "antd";

export default function UnfinishedStory({ title }) {
    return (
        <div>
            <Button className="btn" type="primary">
                {title}
            </Button>
        </div>
    )
};