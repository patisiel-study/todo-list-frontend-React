import React from "react";
import AddTask from "./AddTask";
import Clock from "./Clock";


function TodoBoard(){
    return(
        <div className="task-box">
            <h1>TO DO LIST</h1>
            <Clock/>
            <AddTask/>  
        </div>
    )
};
export default TodoBoard;