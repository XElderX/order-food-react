import React from 'react';

const CreateRestourant = ({showHide, h, setShowHide, setReRender, reRender}) => {
    const handleSubmit = event => {
        event.preventDefault();
    

        fetch("https://examorderfoodapp.herokuapp.com/api/v1/restourants", {
            method: 'POST', 
            headers: h,
            
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
    return ( 

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



     );
}
 
export default CreateRestourant;




