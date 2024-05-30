import { Button } from '@mui/material'

const StatusUserRenderer = (params) => {
    const userId = params.data._id;
    const currentName = params.data.name;
    const currentLastName = params.data.lastname;

    const handleUpdateUser = () => {
        fetch(`http://localhost:5005/api/users/${userId}/update-name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: currentName, lastname: currentLastName }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User name updated:', data);
                params.api.refreshCells();
            })
            .catch((error) => {
                console.error('Error updating user name:', error);
            });
    };

    return <Button onClick={handleUpdateUser}>Update User</Button>;
};

export default StatusUserRenderer;