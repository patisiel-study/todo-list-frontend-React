import React, { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";

export default function AddTask() {
    const [todoItems, setTodoItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const todoRef = useRef(null);

    // 값 추가 시에 자동 새로고침해주는 기능
    useEffect(() => {
        if (refresh) {
            setRefresh(false);
            fetchTodoItems();
        }
    }, [refresh]);

    // 초기 렌더링 시에도 할일 목록을 불러옴
    useEffect(() => {
        fetchTodoItems();
    }, []);

    function fetchTodoItems() {
        fetch('/todolist/list')
            .then(res => res.json())
            .then(data => setTodoItems(data))
            .catch(error => console.error("에러 발생:", error));
    }

    // 할 일 추가
    function onSubmit(e) {
        e.preventDefault();
        if (todoRef.current.value !== '') {
            fetch('/todolist/create', {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: todoRef.current.value,
                    checked: false
                }),
            }).then(res => {
                if (res.ok) {
                    setRefresh(true);
                    todoRef.current.value = '';
                }
            });

        }
        else{
            alert("일정을 입력해주세요.");
        }

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input id="task" type="text" placeholder="할일을 추가해보세요!" ref={todoRef} />
                <button type="submit" id="add-btn">할일 추가</button>
            </form>
            <ul className="to-do-list">
                {todoItems.map(todoItem => <TodoItem key={todoItem.id} todoItem={todoItem} />)}
            </ul>
        </div>
    )
}