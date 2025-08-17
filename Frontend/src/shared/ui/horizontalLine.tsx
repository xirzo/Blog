interface IHorizontalLineProps {
    bottomMargin: number | undefined;
}

function HorizontalLine({bottomMargin}: IHorizontalLineProps) {
    if (bottomMargin === undefined) {
        bottomMargin = 8;
    }

    return <hr className={`h-px mb-${bottomMargin} bg-[var(--color-secondary-text)] border-0`}/>
}

export default HorizontalLine;