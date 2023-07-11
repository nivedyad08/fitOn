import { ArrowBackOutlined } from "@mui/icons-material";
import YouTube from "react-youtube";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Watch() {
    const { workoutVideo } = useParams();
    const navigate = useNavigate();
    const opts = {
        height: "100%",
        width: "100%",
        autoplay: 1,
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="watch">
            <div className="back text-yellow-500 cursor-pointer" onClick={ () => navigate(-1) }>
                <ArrowBackOutlined />
                Go back
            </div>
            <video class="mx-auto h-screen" controls>
                <source src={ `http://localhost:8080/workouts/${ workoutVideo }` } type="video/mp4" />
            </video>
        </div>
    );
}
