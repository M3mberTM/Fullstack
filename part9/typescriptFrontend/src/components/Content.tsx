import {CoursePart} from "../types.ts";
import Part from './Part.tsx';

interface ContentProps {
   courseParts: CoursePart[]
}
const Content = (props: ContentProps) => {

    return (
        <div>
            {props.courseParts.map((part) => {
                return <Part course={part}/>
            })}
        </div>
    )
};

export default Content;