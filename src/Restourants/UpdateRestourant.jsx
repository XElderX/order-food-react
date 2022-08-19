import React from 'react';

const UpdateRestourant = ({ setShow, setNotification, setReRender, reRender, currentRestourant, setEditMode, token }) => {
    const handleUpdateSubmit = event => {
        event.preventDefault();


        console.log(event.target.title.value);
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants/" + currentRestourant.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json ', "Authorization": `Bearer ${token}`
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
                 setShow(true);
                setNotification({text:'Restourant' + event.target.title.value + ' was updated successfully', status:'success'})

            }
        })
            .catch(error => {
                console.log(error)
                setShow(true);
                setNotification({text:'Restourant' + event.target.title.value + ' wasn\t updated due some error', status:'danger'})
            })

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">Update Restourant details:</div>

                    <form onSubmit={handleUpdateSubmit}>

                        <div className="form-group mx-5">

                            <label>Restourant: </label>
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
                            <label>Restourant address: </label>
                            <input
                                type="text"
                                defaultValue={currentRestourant.address || ""} key={currentRestourant.address}
                                name="address"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-dark my-2">Update</button>
                    </form>
                    <button onClick={(e) => { setEditMode(false) }} className="btn btn-dark mx-5 my-2">Cancel</button>
                </div>
            </div>
        </div>


    );
}

export default UpdateRestourant;




