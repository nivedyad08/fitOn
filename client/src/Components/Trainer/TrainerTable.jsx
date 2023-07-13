import React, { useState } from 'react';
import { useFilters, usePagination, useTable, useGlobalFilter } from 'react-table';

const TrainerTable = ({ columns, data, selectedRows, trColor }) => {
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
        state: { pageIndex, globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 6 }, // Initialize the pageIndex to 0
        },
        useFilters,
        useGlobalFilter,
        usePagination,
    );

    const handleFilterChange = e => {
        const value = e.target.value || '';
        setGlobalFilter(value);
    };

    return (
        <div className="rounded-lg shadow overflow-x-auto">
            <div className="p-4">
                <div className="flex items-center mb-4 mt-20 justify-between">
                    <input
                        value={ globalFilter || '' }
                        onChange={ handleFilterChange }
                        placeholder="Search name"
                        className="p-2 px-4 text-sm py-10 text-white border focus:border-gray-500 custom-blue border-gray-600 rounded-md mr-4"
                        style={ { width: '80%' } }
                    />
                </div>
                <div className="inline-block min-w-full overflow-hidden">
                    <table { ...getTableProps() } className="min-w-full divide-y w-full text-sm text-center text-gray-100 dark:text-gray-400 mt-10">
                        <thead className="text-sm uppercase text-custom-whitish" style={ { background: trColor } }>
                            { headerGroups.map(headerGroup => (
                                <tr { ...headerGroup.getHeaderGroupProps() } style={ { borderStyle: 'hidden', marginBottom: '10px', lineHeight: '24px' } }>
                                    { headerGroup.headers.map(column => (
                                        <th
                                            { ...column.getHeaderProps() }
                                            className="px-4 py-2 font-medium text-custom-whitish uppercase tracking-wider"
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
                                    <tr { ...row.getRowProps() } className="border-b border-gray-700">
                                        { row.cells.map(cell => (
                                            <td { ...cell.getCellProps() } className="px-10 capitalize py-20">
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
                                className={ `${ canPreviousPage ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-300 pointer-events-none'
                                    } text-gray-500 px-4 py-2 rounded-md mr-2` }
                            >
                                Previous
                            </button>
                            <button
                                onClick={ () => nextPage() }
                                disabled={ !canNextPage }
                                className={ `${ canNextPage ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-300 pointer-events-none'
                                    } text-gray-500 px-4 py-2 rounded-md` }
                            >
                                Next
                            </button>
                        </div>
                        <div className="text-gray-400">
                            Page{ ' ' }
                            <strong>
                                { pageIndex + 1 } of { pageOptions.length }
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerTable;
