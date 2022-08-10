import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Dishes = ({dishes, setDishes}) => {
   
    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);
    
    const [editMode, setEditMode] = useState(false);
    const [menus, setMenus] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentDish, setCurrentDish] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [hideDishes, setHideDishes] = useState(false);
    

    // const [token, _] = useState(localStorage.getItem("token"));
    // const nav = useNavigate();
    let h = { 'Accept': 'application/json'}; 


    useEffect(() => {
        // if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes", )
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
                    console.log(result)
                    setDishes(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender, showHide])
    useEffect(() => {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu", { method: 'GET'})
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
                    // console.log(result);
                    setMenus(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])

    function deleteDish(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const remaining = dishes.filter(d => id !== d.id)
                    setDishes(remaining)
                }
            });
    }

    const handleSubmit = event => {
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
            }
        })
            .catch(error => {
                console.log(error)
            })
    }
    const handleUpdateSubmit = event => {
        event.preventDefault();

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + currentDish.id, {
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

            }
        })
            .catch(error => {
                console.log(error)
            })

    }


    function functionEditBtn(id, e) {
        if (editMode === false) {
            setEditMode(true);
            setErrorMsg(null);
            setShowHide(false);

            fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/" + id, { method: 'GET', headers: h })
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
                        setCurrentDish(result); setIsLoaded(true); setReRender(false);

                    },
                    (error) => { setError(error); setIsLoaded(true); });
        }
        else setEditMode(false);
        // console.log('>>>>editw')
    }

    function functionShowHide() {
        if (showHide === false) {
            setShowHide(true);
            // console.log('>>>>show')
        }
        else if (showHide === true) {
            setShowHide(false);
            // console.log('>>>>Hide')
        }
    }


    if (!isLoaded) {
        return <div>Loading...<Loader /></div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (<>
           

            <div style={hideDishes === false ? { display: 'block' } : { display: 'none' }} className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>Dish</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map(dish => (
                            <tr key={dish.id}>
                                <td>{dish.menu.menu_title}</td>
                                <td>{dish.dish_name}</td>
                                <td>{dish.description}</td>
                                <td>{dish.price} &euro;</td>
                                <td><img style={{ width: '200px' }} className="photo" src={dish.foto_url}  alt="dish_foto"></img></td>
                               
                                <td>
                                    <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} onClick={(e) => deleteDish(dish.id, e)} className="btn btn-dark">Delete</button>
                                    <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} onClick={(e) => functionEditBtn(dish.id, e)} className="btn btn-dark">Edit</button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
                <div className='text-danger'>{errorMsg}</div>

                <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Update Dish details:</div>
                                <div className="card-body"></div>

                                <form onSubmit={handleUpdateSubmit}>

                                    <div className="form-group">
                                        <label>Menu Title: </label>
                                        <select name="menu_id" id="" className="form-control">

                                            {menus.map(menu => (((currentDish.menu_id) === (menu.id))
                                                ? <option key={menu.id} value={currentDish.menu_id} selected>{menu.menu_title}</option>
                                                : <option key={menu.id} value={menu.id}>{menu.menu_title}</option>)
                                            )}
                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label>Dish Title: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.dish_name || ""} key={currentDish.dish_name}
                                            name="dish_name"
                                            className="form-control"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <label>Dish description: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.description || ""} key={currentDish.description}
                                            name="description"
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Dish price: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.price || ""} key={currentDish.price}
                                            name="price"
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Image: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.foto_url || ""} key={currentDish.foto_url}
                                            name="foto_url"
                                            className="form-control"
                                        />

                                    </div>

                                    <button onClick={(e) => setEditMode(false) && setCurrentDish([])} type="submit" className="btn btn-dark">Update</button>
                                </form>
                                <button onClick={(e) => setEditMode(false)} className="btn btn-dark">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Dish' : 'Hide'}  </button>
                <div style={showHide === true ? { display: 'block' } : { display: 'none' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Create a Dish:</div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label>Menu Title: </label>


                                            <select name="menu_id" id="" className="form-control">
                                                <option value="" disabled>Select Menu</option>
                                                {menus.map(menu => (
                                                    <option key={menu.id} value={menu.id}>{menu.menu_title}</option>)
                                                )}
                                            </select>
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
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>)
  
                                                }
}
 
export default Dishes;