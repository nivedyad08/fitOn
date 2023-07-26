import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../config/axios";
import { Switch } from "@mui/material";

const UsersList = () => {
  const columns = useMemo(
    () => [
      {
        // Second group columns
        Header: " ",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
            Cell: ({ value, row }) => {
              const data = row.original
              return (
                <div className="flex items-center gap-x-6">
                  <img className="h-40 w-40 rounded-full" src={ row.original.profilePic ? row.original.profilePic : "/images/user-plceholder.png" } alt="" />
                  <h3 className="text-base leading-6 tracking-tight">{ row.original.firstName }</h3>
                </div>
              );
            },
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
            Cell: ({ value, row }) => {
              const [isChecked, setIsChecked] = useState(
                value
              );
              const handleUserStatus = async (e) => {
                setIsChecked(!isChecked);

                const response = await axios.put(
                  `/api/admin/change-user-status/${ row.original._id }`
                );
                alert(response.data.message);
              };
              return (
                <div style={ { display: "flex", flexDirection: "row" } }>
                  <Switch
                    color="success"
                    checked={ isChecked }
                    onChange={ handleUserStatus }
                  />
                </div>
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
        columns={ columns }
        data={ data }
      />
    </div>
  );
};

export default UsersList;
