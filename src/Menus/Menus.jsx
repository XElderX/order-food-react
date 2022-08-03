import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dish from "./Dish";

const Menus = () => {

    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [menus, setMenus] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [restourants, setRestourants] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentMenu, setCurrentMenu] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [hideDishes, setHideDishes] = useState(false);
    const [menuDishes, setMenuDishes] = useState([]);
    const [menuId, setMenuId] = useState('');
    const [currentMenuDish, setCurrentMenuDish] = useState([]);

    const [token, _] = useState(localStorage.getItem("token"));
    const nav = useNavigate();
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };


    useEffect(() => {
        if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu",)
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
                    setMenus(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender])

    useEffect(() => {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants", { method: 'GET' })
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
                    setRestourants(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])


    function deleteMenu(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const remaining = menus.filter(d => id !== d.id)
                    setMenus(remaining)
                }
            });
    }

    const handleSubmit = event => {
        event.preventDefault();

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "restourant_id": event.target.restourant_id.value,
                    "menu_title": event.target.menu_title.value

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
        console.log(event.target.restourant_id.value);
        event.preventDefault();

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu/" + currentMenu.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json ', "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "menu_title": event.target.menu_title.value,
                    "restourant_id": event.target.restourant_id.value

                }
            )
        }).then(response => {
            console.log(response)

            if (response.status === 200) {
                setEditMode(false)
                setReRender(!reRender);

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

            fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu/" + id, { method: 'GET' })
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
                        setCurrentMenu(result); setIsLoaded(true); setReRender(false);

                    },
                    (error) => { setError(error); setIsLoaded(true); });
        }
        else setEditMode(false);
        // console.log('>>>>editw')
    }
    function showAllDishes(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/menu/" + id, { method: 'GET', headers: h })
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
                    setMenuDishes(result);
                    setMenuId(id);
                    setHideDishes(true);

                }
            )
    }
    function editMenuDish(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes/menu/" + id, { method: 'GET', headers: h })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setCurrentMenuDish(result); setIsLoaded(true); setEditMode(true);

                },
                (error) => { setError(error); setIsLoaded(true); });
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
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (<>
            <div style={hideDishes === true ? { display: 'block' } : { display: 'none' }} className='container'>
                <button className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Review' : 'Hide'}  </button>
            </div>

            <h3>Restourants</h3>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>Dish title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuDishes?.length > 0 ? (menuDishes.map(dish => (
                            <Dish key={dish.id}
                                id={dish.id}
                                menu_id={dish.menu_id}
                                dish_name={dish.dish_name}
                                description={dish.description}
                                price={dish.price}
                                foto_url={dish.foto_url}
                                error={error}
                                setError={setError}
                                menuDishes={menuDishes}
                                setMenuDishes={setMenuDishes}
                                editMenuDish={editMenuDish}
                                editMode={editMode}
                                showHide={showHide}


                            />

                        ))
                        ) : (
                            <tr> <td>This menu haven't had any dishes yet </td></tr>
                        )}
                    </tbody>
                </table>

                <button onClick={(e) => setHideDishes(false)} className="btn btn-dark">Go back</button>
            </div>


            <div style={hideDishes === false ? { display: 'block' } : { display: 'none' }} className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Restourant</th>
                            <th>Menu Title</th>
                            <th>Dishes </th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map(menu => (
                            <tr key={menu.id}>
                                <td>{menu.restourant.title}</td>
                                <td>{menu.menu_title}</td>
                                <td>
                                    <button onClick={(e) => showAllDishes(menu.id, e)} className="btn btn-dark">View dishes of menu</button>

                                </td>
                                <td>
                                    <button style={editMode === false && showHide === false
                                        // && JSON.parse(localStorage.getItem("admin")) === 1 
                                        ? { display: 'block' } : { display: 'none' }} onClick={(e) => deleteMenu(menu.id, e)} className="btn btn-dark">Delete</button>
                                    <button style={editMode === false && showHide === false
                                        // && JSON.parse(localStorage.getItem("admin")) === 1 
                                        ? { display: 'block' } : { display: 'none' }} onClick={(e) => functionEditBtn(menu.id, e)} className="btn btn-dark">Edit</button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>


                <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Update Dish details:</div>
                                <div className="card-body"></div>

                                <form onSubmit={handleUpdateSubmit}>

                                    <div className="form-group">
                                        <label>Restourant Title: </label>
                                        <select name="restourant_id" id="" className="form-control">

                                            {restourants.map(restourant => (((currentMenu.restourant_id) === (restourant.id))
                                                ? <option key={restourant.id} value={currentMenu.restourant_id} selected>{restourant.title}</option>
                                                : <option key={restourant.id} value={restourant.id}>{restourant.title}</option>)
                                            )}
                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label>Menu Title: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentMenu.menu_title || ""} key={currentMenu.menu_title}
                                            name="menu_title"
                                            className="form-control"
                                        />


                                    </div>


                                    <button onClick={(e) => setEditMode(false) && setCurrentMenu([])} type="submit" className="btn btn-dark">Update</button>
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
                                            <label>Restourant Title: </label>


                                            <select name="restourant_id" id="" className="form-control">
                                                <option value="" disabled>Select Restourant</option>
                                                {restourants.map(restourant => (((currentMenu.restourant_id) === (restourant.id))
                                                    ? <option key={restourant.id} value={currentMenu.restourant_id} selected>{restourant.title}</option>
                                                    : <option key={restourant.id} value={restourant.id}>{restourant.title}</option>)
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Menu title: </label>
                                            <input type="text"
                                                name="menu_title"
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
        </>
        );
    }

}

export default Menus;