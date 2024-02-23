import React from "react";
import Clock from "./Clock";
import AddTask from "./AddTask";

export default function TodoBoard() {
    return (
        <div id="task-box">
            <h1>TO DO LIST</h1>
            <Clock />
            <AddTask />
        </div>
    );
}