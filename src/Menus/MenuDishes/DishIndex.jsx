import React, { useState } from 'react';
const DishIndex = ({ setShow, setNotification, id, menu_title, dish_name, description, price, foto_url, error, setError, menuDishes, setMenuDishes, editMode, showHide, setCurrentMenuDish, setIsLoaded, setEditMode, addIntoCart }) => {
    const [token, _] = useState(localStorage.getItem("token"));



    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };
    function editMenuDish(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + id, { method: 'GET', headers: h })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('>>', result);
                    setCurrentMenuDish(result); setIsLoaded(true); setEditMode(true);

                },
                (error) => { setError(error); setIsLoaded(true); });
    }

    function deleteDish(id, e) {

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const remaining = menuDishes.filter(md => id !== md.id)
                    setMenuDishes(remaining)
                    setError(null);
                    setShow(true);
                    setNotification({text:'Dish was removed', status:'success'})
                    
                }
            });
    }

    return (

        <tr>
            <td>{menu_title}</td>
            <td>{dish_name}</td>
            <td>{description} </td>
            <td>{price} &euro; </td>
            <td><img style={{ width: '200px' }} className="photo" src={foto_url} alt="dish_foto"></img></td>
            <td><button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => deleteDish(id, e)} className="btn btn-dark mx-2">Delete</button>
                <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'inline' } : { display: 'none' }} onClick={(e) => { editMenuDish(id, e) }} className="btn btn-dark">Edit</button>
                <button style={editMode === false && showHide === false ? { display: 'inline' } : { display: 'none' }} onClick={(e) => { addIntoCart(id, e) }} className="btn btn-dark">Order</button>
            </td>
        </tr>
    );
}

export default DishIndex;