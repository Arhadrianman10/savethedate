import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import 'datatables.net';
import Image from 'next/image';

function Bans({season, setIsLoading  }) {
	const [bans, setBans] = useState([]);
	
	
	useEffect(() => {
		const fetchData = async () => {
		  if (season) {
			try {
				let url = '/api/bans';
				if (season !== 'GLOBAL') {
				  url += `?season=${season}`;
				}
				let bansResponse = await fetch(url);
				if (!bansResponse.ok) {
				throw new Error(`HTTP error! status: ${bansResponse.status}`);
				}
				let bansData = await bansResponse.json();

				try {
					const response = await fetch('/api/procesarBans', {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
					  },
					  body: JSON.stringify({ seasonsData: bansData }),
					});
					if (!response.ok) {
					  throw new Error('Error en la respuesta del servidor');
					}
					const bansProcesados = await response.json();
					setBans(bansProcesados);
				} catch (error) {
				console.error('Error al procesar bans:', error);
				}
				

			} catch (error) {
			  console.error('Error al procesar bans:', error);
			}
		  }}
	
		fetchData();
	  }, [season]);

	  useEffect(() => {
		setIsLoading(false); // Iniciar la carga
	  }, [bans]);

	const columns = React.useMemo(
		() => [
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
								alt="Imagen Campeon" 
							/>
						</div>
					
						{/* Parte Central - Invocador y Ranking */}
            <div className="ultimo-pick">
              {row.original.campeon}
            </div>
					</div>
				)
			},
			{
				Header: 'BANS',
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
      data: bans,
      initialState: { sortBy: [
		{ id: 'games', desc: true },
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
									<span className={`span-default-left-bans ${column.Header === 'INVOCADOR' ? 'span-invocador-left-picks' : 'span-no-invocador-left-bans'}`}>
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

export default Bans;