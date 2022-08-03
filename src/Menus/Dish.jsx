import React, { useState } from 'react';
const Dish = ({id, menu_id, dish_name, description, price, foto_url, error, setError, menuDishes, setMenuDishes, editMode, showHide, editMenuDish}) => {
    const [token, _] = useState(localStorage.getItem("token"));
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };
    
    function deleteDish(id, e) {

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/menu/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const remaining = menuDishes.filter(md => id !== md.id)
                    setMenuDishes(remaining)
                    setError(null);
                }
            });
    }
  



    return ( 
        <tr> 
            <td>{menu_id}</td>
            <td>{dish_name}</td>
            <td>{description} </td>
            <td>{price} </td>
            <td>{foto_url} </td>
            <td><button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => deleteDish(id, e)} className="btn btn-dark mx-2">Delete</button>
                <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => {editMenuDish(id, e)}} className="btn btn-dark">Edit</button>
                </td>
        </tr>
     );
}
 
export default Dish;