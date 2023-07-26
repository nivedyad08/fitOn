import React, { useMemo, useState, useEffect } from "react";
import Table from "../Trainer/TrainerTable";
import { toast } from "react-toastify";
import { fetchUserFavourites } from "../../Services/UserApi"
import { useSelector } from "react-redux";
import { dateMonthYear } from "../../helpers/CommonFunctions";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const Favourites = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const user = useSelector((state) => state.loggedUser.userInfo)
    useEffect(() => {
        fetchUserFavourites(user._id).then((response) => {
            setData(response.favourites);
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }, []);


    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: "Workout",
                        accessor: "workout[0].workoutTitle",
                        Cell: ({ row }) => {
                            const data = row.original.workout
                            return (
                                <div className="flex items-center gap-x-6">
                                    <img className="h-40 w-40 " src={ data[0].thumbnailImage } alt="" />
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">{ data[0].workoutTitle }</h3>
                                </div>
                            )
                        }
                    },
                    {
                        Header: "Trainer",
                        accessor: "trainer[0].firstName",
                        Cell: ({ row }) => {
                            const data = row.original.trainer
                            return (
                                <span> { data[0].firstName } { data[0].lastName }</span>
                            )
                        }
                    },
                    {
                        Header: "Date",
                        accessor: "userFavourites.createdAt",
                        Cell: ({ value, row }) => {
                            const data = row.original.userFavourites
                            return (
                                dateMonthYear(data.createdAt)

                            );
                        },
                    },
                    {
                        Header: "Action",
                        accessor: "status",
                        Cell: ({ row }) => {
                            const data = row.original.workout
                            return (
                                <VisibilityIcon className="cursor-pointer mt-6" onClick={ () => navigate(`/user/trainer/watch/${ data[0].video }/${ data[0].workoutId }`) } />
                            );
                        },
                    },
                ],
            },
        ],
        []
    );
    return (
        <div className="App h-screen w-md:full">
            <Table
                columns={ columns }
                data={ data }
                trColor="#303252"
            />
        </div>
    );
}
export default Favourites;
