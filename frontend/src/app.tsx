import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { getDashboardStats} from './api';
import './app.css';
import { Order } from './order';
import { Order as IOrder } from './order.types';

function App() {

  const [totalOrders, setTotalOrders] = useState(0);
  const [monthyTotal, setMonthlyTotal] = useState(0);
  const [inProgressTotal, setInProgressTotal] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [latestOrders, setLatestOrders] = useState<IOrder[] | null>(null);

  const createOrder = () => axios.post("/order");

  useEffect(() => {
    (async () => {
      // setTotalOrders (await getTotal());
      const {total, monthlyTotal, inProgressTotal, revenue, latestOrders} = await getDashboardStats();
      setTotalOrders(total);
      setMonthlyTotal(monthlyTotal);
      setInProgressTotal(inProgressTotal);
      setRevenue(revenue);
      setLatestOrders(latestOrders);
    })()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createOrder}>Create test order</button>
        <h1>Purrfect Creations Dashboard!!!</h1>
        <h2>Total Orders:  {totalOrders}</h2>
        <h2>Total Orders this Month: {monthyTotal}</h2>
        <h2>Number of orders in progress: {inProgressTotal}</h2>
        <h2>Total revenue: ${revenue}</h2>
        <h2>Latest Orders</h2>
        {latestOrders !== null && latestOrders.length > 0 ? latestOrders.map((order, i) => <Order key={i} {...order.fields} />) : null  }
      </header>
    </div>
  );
}

export default App;
