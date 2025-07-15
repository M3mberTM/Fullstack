import {CoursePart} from "../types.ts";
import {assertNever} from "../utils.ts";

interface PartProps {
    course: CoursePart
}
const Part = (props: PartProps) => {
    const part = props.course
    switch (part.kind) {
        case "background":
            return <div>
                <h3> Name: {part.name}</h3>
                Exercise count: {part.exerciseCount}<br/>
                Background: {part.backgroundMaterial}<br/>
                Description: {part.description}
            </div>
        case "group":
            return <div>
                <h3> Name: {part.name}</h3>
                Exercise count: {part.exerciseCount}<br/>
                Group project count: {part.groupProjectCount}
            </div>
        case "basic":
            return <div>
                <h3> Name: {part.name}</h3>
                Exercise count: {part.exerciseCount}<br/>
                Description: {part.description}
            </div>
        case "special":
            return <div>
                <h3> Name: {part.name}</h3>
                Exercise count: {part.exerciseCount}<br/>
                Requirements: {part.requirements}<br/>
                Description: {part.description}
            </div>
        default:
            return assertNever(part)

    }
};

export default Part;