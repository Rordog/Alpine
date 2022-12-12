import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const JobSheet = () =>{


  const columns = [
  { field: 'supervisor', headerName: 'Supervisor', width: 130 },
  { field: 'jobLocation', headerName: 'Location', width: 130 },
  { field: 'jobTitle', headerName: 'Job', width: 130},
  {
    field: 'numVolunteers',
    headerName: 'Num. Volunteer(s)',
    type: 'number',
    width: 130,
  },
];
	console.log(process.env.REACT_APP_HOST);

const [entryList, setEntryList] = useState([])

useEffect(() => {
	axios.get(`${process.env.REACT_APP_HOST}/api/jobs`).then((response) => {
		setEntryList(response.data)
	})
}, [])

console.log(entryList);

const rows = entryList.map(entry => {
  return{
    id: entry.jobID,
    jobLocation: entry.jobLocation,
    supervisor: `${entry.supervisorFirst} ${entry.supervisorLast}`,
    jobTitle: entry.jobName,
    numVolunteers: entry.numVolunteersReq
  }
})

  return (
    <div style={{ height: 319, width: '45%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default JobSheet;