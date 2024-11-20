import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';

function Header({ setActiveComponent, setSeason, selectedSeason, gamesTotal, seasons }) {
	// Estado para controlar qué componente está activo
	const [activeComponent, setActiveComponentState] = useState('partidas');

	// Función para actualizar el componente activo
	const handleSetActiveComponent = (component) => {
		setActiveComponentState(component);
		setActiveComponent(component);
	};

	const handleSeasonChange = (event) => {
		setSeason(event.target.value);
	};

	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand onClick={() => handleSetActiveComponent('partidas')} className="clickable-brand">
					<Image src="/assets/IconDogs.png" alt="LOD" height='60' width='60' style={{ marginRight: '20px' }} />
					League of Dogs
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as="button" active={activeComponent === 'partidas'} onClick={() => handleSetActiveComponent('partidas')}>Partidas</Nav.Link>
						<Nav.Link as="button" active={activeComponent === 'ultimosPicks'} onClick={() => handleSetActiveComponent('ultimosPicks')}>Últimos picks</Nav.Link>
						<Nav.Link as="button" active={activeComponent === 'campeones'} onClick={() => handleSetActiveComponent('campeones')}>Campeones</Nav.Link>
						<Nav.Link as="button" active={activeComponent === 'bans'} onClick={() => handleSetActiveComponent('bans')}>Bans</Nav.Link>
						<Nav.Link as="button" active={activeComponent === 'sanciones'} onClick={() => handleSetActiveComponent('sanciones')}>Sanciones</Nav.Link>
						{/* ... Tus otros Nav.Link aquí ... */}
						<Nav.Link href="https://drive.google.com/file/d/1y0O0ZAGb_jlXrVlKWiAKlyngqh7EHdyQ/view" target="_blank" rel="noreferrer">Reglas</Nav.Link>
						<Nav.Item>
								<Nav.Link disabled>
										Partidas totales: {gamesTotal}
								</Nav.Link>
						</Nav.Item>
						<div>
								<ProgressBar gamesTotal={gamesTotal} />
						</div> 
						<form className="d-flex">
								<select className="custom-select" value={selectedSeason} onChange={handleSeasonChange}>
								{seasons && seasons.map(season => (
										<option key={season} value={season}>{season}</option>
								))}
								</select>
								{/* ... resto del código del formulario */}
						</form>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
