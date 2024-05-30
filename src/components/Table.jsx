import React,{useState} from 'react'
import styled from 'styled-components'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import DeleteUserRenderer from './Renderers/DeleteUserRenderer';
import StatusUserRenderer from './Renderers/StatusUserRenderer';
import UpdateStatusCellRenderer from './Renderers/UpdateStatusCellRenderer';

const Container = styled.div`
  margin-top: 6%;
  margin-left: 18%;
`;

const statusOptions = ['Pending', 'Approved', 'Rejected'];
const StatusSelect = styled.select`
  color: ${({ value }) => {
    switch (value) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Rejected':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-color: ${({ value }) => {
    switch (value) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Rejected':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-radius: 5px;
  padding: 2px;
`;

const StatusCellRenderer = (params) => {
  const selectedValue = params.value || 'Pending';
  const handleChange = (event) => {
    params.setValue(event.target.value);
  };

  return (
    <StatusSelect value={selectedValue} onChange={handleChange}>
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StatusSelect>
  );
};

const Table = () => {
    const [rowData, setRowData] = useState([]);
    const [formData,setFormData] = useState({username:"",email:""});

    const [colDefs, setColDefs] = useState([
        { headerName:"Username" ,field: "username" },
        { headerName:"Email" ,field: "email" },
        { headerName:"Name" ,field: "name", editable: true },
        { headerName:"Last Name" ,field: "lastname", editable: true },
        {
            headerName: 'Status',
            field: 'status',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: statusOptions,
            },
            cellRenderer: StatusCellRenderer,
        },
        {
            headerName: 'Update Status',
            cellRenderer: UpdateStatusCellRenderer,
        },
        {
            headerName: 'Update User',  
            cellRenderer: StatusUserRenderer,
        },
        {
            headerName: 'Delete User',
            cellRenderer: DeleteUserRenderer,
        }
    ]);

    const onChange=(e)=>{
        const {value,id}= e.target
        console.log(value,id);
        setFormData({...formData,[id]:value})
    }

    const onGridReady=(params)=>{
        console.log("grid is ready");
        fetch("http://localhost:5005/api/users/alldata")
        .then(resp=>resp.json())
        .then(resp=>{
            console.log(resp)
            params.api.applyTransaction({add:resp})
        }
        )
    }
    const defaultColDef = {
        sortable :true,
        flex:1, 
        filter:true,
        floatingFilter:true
      }
  return (
    <Container>
      <div className="ag-theme-material" style={{ height: 570 }} >
        
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={true}
      />
    </div>
    </Container>
    
  )
}

export default Table
