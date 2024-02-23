import React, { useState, useEffect } from "react";

export default function Clock() {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const time = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    return (
        <p id="clock">
            <span id="date">{clock.toLocaleDateString()} {clock.toLocaleDateString( 'ko-KR', { weekday: 'short' })}</span>
            <span id="time">{clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </p>
    );
}