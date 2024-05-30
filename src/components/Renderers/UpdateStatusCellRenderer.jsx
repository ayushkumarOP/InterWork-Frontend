import { Button } from '@mui/material'

const UpdateStatusCellRenderer = (params) => {
    const userId = params.data._id; 
    const currentStatus = params.data.status;
  
    const handleUpdateStatus = () => {
      fetch(`http://localhost:5005/api/users/${userId}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: currentStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Status updated:', data);
          params.api.refreshCells();
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    };
  
    return <Button onClick={handleUpdateStatus}>Update Status</Button>;
  };

  export default UpdateStatusCellRenderer