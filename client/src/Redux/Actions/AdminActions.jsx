import { UPDATE_USER } from "./Const";
import axios from "axios";

export function updateUserPermissions(values) {
  //values se le tiene que pasar isBanned si se quiere bannear o adminPermissions si se lo quiere volver admin
  //ej: para despachar esta accion dispatch(updateUserPermissions(email, {isBanned: true, adminPermissions: false})) o dispatch(updateUserPermissions(email, {isBanned: false, adminPermissions: true}))
  //la ruta devuelve el user actualizado
  return async (dispatch) => {
    try {
      const response = await axios.put(`/user/${values.email}`, values);
      return dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_USER,
        payload: error.response.data,
      });
    }
  };
}
