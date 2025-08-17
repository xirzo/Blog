import FormattedDate from "../../shared/ui/formattedDate.tsx";
import HorizontalLine from "../../shared/ui/horizontalLine.tsx";
import {Link} from "react-router-dom";

export interface IBlogMiniature {
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

function BlogMiniature({blodId, name, description, date, maxWordsInDescription, linkTo}: IBlogMiniature) {
    if (maxWordsInDescription !== undefined) {
        description = trimWords(description, maxWordsInDescription);
    }

    return (
        <div className="
                p-6 rounded-[15px] bg-[var(--color-secondary)]
                text-start shadow-[0_2px_4px_rgba(0,0,0,0.1)]
        ">
            <Link key={blodId + "_title"} to={linkTo}>
                <h2 className="text-4xl font-light mb-5">
                    {name}
                </h2>
            </Link>

            <div className={"mb-3 text-[var(--color-secondary-text)]"}>
                <FormattedDate date={date}/>
            </div>

            <HorizontalLine bottomMargin={3}/>

            <p className="text-[var(--color-secondary-text)] mb-5">
                {description}
            </p>

            <Link key={blodId + "_read_more"} to={linkTo}>Read more...</Link>
        </div>
    );
}

export default BlogMiniature;
