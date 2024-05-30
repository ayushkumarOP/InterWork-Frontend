// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { TextField } from '@mui/material';

// export default function FormDialog({open,handleClose,data,onChange}) {
//     const {username,email}= data;
//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">Create new User</DialogTitle>
//         <DialogContent>
//           <form>
//             <TextField id="username" value={username} onChange={e=>onChange(e)} placeholder='Enter username' label="username" margin="dense" fullWidth/>
//             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder='Enter email' label="email" margin="dense" fullWidth/>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary" variant='outlined'>
//             cancel
//           </Button>
//           <Button color="primary" } variant='contained'>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
