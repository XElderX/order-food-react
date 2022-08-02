import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Restourant from "./Restourant";

const Restourants = () => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restourants, setRestourants] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentRestourant, setCurrentRestourant] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    // const [token, _] = useState(localStorage.getItem("token"));
    // const nav = useNavigate();
    // let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };

    useEffect(() => {
        // if (!token) return nav("/login");

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants", )
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

                    // console.log(typeof (JSON.parse(localStorage.getItem("admin"))));
                    setRestourants(result);
                    setIsLoaded(true);
                    setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender])
    function show () {
        (showHide === false)
        ? setShowHide(true) 
        // console.log('>>>>show')
        : setShowHide(false) 
    // console.log('>>>>Hide')
    }

    function editRestourant (id, e){
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants/" + id, { method: 'GET'})
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setCurrentRestourant(result); setIsLoaded(true); setEditMode(true);

            },
            (error) => { setError(error); setIsLoaded(true); });
}


    const handleUpdateSubmit = event => {
        event.preventDefault();
    

        console.log(event.target.title.value);
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants/" + currentRestourant.id, {
            method: 'PUT',
            headers: {
    
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "title": event.target.title.value,
                    "code": event.target.code.value,
                    "address": event.target.address.value
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
    const handleSubmit = event => {
        event.preventDefault();
    

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants", {
            method: 'POST', 
            
            body: JSON.stringify(
                {
                    "title": event.target.title.value,
                    "code": event.target.code.value,
                    "address": event.target.address.value
                }
            )

        }).then(response => {

            if (response.status === 201) {
                setShowHide(false);
                setReRender(!reRender);
                
            }
        })
            .catch(error => {
                console.log(error)
            })
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else {


    return ( <>
     <h3>Restourants</h3>
    <div className='container'>
        <table className='table'>
        <thead>
            <tr>
                <th>Restourant Title</th>
                <th>Code</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
        {restourants?.length > 0 ? (restourants.map((restourant =>
        <Restourant key={restourant.id}
        id={restourant.id}
        title={restourant.title}
        code={restourant.code}
        address={restourant.address}
        error={error}
        setError={setError}
        restourants={restourants}
        setRestourants={setRestourants}
        editRestourant={editRestourant}
        editMode={editMode}
        showHide={showHide}

        />
        ))
        ) : (
            <tr>
                <td>Please wait a moment while we gather information </td> <td><Loader /></td> <td></td> <td></td>
               
            </tr>
        )
        }
        </tbody>
        </table>
        <button style={editMode === false ? { display: 'block' } : { display: 'none' }} className="btn btn-primary" onClick={(e) => show(e)}> {showHide === false ? 'Add new country' : 'Hide'}  </button>

                <div style={showHide === true ? { display: 'flex' } : { display: 'none' }} className="align-items-center justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">Add a new Restourant:</div>
                            <div className="card-body">



                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label>Restourant Title: </label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Restourant Code</label>
                                        <input
                                            type="text"
                                            name="code"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address </label>
                                        <input
                                            type="text"
                                            name="address"
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

    <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-header">Update Country details:</div>
   
                                <form onSubmit={handleUpdateSubmit}>

                                    <div className="form-group mx-5">

                                        <label>Country Title: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.title || ""} key={currentRestourant.title}
                                            name="title"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group mx-5">
                                        <label>Code: </label>
                                        <input 
                                            type="text"
                                            defaultValue={currentRestourant.code || ""} key={currentRestourant.code}
                                            name="code"
                                            className="form-control "
                                        />
                                    </div>
                                    <div className="form-group mx-5">
                                        <label>Country flag: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.address|| ""} key={currentRestourant.address}
                                            name="address"
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-dark my-2">Update</button>
                                </form>
                                <button onClick={(e) => {setEditMode(false)}} className="btn btn-dark mx-5 my-2">Cancel</button>
                            </div>
                        </div>
                    </div>
    </div>
    </>);
}
}
 
export default Restourants;