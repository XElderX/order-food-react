import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Restourant from "./Restourant";
import CreateRestourant from "./CreateRestourant";
import UpdateRestourant from "./UpdateRestourant";


const Restourants = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restourants, setRestourants] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentRestourant, setCurrentRestourant] = useState([]);
    const [token, _] = useState(localStorage.getItem("token"));
    const nav = useNavigate();
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };

    useEffect(() => {
        if (!token) return nav("/login");

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants", { headers: h })
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
    function show() {
        (showHide === false)
            ? setShowHide(true)
            // console.log('>>>>show')
            : setShowHide(false)
        // console.log('>>>>Hide')
    }

    function editRestourant(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants/" + id, { method: 'GET', headers: h })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setCurrentRestourant(result); setIsLoaded(true); setEditMode(true);

                },
                (error) => { setError(error); setIsLoaded(true); });
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else {

        return (<>
            <h3>Restourants</h3>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Restourant Title</th>
                            <th>Code</th>
                            <th>Address</th>
                            <th style={editMode === false && showHide!==true ? { display: 'block' } : { display: 'none' }}>Actions</th>
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
                <button style={editMode === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} className="btn btn-primary" onClick={(e) => show(e)}> {showHide === false ? 'Add new Restourant' : 'Hide'}  </button>

                <CreateRestourant
                    showHide={showHide}
                    h={h}
                    setShowHide={setShowHide}
                    setReRender={setReRender}
                    reRender={reRender}
                />
            </div>

            <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
                <UpdateRestourant
                    showHide={showHide}
                    h={h}
                    setShowHide={setShowHide}
                    setReRender={setReRender}
                    reRender={reRender}
                    currentRestourant={currentRestourant}
                    setEditMode={setEditMode}
                    token={token}

                />

            </div>
        </>);
    }
}

export default Restourants;