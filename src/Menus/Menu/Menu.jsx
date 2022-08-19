import React, { useState } from 'react';
import CreateMenu from './CreateMenu';
import UpdateMenu from './UpdateMenu';

const Menu = ({ notification, setNotification, setShow, show, functionShowHide, menus, setMenus, editMode, setEditMode, showHide, setShowHide, showAllDishes, setError, setIsLoaded, setReRender, currentMenu, setCurrentMenu }) => {
    const [restourants, setRestourants] = useState([]);


    function deleteMenu(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/menu/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const remaining = menus.filter(d => id !== d.id)
                    setMenus(remaining)
                    setShow(true);
                    setNotification({text:'Menu was removed', status:'success'})
                }
            });
    }

    function functionEditBtn(id, e) {
        if (editMode === false) {
            setEditMode(true);
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
    return (
        <>
         <div style={show ? {display:'block', margin:'0.5rem 1rem' } : {display:'none'}} className={'alert alert-' + notification.status}><span>{notification.text}</span></div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Restourant</th>
                        <th>Menu Title</th>
                        <th style={editMode === false && showHide !== true ? { display: 'block' } : { display: 'none' }}>Dishes</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map(menu => (
                        <tr key={menu.id}>
                            <td>{menu.restourant.title}</td>
                            <td>{menu.menu_title}</td>
                            <td><button style={editMode === false && showHide !== true ? { display: 'block' } : { display: 'none' }} onClick={(e) => showAllDishes(menu.id, e)} className="btn btn-dark">View dishes of menu</button></td>
                            <td><button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1
                                ? { display: 'block' } : { display: 'none' }} onClick={(e) => deleteMenu(menu.id, e)} className="btn btn-dark">Delete</button>
                                <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1
                                    ? { display: 'block' } : { display: 'none' }} onClick={(e) => functionEditBtn(menu.id, e)} className="btn btn-dark">Edit</button></td>
                        </tr>)
                    )}
                </tbody>
            </table>
            <UpdateMenu
                editMode={editMode}
                setEditMode={setEditMode}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
                restourants={restourants}
                setRestourants={setRestourants}
                setReRender={setReRender}
                setIsLoaded={setIsLoaded}
                setNotification={setNotification}
                setShow={setShow}

            />

            <button style={editMode === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Menu' : 'Hide'}  </button>

            <CreateMenu
                restourants={restourants}
                showHide={showHide}
                currentMenu={currentMenu}
                setShowHide={setShowHide}
                setReRender={setReRender}
                setNotification={setNotification}
                setShow={setShow}
            />

        </>

    );
}

export default Menu;