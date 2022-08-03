import React, { useState } from 'react';
const Restourant = ({id, title, code, address, restourants, setRestourants, setError, editRestourant, editMode, showHide}) => {
    const [token, _] = useState(localStorage.getItem("token"));
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };
    
    function deleteRestourant(id, e) {

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const remaining = restourants.filter(r => id !== r.id)
                    setRestourants(remaining)
                    setError(null);
                }
            });
    }
  



    return ( 
        <tr> 
            <td>{title}</td>
            <td>{code}</td>
            <td>{address} </td>
            <td><button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => deleteRestourant(id, e)} className="btn btn-dark mx-2">Delete</button>
                <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => {editRestourant(id, e)}} className="btn btn-dark">Edit</button>
                </td>
        </tr>
     );
}
 
export default Restourant;