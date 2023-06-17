import React, { useState } from 'react';
import { useFilters, useTable } from 'react-table';

const Table = ({ columns, data, handleCheckBoxClick, selectedRows }) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter
    } = useTable({
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
        setFilter("firstName", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    const handleDeleteClick = () => {
        const selectedRowsOnly = selectedRows.filter(row => row.isSelected);
        console.log(selectedRows);
    }
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4">
                <div className="flex items-center mb-4 mt-20 justify-between">
                    <input
                        value={ filterInput }
                        onChange={ handleFilterChange }
                        placeholder="Search name"
                        className="p-2 py-10 border border-white-300 rounded-md mr-4"
                        style={ { width: '80%' } } // Increase width by setting the 'width' inline style
                    />

                    <div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={ handleDeleteClick }>Delete</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Download Report</button>
                    </div>
                </div>
                <table { ...getTableProps() } className="min-w-full divide-y divide-gray-200 mt-10">
                    <thead>
                        { headerGroups.map(headerGroup => (
                            <tr { ...headerGroup.getHeaderGroupProps() } className="bg-gray-100">
                                { headerGroup.headers.map(column => (
                                    <th
                                        { ...column.getHeaderProps() }
                                        className="px-4 py-2 font-medium text-gray-700 uppercase tracking-wider"
                                    >
                                        { column.render('Header') }
                                    </th>
                                )) }
                            </tr>
                        )) }
                    </thead>
                    <tbody { ...getTableBodyProps() }>
                        { rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr { ...row.getRowProps() } className="hover:bg-gray-50">
                                    { row.cells.map(cell => (
                                        <td
                                            { ...cell.getCellProps() }
                                            className="px-4 py-10 text-gray-700 border-t"
                                        >
                                            { cell.render('Cell') }
                                        </td>
                                    )) }
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
