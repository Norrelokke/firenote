import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
	const { onlineUser } = useAuthContext()
	return (
		<Navbar variant="light" expand="md">
			<Container>
				<Link to="/" className="navbar-brand">
					<span role="img"></span> FireNote
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">

						{onlineUser ? (
							<>
								<NavDropdown title={onlineUser.email} id="basic-nav-dropdown">
									<NavLink to="/myprofile" className="nav-link">My Profile</NavLink>
									<NavDropdown.Divider />
									<NavLink to="/logout" className="nav-link"> Logout</NavLink>
								</NavDropdown>
							</>

						) : (
							<>
								<NavLink to="/loginPage" className="nav-link">Login</NavLink>
								<NavLink to="/login" className="nav-link"></NavLink>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
