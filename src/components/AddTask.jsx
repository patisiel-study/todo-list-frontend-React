import React, { useRef, useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function AddTask() {
    const [todoItems, setTodoItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const todoRef = useRef(null);

    useEffect(() => {
        if (refresh) {
            setRefresh(false);
            fetchTodoItems();
        }
    }, [refresh]);

    useEffect(() => {
        fetchTodoItems();
    }, []); // 초기 렌더링 시에도 할일 목록을 불러옴

    function fetchTodoItems() {
        fetch('http://localhost:3001/todoItems')
            .then(res => res.json())
            .then(data => setTodoItems(data))
            .catch(error => console.error("Error fetching todo items:", error));
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(todoRef.current.value);

        fetch('http://localhost:3001/todoItems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todo: todoRef.current.value,
                isDone: false
            }),
        }).then(res => {
            if (res.ok) {
                setRefresh(true);
                todoRef.current.value = '';
            }
        });

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className="task" type="text" placeholder="할일을 추가해보세요!" ref={todoRef} />
                <button type="submit" className="add-btn">할일 추가</button>
            </form>
            <ul className="to-do-list">
                {todoItems.map(todoItem => <TodoItem key={todoItem.id} todoItem = {todoItem}/>)}
            </ul>
        </div>
    )
}

export default AddTask;