
import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({}){

   const {favorites, onAddToFavorite} = React.useContext(AppContext);
  
    return(
        <div className="content">
        <div className="allBags">
          <h1>Favorites</h1>
         
        </div>

        <div className="cards">
          {favorites
          .map((item, index) => (
            <Card 
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite} 
            { ...item}
            />
            
          ))}

        </div>
      </div>
    );
}
export default Favorites;