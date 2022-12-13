import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import logo from './BSFlogo.jpg'
import icon from './BSFIcon.jpg'

const DisplayJob = (props) => {

    const savedTracker = Number(localStorage.getItem('tracker'));
    const [tracker, setTracker] = useState(Number.isInteger(savedTracker) ? savedTracker : 0);
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
	localStorage.setItem('tracker', String(tracker));
	if(jobList[tracker] === undefined){setTracker((c)=>0);}
	axios.get(`${process.env.REACT_APP_HOST}/api/jobs`).then((response) => {
          setJobList(response.data);
      	})
        sortTable();
    }, [tracker])

    const navigate = useNavigate();

    const updateCount = () => {
	if(jobList[tracker] !== undefined){
		if(jobList[tracker].numVolunteersReq != 0){
			setTracker((c) => c + 1);
			if(jobList[tracker].numVolunteersReq === 0 || jobList[tracker] === undefined){
				setTracker((c) =>0);
			}
		} else {
			setTracker((c)=>0);
		}
	} else {
		setTracker((c)=>0);
	}
	localStorage.setItem('tracker', String(tracker));
    } 
    
    function sortTable(){
        var temp, rows, switching, i, x, y, shouldSwitch;
        switching = true;
        while(switching){
            switching = false;
	    for(i = 0; i < (jobList.length-1); i++){
                shouldSwitch = false;
                x = jobList[i].numVolunteersReq;
		    y = jobList[i+1].numVolunteersReq;
		    if(Number(x) < Number(y)){
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if(shouldSwitch){
            temp = jobList[i];
	    jobList[i] = jobList[i+1];
	    jobList[i+1] = temp;
            switching  = true;
        }
    }
    
    return (
        <div className="DisplayJob">
	    <header>
                <div className="header">
                    <img src={icon} alt="icon"/>
                </div>
            </header>
            <h1>Job Assignment</h1>
            <div className="jobData">
	    	{jobList.map((job, index) => {
			if(index === tracker){
				return(
					<div key={index}>
					<h2>Job: {job.jobName}</h2>
					<h2>Location: {job.jobLocation}</h2>
					<h2>Supervisor: {job.supervisorFirst}</h2>
					<script> job.numVolunteersReq -= 1;</script>
					<hr />
				    </div>
				);
			}
		})}
            </div>
            <button className="doneBtn" onClick={ () => {updateCount(); navigate(-1);}}>Done</button>
            <footer>
	    	<div className="endImg">
		    <img src={logo} alt="logo"/>
	    		<h4> Hosted by: Rory Donley-Lovato - s73h545</h4>
	    		<p> <b>Port:</b> 5053</p>
	    		<p> I created the job assignment feature and connected it to the main volunteer page.</p>
	    		<p> I organized my group for both the beginning half of the project and prepared the feature parts of our presentation as well as the slide for my part. </p>
	    		<p> The job assigner gets the job table from the database and sorts it based on number of volunteers needed per job. </p>
	    		<p> It will display the title, supervisor, and location of the job until the user clicks done and is redirected back to the sign-in page, making the system ready for the next user. </p>
	        </div>
	    </footer>
        </div>
    )
}

export default DisplayJob;
