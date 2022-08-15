import React from "react";
import TodoListItem from "./TodoListItem";
import './TodoList.css'

const TodoList = ( { todos, onDeleted, onToggleDone, onToggleImportant} ) => {

	const elements = todos.map((item)=>{

		const {id, ...itemProps} = item;

		return (
			<li
				key={id}
				className='list-group-item'
			>
				<TodoListItem {...itemProps} onDeleted={() => onDeleted(id)}
				onToggleImportant={()=>{onToggleImportant(id)}}
				onToggleDone={()=>{onToggleDone(id)}}/>
			</li>
		)
	});

	return (
		<div className='list-container'>
			<ul className='list-group todo-list'>
				{ elements }
			</ul>
		</div>
	);
}

export default TodoList;