import React from "react";

interface IFormattedDateProps extends React.HTMLAttributes<HTMLSpanElement> {
    date: Date | string | number;
}

function FormattedDate({date, ...props}: IFormattedDateProps) {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return <span>Invalid date</span>;
    }

    return <span {...props}>{d.toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"})}</span>;
}

export default FormattedDate;
