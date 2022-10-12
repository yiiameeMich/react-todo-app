import React, {Component} from 'react';
import './FilterButtons.css'

export default class FilterButtons extends Component{

	buttons = [
		{
			name: 'all', label: 'All'
		},
		{
			name: 'active', label: 'Active'
		},
		{
			name: 'done', label: 'Done'
		},
		{
			name: 'important', label: 'Important'
		}
	];

	render(){

		const {filter, onFilterChange, todos} = this.props;

		const buttons = this.buttons.map(({name, label}) => {

			const isActive = filter === name;
			const claxx = isActive ? 'btn-active' : 'btn-info';

			return (
				<button key={name} type='button'
				        className={`btn ${claxx}`}
				onClick={() => {
					onFilterChange(todos, name)
				}}>{label}</button>
			)
		});

		return (
			<span className='btn-group'>
				{buttons}
			</span>
		)
	}

}

;