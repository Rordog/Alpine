import { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const DisplayJob = (props) => {

    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/api/read`).then((response) => {
          setJobList(response.data)
        })
    }, [])

    const navigate = useNavigate();

    // TODO get and post for retrieving job data and updating volunteer count

    return (
        <div className="DisplayJob">
            <h1>Job Assignment</h1>
            <div className="jobData">
                <h2>Your job: </h2>
                <h2>Location: </h2>
                <h2>Supervisor: </h2>
            </div>
            <button className="doneBtn" onClick={ () => navigate(-1)}>Done</button>
        </div>
    )
}

export default DisplayJob;