import React from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import CarouselBox from './components/CarouselBox';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  
  React.useEffect(() =>{
    async function fetchData() {
      try{
        const [ cartResponse, favoritesResponse, itemsResponse ] = await Promise.all([
                                      axios.get('https://638d0cc6eafd555746b4a6f9.mockapi.io/cart'),
                                      axios.get('https://638d0cc6eafd555746b4a6f9.mockapi.io/favorites'),
                                      axios.get('https://638d0cc6eafd555746b4a6f9.mockapi.io/items')]);
      
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      }catch(error){
        alert('Error requesting data');
        console.error(error);
      }
    }

    fetchData();
  }, []);
  
  const onAddToCart = async (obj) => {
    try{
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem){  
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://638d0cc6eafd555746b4a6f9.mockapi.io/cart/${findItem.id}`);
      }else{
        setCartItems((prev) =>[...prev, obj]);
        const { data } = await axios.post('https://638d0cc6eafd555746b4a6f9.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            };
          }
          return item;
        }));
    
      }
    }catch(error){
      alert("Error adding to cart");
      console.error(error);
    }
    
  };

  const onRemoveItem = (id) => {
   try{
      axios.delete(`https://638d0cc6eafd555746b4a6f9.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
   }catch(error){
    alert('Error when deleting from cart');
    console.error(error);
   }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://638d0cc6eafd555746b4a6f9.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://638d0cc6eafd555746b4a6f9.mockapi.io/favorites',
          obj,
        
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Error when adding to favorites');
      console.error(error);
    }
    
  };
 

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };



  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isFavAdded = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };



  return (
    <AppContext.Provider value={{ items, cartItems,favorites, 
                                  isItemAdded, onAddToFavorite,
                                  onAddToCart, setCartOpened, 
                                  setCartItems, isFavAdded }}>

      <div className="wrapper clear">
        
      <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
      
      <Header onClickCart = {() => setCartOpened(true)} />
     
     
        <Route path="/" exact>  
        <CarouselBox/>   
          <Home 
          items={items} 
          cartItems={cartItems}
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
           />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>

    </div>
    
    </AppContext.Provider>
    
  );
}

export default App;
