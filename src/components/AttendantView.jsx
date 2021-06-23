import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, store } from "../firebaseConfig";

class menu {
  constructor(name, desc, price, veg) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.veg = veg;
  }
}

function AttendantView() { 
  const [createOrder, setCreateOrder] = useState({});
  const [availableMenus, setAvailableMenus] = useState([]);
  const [orderList, setOrderList] = useState([]);

  //del form
  const [orderName, setOrderName] = useState("");
  const [orderDetail, setOrderDetail] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [orderMenus, setOrderMenus] = useState([])

  

const checkVeg = (isVeg)=>{
  if(isVeg == true){
    return(<p>VEG</p>)
  } 
  }
  
  useEffect( ()=> {
    //obtenemos menues disponibles
    const getMenus = async () => {
      const {docs} = await store.collection('menus').get();
      const updatedMenuList = docs.map( item=> ({id:item.id, ...item.data()}));
      setAvailableMenus(updatedMenuList);
    }
    getMenus();

  },[])
  console.log(availableMenus);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">INICIO</li>
        </ul>
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item ms-auto ms-auto">CERRAR SESIÓN</li>
        </ul>
      </nav>
      <div className="row">
        <div className="col">
          <h2>PEDIDOS REALIZADOS</h2>
        </div>
        <div className="col">
          <h2>PEDIDO ACTUAL</h2>
          <form className="form-group">
            <div className="mb-1">
              <label className="form-label">Cliente</label>
              <input
                className="form-control"
                placeholder="cliente que realiza el pedido"
                type="text"
                value={orderName}
                onChange={(event) => {
                  setOrderName(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hora</label>
              <input
                className="form-control"
                placeholder="hora aproximada de entrega"
                type="text"
                value={orderTime}
                onChange={(event) => {
                  setOrderTime(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Aclaraciones</label>
              <input
                className="form-control"
                placeholder="detalles del pedido"
                type="text"
                value={orderDetail}
                onChange={(event) => {
                  setOrderDetail(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Menú</label>
            </div>
          </form>
        </div>

        <div className="col">
          <h2>MENUES DISPONIBLES</h2>
          <ul className="list-group list-group-flush">
            {availableMenus !== [] ? (
              availableMenus.map((item) => (
                <li key={item.id} className="list-group-item">
                  <div>{item.name}</div>
                  <div>{item.detail}</div>
                  <div>{item.price}</div>
                  <div>{checkVeg(item.vegetarian)}</div>
                </li>
              ))
            ) : (
              <p>Sin menues disponibles</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AttendantView;
