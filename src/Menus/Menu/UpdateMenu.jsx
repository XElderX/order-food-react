import React, { useEffect, useState } from 'react';


const UpdateMenu = ({restourants, setRestourants, setError, setIsLoaded, editMode, setEditMode, currentMenu, setCurrentMenu, setReRender, reRender, token}) => {
    

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
    return ( <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">Update Menu details:</div>
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
</div> );
}
 
export default UpdateMenu;