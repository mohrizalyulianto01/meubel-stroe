
import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";
import axios from "axios"
const Dashboard = () => {
  const [productLength, setProductLength] = useState(0)

  const APIUrl = "http://localhost:5000"

  useEffect(() => {
    const getLength = async () => {
      try {
        const productLength = await axios.get(APIUrl + "/api/v1/product")
        setProductLength(productLength.data.length)

      } catch (err) {
        console.log(err.res.data.message)
      }
    }

    getLength()
  },[])
  
  return (
    <div className="container fm-2">
      <div className="main-title d-flex justify-content-between mb-3">
        <h3>Dashboard</h3>
      </div>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 g-2">
        <div className="col">
          <div className="card bg-primary text-white">
            <div className="card-inner d-flex justify-content-between align-items-center p-3">
              <h3>PRODUCTS</h3>
              <i className="ri-box-3-line card_icon"></i>
            </div>
            <h1 className="p-3">{productLength}0</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-warning text-white">
            <div className="card-inner d-flex justify-content-between align-items-center p-3">
              <h3>CATEGORIES</h3>
              <i className="ri-folders-line card_icon"></i>
            </div>
            <h1 className="p-3">{0}</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-success text-white">
            <div className="card-inner d-flex justify-content-between align-items-center p-3">
              <h3>CUSTOMERS</h3>
              <i className="ri-group-3-line card_icon"></i>
            </div>
            <h1 className="p-3">{0}</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-danger text-white">
            <div className="card-inner d-flex justify-content-between align-items-center p-3">
              <h3>ORDERS</h3>
              <i className="ri-shopping-cart-2-line card_icon"></i>
            </div>
            <h1 className="p-3">{0}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
