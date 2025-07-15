import {CoursePart} from "../types.ts";

interface ContentProps {
   courseParts: CoursePart[]
}
const Content = (props: ContentProps) => {

    return (
        <div>
            {props.courseParts.map((part) => {
                return <p>{part.name} {part.exerciseCount}</p>
            })}
        </div>
    )
};

export default Content;