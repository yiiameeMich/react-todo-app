import React from "react";
import './Header.css'

const Header = ({done, left, important}) => {

	return (
		<div className='HeaderContainer'>
			<h1 className='HeaderHeading'>ToDo Handler</h1>
			<div className="activeContainer">
				<h1 className="ActiveStatus">
					{left} active
				</h1>
				<h1 className="ActiveStatus">
					{done} done
				</h1>
				<h1 className="ActiveStatus">
					{important} important
				</h1>
			</div>
		</div>
	);
};

export default Header;