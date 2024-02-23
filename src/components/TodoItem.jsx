import React, { useState } from "react";

export default function TodoItem(props) {
    const [todoItem, setTodoItem] = useState(props.todoItem)
    const [checked, setChecked] = useState(todoItem.checked);

    // 할 일 수정
    function updateTodo() {
        const updatedTodo = window.prompt("수정할 내용을 입력해주세요.", todoItem.content);
        if (updatedTodo !== null) {
            fetch(`/todolist/${todoItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...todoItem,
                    content: updatedTodo,
                }),
            })
                .then(res => {
                    if (res.ok) {
                        setTodoItem({ ...todoItem, content: updatedTodo });
                        alert("일정이 수정되었습니다.");
                    }
                });
        }
    }

    // 할 일 삭제
    function deleteTodo() {
        if (window.confirm('일정을 삭제하시겠습니까?'))
            fetch(`/todolist/${todoItem.id}`, {
                method: "DELETE",
            }).then(res => {
                if (res.ok) {
                    setTodoItem({ id: 0 })
                }
            })
    }

    if (todoItem.id === 0) {
        return null;
    }

    // 완료한 일의 스타일 변경
    function toggleDone() {
        fetch(`/todolist/${todoItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...todoItem,
                checked: !checked,
            }),
        })
            .then(res => {
                if (res.ok) {
                    setChecked(!checked)
                }
            })
    }

    return (
        <li className={checked ? "Done" : ""}>
            <input className="checkBox" type="checkbox" checked={checked} onChange={toggleDone} />
            <span className="todo-content">{todoItem.content}</span>

            <div className="button-container">
                <button className="update-btn" onClick={updateTodo}>수정</button>
                <button className="delete-btn" onClick={deleteTodo}>삭제</button>
            </div>
        </li>
    )
}