import React from "react";

function FormattedDate({date}: { date: Date | string | number }) {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return <span>Invalid date</span>;
    }

    return <span>{d.toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"})}</span>;
}

export default FormattedDate;
