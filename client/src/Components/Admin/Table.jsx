import React, { useState } from 'react';
import { useFilters, usePagination, useTable } from 'react-table';

const Table = ({ columns, data, selectedRows }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of using 'rows', we will use 'page' for pagination
        prepareRow,
        setFilter,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 ,pageSize:6}, // Initialize the pageIndex to 0
        },
        useFilters,
        usePagination // Add usePagination hook
    );

    const [filterInput, setFilterInput] = useState('');

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter('firstName', value);
        setFilterInput(value);
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4">
                <div className="flex items-center mb-4 mt-20 justify-between">
                    <input
                        value={ filterInput }
                        onChange={ handleFilterChange }
                        placeholder="Search name"
                        className="p-2 py-10 border border-white-300 rounded-md mr-4"
                        style={ { width: '80%' } }
                    />

                    <div>
                        {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Download Report</button> */ }
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
                        { page.map(row => {
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

                {/* Pagination */ }
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={ () => previousPage() }
                            disabled={ !canPreviousPage }
                            className={ `${ canPreviousPage
                                    ? 'bg-blue-500 hover:bg-blue-700'
                                    : 'bg-gray-300 pointer-events-none'
                                } text-white px-4 py-2 rounded-md mr-2` }
                        >
                            Previous
                        </button>
                        <button
                            onClick={ () => nextPage() }
                            disabled={ !canNextPage }
                            className={ `${ canNextPage
                                    ? 'bg-blue-500 hover:bg-blue-700'
                                    : 'bg-gray-300 pointer-events-none'
                                } text-white px-4 py-2 rounded-md` }
                        >
                            Next
                        </button>
                    </div>
                    <div>
                        Page{ ' ' }
                        <strong>
                            { pageIndex + 1 } of { pageOptions.length }
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
