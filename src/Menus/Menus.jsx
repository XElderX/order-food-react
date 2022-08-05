import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dish from "./MenuDishes/Dish";
import Menu from "./Menu/Menu";
import CreateMenuDish from "./MenuDishes/CreateMenuDish";
import EditMenuDish from "./MenuDishes/EditMenuDish";

const Menus = () => {

    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [menus, setMenus] = useState([]);
    const [editMode, setEditMode] = useState(false);
    
    const [showHide, setShowHide] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentMenu, setCurrentMenu] = useState([]);
    
    const [hideDishes, setHideDishes] = useState(false);
    const [menuDishes, setMenuDishes] = useState([]);
    const [menuId, setMenuId] = useState('');
    const [currentMenuDish, setCurrentMenuDish] = useState("");
    const [sort, setSort] = useState(null);


    const [defaultMenuDishes, setDefaultMenuDishes] = useState([]);

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

    


    function priceFilter(vals) {
        if(sort === null){
            setSort(true)
            vals?.sort(function(a, b){return a.price - b.price})
               
                // console.log('sort1')
                setMenuDishes(vals)
        }else if (sort === true){
            setSort(false)
            vals?.sort(function(a, b){return (a.price - b.price)*-1})
                // console.log('sort 2')
                setMenuDishes(vals)
        }
        else{
            setSort(null);
            // console.log('sort3')
            showAllDishes(menuId)
            
            
        }
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
                    
                    console.log(result);
                    setMenuDishes(result);
                    setDefaultMenuDishes(result)
                    setMenuId(id);
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
            <div style={hideDishes === true ? { display: 'block' } : { display: 'none' }} className='container'>
               
            

            <h3>Dishes</h3>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>Dish title</th>
                            <th>Description</th>
                            <th style={{display:'flex', flexDirection:'column', alignItems: 'center'}}><span>Price</span><button onClick={(e) =>  priceFilter(menuDishes) }>
                                {(sort===null) ? <span> Sort &darr;</span> : (sort===true) ?  <span> Sort &uarr;</span> : <span> Default &harr;</span>}</button></th>
                            <th>Foto</th>
                            <th style={editMode === false && showHide!==true ? { display: 'block' } : { display: 'none' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuDishes?.length > 0 ? (menuDishes.map(dish => (
                            <Dish key={dish.id}
                                id={dish.id}
                                menu_title={dish.menu.menu_title}
                                dish_name={dish.dish_name}
                                description={dish.description}
                                price={dish.price}
                                foto_url={dish.foto_url}
                                error={error}
                                setError={setError}
                                menuDishes={menuDishes}
                                setMenuDishes={setMenuDishes}
                                editMode={editMode}
                                showHide={showHide}
                                setCurrentMenuDish={setCurrentMenuDish}
                                setIsLoaded={setIsLoaded}
                                setEditMode={setEditMode}
                            />

                        ))
                        ) : (
                            <tr><td>This menu haven't had any dishes yet </td></tr>
                        )}
                    </tbody>
                </table>

                <div className="row justify-content-center">

                <button style={editMode === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block', maxWidth: '20%' } : { display: 'none' }} className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false  ? 'Add new Dish' : 'Hide'}  </button>
                
                
                
                
                <CreateMenuDish 
                showHide={showHide}
                menu_id={menuId}
                setShowHide={setShowHide}
                setReRender={setReRender}
                h={h}
                reRender={reRender}
                setError={setError} 
                setIsLoaded={setIsLoaded}
                setMenuDishes={setMenuDishes}
                setSort={setSort}
                editMode={editMode}
                
                />


                </div>


               
                <EditMenuDish
                editMode={editMode}
                menu_id={menuId}
                setEditMode={setEditMode}
                setReRender={setReRender}
                h={h}
                reRender={reRender}
                setError={setError} 
                setIsLoaded={setIsLoaded}
                setMenuDishes={setMenuDishes}
                setSort={setSort}
                currentMenuDish={currentMenuDish}
                
                
                />

                <button style={showHide === false ? {display: 'inline'} : {display: 'none'}} onClick={(e) => setHideDishes(false)} className="btn btn-dark">Go back</button>
            </div>
            </div>


            <div style={hideDishes === false ? { display: 'block' } : { display: 'none' }} className="container">
                <Menu 
                menus={menus}
                setMenus={setMenus}
                editMode={editMode}
                setEditMode={setEditMode}
                showHide={showHide}
                setShowHide={setShowHide}
                showAllDishes={showAllDishes}
                setError={setError}
                setIsLoaded={setIsLoaded}
                setReRender={setReRender}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
                reRender={reRender}
                token={token}
                functionShowHide={functionShowHide}
                />



            </div>
        </>
        );
    }

}

export default Menus;