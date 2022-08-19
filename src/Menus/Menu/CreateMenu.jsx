

const CreateMenu = ({ setNotification, setShow, restourants, showHide, currentMenu, setShowHide, setReRender }) => {

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
                setShow(true);
                setNotification({text:'Menu ' + event.target.menu_title.value + 'was created successfully', status:'success'})
                event.target.reset();
            }
        })
            .catch(error => {
                console.log(error)
            })
    }

    return (

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
                            <button onClick={(e) => setShowHide(false)} className="btn btn-dark">Cancel</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CreateMenu;