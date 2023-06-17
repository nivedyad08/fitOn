import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../config/axios"

const UsersList = () => {
    const [selectedRows, setSelectedRows] = useState([])
    const handleCheckBoxClick = (row) => {
        if (row.isSelected) {
            setSelectedRows((prevSelectedRows) =>
                prevSelectedRows.filter((selectedRows) => selectedRows.id !== row.id))
        } else {
            setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row])
        }
    }

    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: "Users",
                columns: [
                    {
                        id: "checkbox",
                        Header: "",
                        accessor: "_id",
                        Cell: ({ row }) => (
                            <input
                                type="checkbox"
                                className="w-20"
                                checked={ row.isSelected }
                                value={ row.values["_id"] }
                                onChange={ () => handleCheckBoxClick(row) }
                            />
                        ),
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                    },
                    {
                        Header: "Location",
                        accessor: "userLocation",
                    },
                    {
                        Header: "Status",
                        accessor: "isActive",
                        Cell:({value})=>{
                            return value === true ? <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Active</span>: <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</span>
                        }
                    },
                ],
            },
        ],
        []
    );

    // data state to store the TV Maze API data. Its initial value is an empty array
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/admin/users");
            const usersWithSelection = result.data.users.map(user => ({
                ...user,
                isSelected: false // Add the isSelected property to each row
            }));
            setData(usersWithSelection);
        })();
    }, []);

    return (
        <div className="App">
            <Table columns={ columns } data={ data } handleCheckBoxClick={ handleCheckBoxClick } selectedRows={ selectedRows } />
        </div>
    );
}

export default UsersList;
