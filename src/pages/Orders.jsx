import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import AppContext from '../context';

function Orders({}){
    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
       (async () => {
        try{
            const { data } = await axios.get('https://638d0cc6eafd555746b4a6f9.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
        }catch(error){
            alert("Order page error");
            console.error(error);
        }
    })(); 

    }, []);



    return(
        <div className="content">
        <div className="allBags">
          <h1>Orders</h1>
         
        </div>

        <div className="cards">
          {(isLoading ? [...Array(8)] 
        : orders).map((item, index) => (
            <Card 
            key={index}
            loading={isLoading}
            { ...item}
            />
          ))}

        </div>
      </div>
    );
}
export default Orders;