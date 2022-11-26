import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, userUpdateRole} from '../../redux/actions/actions';
// Acá cambiarle por las acciones adecuadas (getUsers, deleteUser, userUpdateRole)
import style from "./DeleteProduct.module.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';


export const UserAdmin= () => {


    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users);
    const [input, setInput ] = useState({role: ''})

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])
    
    
    const handleDelete = (id)=>{
        swal({
          title: "¿Esta seguro que desea eliminar el usuario?",
          icon: "warning",
          buttons: ["Cancelar","Eliminar"]
        })
        .then((willDelete)=>{
          if(willDelete){
            dispatch(deleteUser(id))
            swal({
              title: "Usuario Eliminado",
              text: 'Se elimino correctamente el usuario',
              icon: "success",
              button: "Aceptar",
            })
            .then(()=>{
              window.location.reload()
            })
          }
        })
    }

    function handleSubmit(id){
      swal({
        title: "¿Esta seguro que desea cambiar privilegios del usuario?",
        icon: "warning",
        buttons: ["Cancelar","Actualizar"]
      })
      .then((willUpdate)=>{
        if(willUpdate){
          dispatch(userUpdateRole(id, input))
          swal({
            title: "Usuario Actualizado",
            text: 'Se actualizo el rol correctamente',
            icon: "success",
            button: "Aceptar",
          })
          .then(()=>{
            window.location.reload()
          })
        }
      })
    }

    
    function handleSelect(e){
      setInput({
        ...input,
        role: e.target.value
      });
    }
    

  return (
    <div>
          <div className={style.container}> 
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