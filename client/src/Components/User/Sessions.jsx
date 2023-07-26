import React, { useMemo, useState, useEffect } from "react";
import Table from "../Trainer/TrainerTable";
import { toast } from "react-toastify";
import { changeSessionStatus, sessions } from "../../Services/TrainerApi";
import { useSelector } from "react-redux";

const Session = () => {
    const [data, setData] = useState([]);
    const user = useSelector((state) => state.loggedUser.userInfo)
    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: "SessionId",
                        accessor: "_id",
                    },
                    {
                        Header: "Trainer",
                        accessor: "trainer",
                        Cell: ({ value, row }) => {
                            const thumbnail = row.original.userProfilePic
                            return (
                                <div className="flex items-center gap-x-6">
                                    {
                                        thumbnail ?
                                            <img className="h-40 w-40 " src={ thumbnail } alt="" />
                                            :
                                            <img className="h-40 w-40 " src="/images/user-plceholder.png" alt="" />

                                    }
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">{ value }</h3>
                                </div>
                            )
                        }
                    },
                    {
                        Header: "Date & Time",
                        accessor: "datetime",
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                    },
                ],
            },
        ],
        []
    );

    useEffect(() => {
        (async () => {
            sessions(user._id).then((response) => {
                setData(response.sessionsList);
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            })
        })();
    }, []);

    return (
        <>
            <div className="App h-screen w-md:full">
                <Table
                    columns={ columns }
                    data={ data }
                    trColor="#1f2044"
                />
            </div>
        </>
    );
};

export default Session;
