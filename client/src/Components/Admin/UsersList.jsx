import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../config/axios";

const UsersList = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckBoxClick = (email) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(email)) {
        // Remove the email from selectedRows if it is already present
        return prevSelectedRows.filter((row) => row !== email);
      } else {
        // Add the email to selectedRows if it is not present
        return [...prevSelectedRows, email];
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        // Second group columns
        Header: "Users",
        columns: [
          {
            id: "checkbox",
            Header: "",
            accessor: "email",
            Cell: ({ row }) => (
              <input
                type="checkbox"
                className="w-20"
                onChange={() => handleCheckBoxClick(row.original.email)}
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
            Cell: ({ value }) => {
              return value === true ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Active
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Inactive
                </span>
              );
            },
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/admin/users");
      const usersWithSelection = result.data.users.map((user) => ({
        ...user,
        isSelected: false,
      }));
      setData(usersWithSelection);
    })();
  }, []);

  return (
    <div className="App">
      <Table
        columns={columns}
        data={data}
        handleCheckBoxClick={handleCheckBoxClick}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default UsersList;
