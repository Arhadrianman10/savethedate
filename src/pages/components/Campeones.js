	import React, { useState, useEffect } from 'react';
	import { useTable, useSortBy } from 'react-table';
	import 'datatables.net';
	import Image from 'next/image';


	function Campeones({partidasData, invocadoresData , setIsLoading }) {
		const [partidas, setPartidas] = useState([]);
		

		useEffect(() => {
			const fetchData = async () => {
			  if (partidasData && invocadoresData) {
				try {

				  const response = await fetch('/api/procesarCampeones', {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ partidasData, invocadoresData }),
				  });

				  if (!response.ok) {
					throw new Error('Error en la respuesta del servidor');
				  }
				  const partidasProcesadas = await response.json();
				  setPartidas(partidasProcesadas);
				} catch (error) {

				  console.error('Error al procesar partidas:', error);
				}
			  }
			};
		
			fetchData();
		  }, [partidasData, invocadoresData]);

		  useEffect(() => {
			setIsLoading(false); // Iniciar la carga
		  }, [partidas]);
		

		const columns = React.useMemo(
			() => [
				{
			Header: '',
			accessor: 'orden',
					Cell: ({ value }) => (
						<div className="ordenClass">
								{`${(value)}`}
						</div>
					)
		},
				{
					Header: 'CAMPEON',
					accessor: 'campeon',
					sortType: (rowA, rowB, columnId, desc) => {
						// Obtiene los valores de string de las filas para ordenar
						const valA = rowA.original.campeon.toLowerCase();
						const valB = rowB.original.campeon.toLowerCase();
					
						// Compara los strings alfabéticamente
						if (valA > valB) {
						return 1;
						}
						if (valA < valB) {
						return -1;
						}
						// Si son iguales
						return 0;
					},
					Cell: ({ row }) => (
						<div className="component-container">
	
							{/* Parte Izquierda - Imagen */}
							<div className="image-campeon-container">
								<Image height='50' width='50'
									src={row.original.imagen} 
									alt="Imagen Personalizada" 
								/>
							</div>
						
							{/* Parte Central - campeones */}
							<div className="campeon-container">
								<div className="campeon-name">
									{row.original.campeon}
								</div>
							</div>
						
							{/* Parte Derecha - Valores Numéricos */}
							<div className="numbers-container">
							<span className="numbers">
									{parseFloat(row.original.killsMedia.toFixed(2))} / 
									{parseFloat(row.original.deathsMedia.toFixed(2))} / 
									{parseFloat(row.original.assistsMedia.toFixed(2))}
							</span>
							</div>
						
						</div>
					)
				},
				{
					Header: 'WIN RATIO',
					accessor: 'winRatio',
					Cell: ({ value }) => (
						<div className="winRatioClass">
								{`${(value * 100).toFixed(2)}%`}
						</div>
					),
					sortType: (rowA, rowB, columnId, desc) => {
						// Obtiene los valores numéricos de las filas para ordenar
						const valA = rowA.values[columnId];
						const valB = rowB.values[columnId];
		
						// Realiza la comparación numérica
						return valA > valB ? 1 : -1;
					}
				},
				{
					Header: 'KDA',
					accessor: 'kda',
					Cell: ({ value }) => (
						<div className="kdaClass">
								{`${(value).toFixed(2)}`}
						</div>
					),
					sortType: (rowA, rowB, columnId, desc) => {
						// Obtiene los valores numéricos de las filas para ordenar
						const valA = rowA.values[columnId];
						const valB = rowB.values[columnId];
		
						// Realiza la comparación numérica
						return valA > valB ? 1 : -1;
					}
				},
				{
					Header: 'GAMES',
					accessor: 'games',
					Cell: ({ value }) => (
						<div className="gamesClass">
								{`${(value)}`}
						</div>
					)
				},
			],
			[]
		);

		const {
			getTableProps,
			getTableBodyProps,
			headerGroups,
			rows,
			prepareRow,
		} = useTable(
		{
		columns,
		data: partidas,
		initialState: { sortBy: [
			{ id: 'winRatio', desc: true },
			{ id: 'games', desc: true },
			{ id: 'kda', desc: true },
			{ id: 'campeon', desc: false }
		]}
		},
		useSortBy
	);

		return (
			<div className="container">
				<div className="table-container card table-responsive neonBox">
					<table {...getTableProps()} id="partidasTable" className="table table-dark table-hover table-striped mx-auto">
						<thead className="thead-dark">
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
									{headerGroup.headers.map(column => (
										<th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
										<span className={`span-default-left ${column.Header === 'CAMPEON' ? 'span-campeon-left' : 'span-no-campeon-left'}`}>
											<Image height='20' width='20' src="/assets/not_sort.png" alt="Not Sorted" style={{ verticalAlign: 'middle', filter: 'grayscale(100%)' }} />
										</span>
											{column.render('Header')}
										<span className={`span-default-right ${column.Header === 'CAMPEON' ? 'span-campeon-right' : 'span-no-campeon-right'}`}>
										{column.isSorted 
											? (column.isSortedDesc 
													? <Image height='20' width='20' src="/assets/sort_desc.png" alt="Sort Descending" style={{ verticalAlign: 'middle', filter: 'grayscale(100%)' }} />
													: <Image height='20' width='20' src="/assets/sort_asc.png" alt="Sort Ascending" style={{ verticalAlign: 'middle', filter: 'grayscale(100%)'  }} />)
											: <Image height='20' width='20' src="/assets/not_sort.png" alt="Not Sorted" style={{ verticalAlign: 'middle', filter: 'grayscale(100%)' }} />
										}
										</span>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map(row => {
								prepareRow(row);
								const rowProps = row.getRowProps();
								let additionalClassName = '';
															
								rowProps.className = `${rowProps.className || ''} ${additionalClassName}`;
												
								return (
										<tr {...rowProps}  key={row.id}>
												{row.cells.map(cell => {
														return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>;
												})}
										</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	export default Campeones;

