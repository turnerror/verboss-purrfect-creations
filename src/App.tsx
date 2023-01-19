import { useEffect, useState } from 'react';
import { getData } from './api';
import './App.css';

function App() {

  const [totalOrders, setTotalOrders] = useState(0);
  const [monthyTotal, setMonthlyTotal] = useState(0);
  const [inProgressTotal, setInProgressTotal] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    (async () => {
      // setTotalOrders (await getTotal());
      const {total, monthlyTotal, inProgressTotal, revenue} = await getData();
      setTotalOrders(total);
      setMonthlyTotal(monthlyTotal);
      setInProgressTotal(inProgressTotal);
      setRevenue(revenue);
    })()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Purrfect Creations Dashboard!!!</h1>
        <h2>Total Orders:  {totalOrders}</h2>
        <h2>Total Orders this Month: {monthyTotal}</h2>
        <h2>Number of orders in progress: {inProgressTotal}</h2>
        <h2>Total revenue: ${revenue}</h2>
      </header>
    </div>
  );
}

export default App;
