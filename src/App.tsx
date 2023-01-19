import { useEffect, useState } from 'react';
import { getTotal } from './api';
import './App.css';

function App() {

  const [totalOrders, setTotalOrders] = useState(0);

  getTotal().then((total => console.log({total})))

  useEffect(() => {
    (async () => {
      setTotalOrders (await getTotal());
    })()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Total Orders {totalOrders}</h2>
      </header>
    </div>
  );
}

export default App;
