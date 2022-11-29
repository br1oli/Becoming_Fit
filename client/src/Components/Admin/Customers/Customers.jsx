import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserProfiles, getAllUsers, getUserProfileByEmail, deleteUser, deleteUserProfile, updateUserProfile } from '../../../Redux/Actions/UsersActions'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';

export const UserList= () => {

    const dispatch = useDispatch();
    const users = useSelector((state)=> state.usersStore);

    useEffect(()=>{
        dispatch(getAllUsers())
    }, [dispatch])    

    // handleDelete (Para borrar usuarios)
    // handleBanned (Para bannear o desbannear usuarios)
    // handleAdminPermissions (Para otorgar permisos de admin o quitarlos)
    // handlePassword Reset (Para forzarle al usuario a reescribir su password)
    
   return (
    <div>
          <div > 
          <h2> Usuarios Activos</h2>
            <table className={style.table}>
            <thead className={style.tableHead}>
             <tr>      
              <th> Nº </th>
              <th> Nombre </th>
              <th className={style.email}> Email </th>
              <th> Rol </th>
              <th>  </th>
              <th> Privilegios </th>
              </tr>      
            </thead>
               { users.result?.map(((e,index)=>
              <tbody key={e.uid} className={style.tableBody}>
                <tr >
                <td style={{width:'50px'}}>{index + 1}</td>
                <td>{e.name}</td>
                <td className={style.email}>{e.email}</td>
                <td>{e.role}</td>
                <td style={{width:'50px'}}>
                  <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} onClick={()=>handleDelete(e.uid)}> <DeleteIcon/>  </Button>
                  </td>
                <td> 

               
                <select onChange={(e)=> handleSelect(e)}>
                  <option hidden> Privilegios </option>
                  <option value='ADMIN_ROLE'>Admin</option>
                  <option value='SALES_ROLE'>Ventas</option>
                  <option value='USER_ROLE'>Usuario</option> 
                         
                </select>
                <Button onClick={()=>handleSubmit(e.uid)} style={{maxWidth: '100px', maxHeight: '20px', minWidth: '35px', minHeight: '20px'}} variant="contained" className={style.button} type="submit" > Actualizar </Button>
                </td>
                </tr>

              </tbody>
              ))
            } 
              </table>
       </div>      
    </div>
  )
}