import React, {Component} from 'react';
import './TodoListItem.css'

export default class TodoListItem extends Component {

	render() {
		const {label, onDeleted, onToggleDone, onToggleImportant, done, important} = this.props;

		let classNames = 'todo-list-item';
		if (done) {
			classNames += ' done'
		}

		if (important) {
			classNames += ' important'
		}

		return (
			<span className={classNames}>
				<span className='todo-list-item-label'
				      onClick={onToggleDone}>
					{label.length > 40 ? `${label.slice(0, 50)}... ` : label}
				</span>
			<span>
			<button type='button' className='btn btn-outline-success btn-sm'
			onClick={onToggleImportant}>
				<i className='bi bi-star-fill'/>
			</button>
			<button type='button' className='btn btn-outline-danger btn-sm'
			onClick={onDeleted}>
				<i className='bi bi-trash-fill'/>
			</button>
			</span>
			</span>
		)
	}
}
