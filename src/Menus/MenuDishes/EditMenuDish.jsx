import React, { useEffect, useState } from 'react';



const EditMenuDish = ({ editMode, reRender, setError, setIsLoaded, currentMenuDish, setMenuDishes, menu_id, setEditMode, setReRender, h}) => {
   
    const [reload, setReload] = useState(false);

    // const [dishData, setDishData] = useState({
    //     "menu_id": "",
    //     "dish_name": "",
    //     "description": "",
    //     "price": "",
    //     "foto_url": "",
    // })

    // const handleChange =(e)=>{
    //     setDishData(prev=>({...prev, [e.target.name]:e.target.value}))
    // }
    
    useEffect(() => {

        if (reload===true) {
            fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/menu/" + menu_id, { method: 'GET', headers: h })
                .then(res => {
                    if (!res.ok) {
                        console.log(res);
                        setError(res);
                        setIsLoaded(true);
                    } else {
                        return res.json()
                    }
                }).then(
                    (result) => {
                        console.log(result);
                        setMenuDishes(result);
                        setReload(false)
                        setEditMode(false)
    
                    },
                    (error) => { setError(error); setIsLoaded(true); })

        }
        
    }, [reload]);
    
   
    const updateMenuDish = event => {
        
        event.preventDefault();
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + currentMenuDish.id, {
            method: 'PUT',
            headers: {
        
                'Content-Type': 'application/json'
            },
           
            body: JSON.stringify(
                {
                    "menu_id": event.target.menu_id.value,
                    "dish_name": event.target.dish_name.value,
                    "description": event.target.description.value,
                    "price": event.target.price.value,
                    "foto_url": event.target.foto_url.value
                    
                }
            )
        }).then(response => {
            console.log(response)

            if (response.status === 200) {
                setReRender(true);
                setReload(true)

            }
        })
            .catch(error => {
                console.log(error)
            })
    }
    return ( 
        <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>

<div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Update a Dish:</div>
                                <div className="card-body">

                                    <form onSubmit={updateMenuDish}>

                                        <div className="form-group">
                                           
                                            <input type="hidden"
                                            // onChange={handleChange}
                                            defaultValue={currentMenuDish.menu_id || ""} key={currentMenuDish.menu_id}
                                            name="menu_id"
                                            className="form-control"/>
                                        </div>


                                        <div className="form-group">
                                            <label>Dish Name: </label>
                                            <input type="text"
                                                name="dish_name"
                                                defaultValue={currentMenuDish.dish_name || ""} key={currentMenuDish.dish_name}
                                                // onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Dish description: </label>
                                            <input type="text"
                                                name="description"
                                                defaultValue={currentMenuDish.description || ""} key={currentMenuDish.description}
                                                // onChange={handleChange}
                                                className="form-control"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Price: </label>
                                            <input type="text"
                                                name="price"
                                                defaultValue={currentMenuDish.price || ""} key={currentMenuDish.price}
                                                // onChange={handleChange}
                                                className="form-control"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Image: </label>
                                            <input type="text"
                                                name="foto_url"
                                                defaultValue={currentMenuDish.foto_url || ""} key={currentMenuDish.foto_url}
                                                // onChange={handleChange}
                                                className="form-control"
                                            />

                                        </div>
                                        <button type="submit"
                                            className="btn btn-primary">Submit</button>
                                    </form>
                                    <button onClick={(e) => setEditMode(false)} className="btn btn-dark">Cancel</button>
                                </div>
                            </div>
                        </div>


                    </div>
       




    </div>
     );
}
 
export default EditMenuDish;