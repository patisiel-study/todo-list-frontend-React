import React, { useState, useEffect } from "react";

export default function Clock() {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const time = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(time);
    }, []);

    const year = clock.getFullYear();
    const month = clock.getMonth() + 1;
    const date = clock.getDate();
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][clock.getDay()];
    const hours24 = clock.getHours();
    const hours = (hours24 % 12) || 12;
    const minutes = clock.getMinutes();
    const seconds = clock.getSeconds();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    return (
        <p id="clock">
            <span id="day">{year}-{month < 10 ? '0' : ''}{month}-{date < 10 ? '0' + date : date}-{day}</span>
            <span id="time">{ampm} {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds} </span>
        </p>
    );
}