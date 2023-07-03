import React, { useState } from 'react';
import { useFilters, useTable } from 'react-table';

const Table = ({ columns, data, selectedRows }) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters
    );

    // Create a state
    const [filterInput, setFilterInput] = useState('');

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter('workoutTitle', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    return (
        <div className="rounded-lg shadow overflow-x-auto">
            <div className="p-4">
                <div className="flex items-center mb-4 mt-20 justify-between">
                    <input
                        value={filterInput}
                        onChange={handleFilterChange}
                        placeholder="Search name"
                        className="p-2 px-4 text-sm py-10 text-white border custom-blue border-gray-600 rounded-md mr-4"
                        style={{ width: '20%' }} // Increase width by setting the 'width' inline style
                    />
                </div>
                <div className="inline-block min-w-full overflow-hidden">
                    <table {...getTableProps()} className="min-w-full divide-y w-full text-sm text-center text-gray-100 dark:text-gray-400 mt-10">
                        <thead className="text-sm uppercase custom-blue text-custom-whitish">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} style={{ borderStyle: 'hidden', marginBottom: '10px', lineHeight: '24px' }}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="px-4 py-2 font-medium text-custom-whitish uppercase tracking-wider"
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="border-b border-gray-700">
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="px-10 py-20">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
