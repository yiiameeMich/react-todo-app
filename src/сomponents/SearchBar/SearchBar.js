import React, {Component} from "react";
import './SearchBar.css';
import ItemAddForm from "../ItemAddForm/ItemAddForm";

export default class SearchBar extends Component{

	state = {
		label: '',
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.label.trim()){
			return 0;
		} else {
			this.props.onAdd(this.state.label);
			this.setState({
				label: ''
			})
		}
	};

	render(){
		return (
			<form className='item-add-form d-flex'
			      onSubmit={this.onSubmit}>
				<input type='text'
				       placeholder='Type task here'
				       className='form-control'
				       value={this.state.label}
				       onChange={this.onLabelChange}/>
				<ItemAddForm onAdd={this.onLabelChange} />
			</form>
		);
	};
}



