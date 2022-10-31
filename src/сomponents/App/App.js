import React, {Component} from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import TodoList from "../TodoList/TodoList";
import './App.css';
import '../TodoList/TodoListItem.css'
import '../TodoList/TodoList.css'
import FilterButtons from "../FilterBtns/FilterButtons";


export default class App extends Component {

	maxId = 100;

	createTodoItem = (label) => {

		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}

	};

	state = {
		todoList: JSON.parse(localStorage.getItem('todos')) || [],
		filter: 'all', //'done' 'active'
		filteredList: JSON.parse(localStorage.getItem('todos')) || [],
	}

	onFilterChange = (filter) => {
		this.setState({filter});
	};

	propToggle = (arr, id, prop) => {
		const index = arr.findIndex((el) => el.id === id);

		const oldItem = arr[index];

		const newItem = {...oldItem, [prop]: !oldItem[prop]};

		const newList = [
			...arr.slice(0, index),
			newItem,
			...arr.slice(index + 1)
		];

		localStorage.setItem('todos', JSON.stringify(newList))

		return newList
	}

	deleteItem = (id) => {

		this.setState(({todoList}) => {

			const newList = [...todoList].filter((el) => el.id !== id)

			localStorage.setItem('todos', JSON.stringify(newList))

			return {
				todoList: newList,
				filteredList: newList
			};
		});
	};

	addItem = (text) => {

		const newItem = this.createTodoItem(text)

		this.onFilterChange('all');

		this.setState(({todoList}) => {

			const newList = [
				...todoList,
				newItem
			];

			localStorage.setItem('todos', JSON.stringify(newList))

			return {
				todoList: newList,
				filteredList: newList,
			}
		});

	};

	onToggleImportant = (id) => {
		this.setState(({todoList, filteredList}) => {
			return {
				todoList: this.propToggle(todoList, id, 'important'),
				filteredList: this.propToggle(filteredList, id, 'important')
			};
		});
	};

	onToggleDone = (id) => {

		this.onFilterChange('all')

		this.setState(({todoList}) => {
			return {
				todoList: this.propToggle(todoList, id, 'done'),
				filteredList: this.propToggle(todoList, id, 'done')
			};
		});
	};

	filterItems = (items, filter) => {

		let newArr;

		this.setState({filter});

		switch (filter) {
			case 'all':
				this.setState({filteredList: this.state.todoList});
				break;
			case 'active':
				newArr = items.filter((item) => !item.done);
				this.setState({filteredList: newArr});
				break;
			case 'done':
				newArr = items.filter((item) => item.done);
				this.setState({filteredList: newArr});
				break;
			case 'important':
				newArr = items.filter((item) => item.important);
				this.setState({filteredList: newArr});
				break;
			default:
				return items;
		}
	}

	render() {

		const {todoList, filter, filteredList} = this.state;

		const doneCount = todoList.filter((el) => el.done).length;

		const importantCount = todoList.filter((todo) => todo.important).length;

		const todoLeft = todoList.length - doneCount;

		if (filteredList.length >= 1) {
			return (
				<div className="App">
					<div className='appContainer'>
						<Header left={todoLeft} done={doneCount} important={importantCount}/>
						<span className='search-span'>
							<SearchBar onAdd={this.addItem}/>
							<FilterButtons filter={filter} onFilterChange={this.filterItems} todos={todoList}/>
						</span>

						<TodoList todos={filteredList}
						          onDeleted={this.deleteItem}
						          onToggleImportant={this.onToggleImportant}
						          onToggleDone={this.onToggleDone}/>
					</div>
				</div>
			);
		} else {

			if (filter === 'done') {
				return (
					<div className="App">
						<div className='appContainer'>
							<Header left={todoLeft} done={doneCount} important={importantCount}/>
							<span className='search-span'>
							<SearchBar onAdd={this.addItem}/>
							<FilterButtons filter={filter} onFilterChange={this.filterItems} todos={todoList}/>
						</span>
							<div className='list-container'>
								<ul className='list-group todo-list'>
									<li className='list-group-item' id='emptyList'>
										You haven`t done any of your tasks yet
									</li>
								</ul>
							</div>
						</div>
					</div>
				)
			} else if (filter === 'active') {
				return (
					<div className="App">
						<div className='appContainer'>
							<Header left={todoLeft} done={doneCount} important={importantCount}/>
							<span className='search-span'>
							<SearchBar onAdd={this.addItem}/>
							<FilterButtons filter={filter} onFilterChange={this.filterItems} todos={todoList}/>
						</span>
							<div className='list-container'>
								<ul className='list-group todo-list'>
									<li className='list-group-item' id='emptyList'>
										You don`t have any active tasks right now
									</li>
								</ul>
							</div>
						</div>
					</div>
				)
			} else if (filter === 'important') {
				return (
					<div className="App">
						<div className='appContainer'>
							<Header left={todoLeft} done={doneCount} important={importantCount}/>
							<span className='search-span'>
							<SearchBar onAdd={this.addItem}/>
							<FilterButtons filter={filter} onFilterChange={this.filterItems} todos={todoList}/>
						</span>
							<div className='list-container'>
								<ul className='list-group todo-list'>
									<li className='list-group-item' id='emptyList'>
										You haven`t marked any of your tasks as important
									</li>
								</ul>
							</div>
						</div>
					</div>
				)
			} else {
				return (
					<div className="App">
						<div className='appContainer'>
							<Header left={todoLeft} done={doneCount} important={importantCount}/>
							<span className='search-span'>
								<SearchBar onAdd={this.addItem}/>
								<FilterButtons filter={filter} onFilterChange={this.filterItems} todos={todoList}/>
							</span>
							<div className='list-container'>
								<ul className='list-group todo-list'>
									<li className='list-group-item' id='emptyList'>
										Add your tasks in the input above
									</li>
								</ul>
							</div>
						</div>
					</div>
				)
			}
		}
	}
}

