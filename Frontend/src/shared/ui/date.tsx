import React from "react";

interface IFormattedDateProps {
    date: Date | string | number;
}

function FormattedDate({date}: IFormattedDateProps) {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return <span>Invalid date</span>;
    }

    return <span>{d.toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"})}</span>;
}

export default FormattedDate;
