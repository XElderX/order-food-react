import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const Register = ({setNotification, notification, setShow, show}) => {
    
    const nav = useNavigate();


    const handleSubmit = event => {
        event.preventDefault();

        fetch('https://examorderfoodapp.herokuapp.com/api/v1/register',
            {
                method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "name": event.target.name.value,
                        "email": event.target.email.value,
                        "password": event.target.password.value,
                    }

                )
            }).then(response => {
                console.log(response);

                if (response.status === 200) {
                    console.log('ok');
                    return nav("/login");


                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (<div >
        <div className={styles.headline}><h5>New User? Please register</h5></div>

        <div className={styles.register}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        name="email"
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password"
                        className="form-control"
                        name="password"
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>


    </div>
    );

}

export default Register;
