import React, { useEffect, useState } from 'react';

const CreateMenuDish = ({ showHide, reRender, editMode, setError, setIsLoaded, setMenuDishes, menu_id, setShowHide, setReRender, h}) => {
    const [reload, setReload] = useState(false);
    
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
    
                    },
                    (error) => { setError(error); setIsLoaded(true); })

        }
        
    }, [reload]);
    
   
    const assignNewDish = event => {
        event.preventDefault();
        console.log(event.target.menu_id.value)
        console.log(event.target.dish_name.value)
        console.log(event.target.description.value)
        console.log(event.target.price.value)
        console.log(event.target.foto_url.value)
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes", {
            method: 'POST',
            headers: h,
       
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

            if (response.status === 201) {
                setShowHide(false);
                setReRender(true);
                setReload(true);
                
               
            }
        })
            .catch(error => {
                console.log(error)
            })
    }
    return ( 
        <div style={showHide === true && editMode === false ? { display: 'block' } : { display: 'none' }}>


                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Create a Dish:</div>
                                <div className="card-body">

                                    <form onSubmit={assignNewDish}>

                                        <div className="form-group">
                                            <label>Menu Title: </label>

                                           
                                            <input type="hidden"
                                            value={menu_id}
                                                name="menu_id"
                                                className="form-control"
                                            />
                                        </div>

                                       

                                        <div className="form-group">
                                            <label>Dish Name: </label>
                                            <input type="text"
                                                name="dish_name"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Dish description: </label>
                                            <input type="text"
                                                name="description"
                                                className="form-control"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Price: </label>
                                            <input type="text"
                                                name="price"
                                                className="form-control"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Image: </label>
                                            <input type="text"
                                                name="foto_url"
                                                className="form-control"
                                            />

                                        </div>
                                        <button type="submit"
                                            className="btn btn-primary">Submit</button>
                                    </form>
                                    <button onClick={(e) => setShowHide(false)} className="btn btn-dark">Cancel</button>
                                </div>
                            </div>
                        </div>


                    
       




    </div>
     );
}
 
export default CreateMenuDish;