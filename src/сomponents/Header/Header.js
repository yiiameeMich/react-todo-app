import React from "react";
import './Header.css'

const Header = ({done, left}) => {

	return (
		<div className='HeaderContainer'>
			<h1 className='HeaderHeading'>ToDo Handler</h1>
			<h1 className='ActiveStatus'> {left} active, {done} done</h1>
		</div>
	);
};

export default Header;