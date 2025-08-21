import FormattedDate from "../shared/ui/formattedDate.tsx";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import {Link} from "react-router-dom";

export interface IPostMiniatureProps {
    blodId: string;
    name: string
    description: string
    date: Date
    maxWordsInDescription?: number
    linkTo: string
}

function trimWords(str: string, maxWords: number): string {

    const words = str.split(' ');

    if (words.length <= maxWords) {
        return str;
    }

    return words.slice(0, maxWords).join(' ');
}

function PostMiniature({blodId, name, description, date, maxWordsInDescription, linkTo}: IPostMiniatureProps) {
    if (maxWordsInDescription !== undefined) {
        description = trimWords(description, maxWordsInDescription);
    }

    return (
        <div>
            <Link key={blodId + "_title"} to={linkTo}>
                <h2>
                    {name}
                </h2>
            </Link>

            <div>
                <FormattedDate date={date}/>
            </div>

            <HorizontalLine bottomMargin={3}/>

            <p>
                {description}
            </p>

            <Link key={blodId + "_read_more"} to={linkTo}>Read more...</Link>
        </div>
    );
}

export default PostMiniature;
