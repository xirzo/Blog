interface IHorizontalLineProps {
    bottomMargin?: number | undefined;
}

function HorizontalLine({bottomMargin}: IHorizontalLineProps) {
    if (bottomMargin === undefined) {
        bottomMargin = 8;
    }

    return <hr/>
}

export default HorizontalLine;
