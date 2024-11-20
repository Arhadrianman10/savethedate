import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import 'datatables.net';
import Image from 'next/image';

function Sanciones({ invocadoresData, season, setIsLoading  }) {
	const [sanciones, setSanciones] = useState([]);
	
	
	useEffect(() => {
		const fetchData = async () => {
		  if (season) {
			try {
				let url = '/api/sanciones';
				if (season !== 'GLOBAL') {
				  url += `?season=${season}`;
				}
				let sancionesResponse = await fetch(url);
				if (!sancionesResponse.ok) {
				throw new Error(`HTTP error! status: ${sancionesResponse.status}`);
				}
				let sancionesData = await sancionesResponse.json();

				try {
					const response = await fetch('/api/procesarSanciones', {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
					  },
					  body: JSON.stringify({ seasonsData: sancionesData, invocadoresData }),
					});
					if (!response.ok) {
					  throw new Error('Error en la respuesta del servidor');
					}
					const sancionesProcesadas = await response.json();
					setSanciones(sancionesProcesadas);
				} catch (error) {
				console.error('Error al procesar bans:', error);
				}
				

			} catch (error) {
			  console.error('Error al procesar bans:', error);
			}
		  }}
	
		fetchData();
	  }, [season, invocadoresData]);

	  useEffect(() => {
		setIsLoading(false); // Iniciar la carga
	  }, [sanciones]);

	  const handleClick = (invocadorName) => {
		// Construye la URL usando el nombre del invocador.
		const url = `https://www.op.gg/summoners/euw/${invocadorName}`;
	
		// Abre la URL en una nueva pestaña.
		window.open(url, '_blank');
	  };
	  
	const columns = React.useMemo(
		() => [
			{
				Header: 'INVOCADOR',
				accessor: 'invocador',
        sortType: (rowA, rowB, columnId, desc) => {
          // Obtiene los valores de string de las filas para ordenar
          const valA = rowA.original.invocador.toLowerCase();
          const valB = rowB.original.invocador.toLowerCase();
      
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
						<div className="image-container-picks">
							<Image height='50' width='50' 
								src={row.original.imagen} 
								alt="Imagen Personalizada" 
							/>
						</div>
					
						{/* Parte Central - Invocador y Ranking */}
						<div className="invocador-container">
							<div className="invocador-name" key={row.id} onClick={() => handleClick(row.original.invocador)}>
								{row.original.invocador}
							</div>
							<div className="invocador-rank">
								{row.original.rank}
							</div>
						</div>
					
					
					</div>
				)
			},
			{
				Header: 'LEVES',
				accessor: 'sancionLeve',
				Cell: ({ value }) => (
					<div className="gamesClass">
							{`${(value)}`}
					</div>
				)
			},
			{
				Header: 'GRAVES',
				accessor: 'sancionGrave',
				Cell: ({ value }) => (
					<div className="gamesClass">
							{`${(value)}`}
					</div>
				)
			},
			{
				Header: 'MUY GRAVES',
				accessor: 'sancionMuyGrave',
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
      data: sanciones,
      initialState: { sortBy: [
		{ id: 'sancionesLeves', desc: true },
        { id: 'invocador', desc: false }
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
									<span className={`span-default-left ${column.Header === 'INVOCADOR' ? 'span-invocador-left-picks' : 'span-no-invocador-left-picks'}`}>
										<Image height='20' width='20' src="/assets/not_sort.png" alt="Not Sorted" style={{ verticalAlign: 'middle', filter: 'grayscale(100%)' }} />
									</span>
										{column.render('Header')}
									<span className={`span-default-right ${column.Header === 'INVOCADOR' ? 'span-invocador-right-picks' : 'span-no-invocador-right-picks'}`}>
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

export default Sanciones;