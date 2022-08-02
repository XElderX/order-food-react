import { useEffect, useState } from "react";

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
    const [reviews, setReviews] = useState([]);
    const [reviewId, setReviewId] = useState('');
    const [token, _] = useState(localStorage.getItem("token"));
    {/* const nav = useNavigate();
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` }; */}


    useEffect(() => {
        // if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu", )
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
    }, [reRender, showHide])

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
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu/" + id, { method: 'DELETE'})
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
    
                'Content-Type': 'application/json'
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

    const reviewHandleSubmit = event => {

        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/v1/reviews/", {
            method: 'POST',
            // headers: h,
            body: JSON.stringify(
                {
                    "dish_id": event.target.dish_id.value,
                    "author": event.target.author.value,
                    "rate": event.target.rate.value,
                    "comment": event.target.comment.value
                }
            )
        }).then(response => {

            console.log(response)

            if (response.status === 201) {
                setShowHide(false);
                setReRender(true);
                setHideDishes(false);
                setNewReview(!newReview)
               
            }
        })
            .catch(error => {
                console.log(error)
            })
    }


 

    function showReviews(id, e) {
        fetch("http://127.0.0.1:8000/api/v1/reviews/all/" + id, { method: 'GET'})
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
                    setReviews(result);
                    setReviewId(id);
                    setHideDishes(true);

                }
            )
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (<>
            {/* <div style={hideDishes === true ? { display: 'block' } : { display: 'none' }} className='container'>
                <button className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Review' : 'Hide'}  </button>

                <div>
                    <div style={showHide === true ? { display: 'block' } : { display: 'none' }}>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">A New Review:</div>
                                    <div className="card-body">
                                        <form onSubmit={reviewHandleSubmit}>
                                            <div className="form-group">

                                                <input
                                                    type="hidden"
                                                    name="dish_id"
                                                    value={reviewId}

                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Review author: <b>{localStorage.getItem("username")}</b> </label>
                                                <input type="hidden"
                                                    value={localStorage.getItem("username")}
                                                    name="author"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Rating: </label>
                                                <select name="rate" id="rate" className="form-control" >
                                                    <option value="">--How do you liked it?--</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Comment : </label>
                                                <input type="text"
                                                    name="comment"
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
                {reviews?.length > 0 ? (reviews.map(review => (
                    <div className={styles.reviewItemContainer} key={review.id}>
                        <div className={styles.reviewItem}><b>Review of :</b> <u>{review.dish.dish_name}</u></div>
                        <div className={styles.reviewItem}><b>Reviewed by:</b> {review.author}</div>
                        <div className={styles.reviewItem}><b>Commented:</b> {review.comment}</div>
                        <div className={styles.reviewItem}><b>Rated as:</b> {review.rate} of 10</div>
                        <div className={styles.reviewItem}><b>Posted at:</b> {review.created_at.replace('T', " ",).slice(0, 16)}</div>
                        <div style={((localStorage.getItem("username") === (review.author)) || (JSON.parse(localStorage.getItem("admin"))) === 1) ? { display: 'block' } : { display: 'none' }} className={styles.reviewItem}> <button onClick={(e) => deleteReview(review.id, e)} className="btn btn-dark">Delete</button></div>

                        <br></br>
                    </div>
                ))
                ) : (
                    <div className={styles.dishes}> This dish haven't had any reviews yet </div>
                )}

                <button onClick={(e) => setHideDishes(false)} className="btn btn-dark">Go back</button>
            </div> */}

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
                                    

                                    {/* <button onClick={(e) => showDishes(dish.id, e)} className="btn btn-dark">View dishes of menu</button> */}

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
                <div className='text-danger'>{errorMsg}</div>

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

                <button  className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Dish' : 'Hide'}  </button>
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