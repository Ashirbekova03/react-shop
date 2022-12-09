
import React from 'react'; 
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({ 
  id, 
  title, 
  imageUrl, 
  price, 
  onFavorite, 
  onPlus, 
  favorited = false, 
  loading=false
}) {
  const {isItemAdded} = React.useContext(AppContext);
  const {isFavAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId:id, title, imageUrl, price};

  const onClickPlus = () =>{
    onPlus(obj);
    
  }

  const onClickFavorite = () =>{
    onFavorite(obj);
    //setIsFavorite(!isFavorite);
  }


  return(
    <div className={styles.card}>
      {
        loading ? (
        <ContentLoader 
          speed={2}
          width={165}
          height={265}
          viewBox="0 0 165 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="165" height="155" /> 
          <rect x="1" y="167" rx="0" ry="0" width="165" height="15" /> 
          <rect x="0" y="187" rx="0" ry="0" width="100" height="15" /> 
          <rect x="0" y="234" rx="5" ry="5" width="80" height="24" /> 
          <rect x="124" y="230" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
        ) : (
      <>
        {onFavorite && (
          <div className={styles.favorite} 
          onClick={onClickFavorite}>
          <img src={isFavAdded(id) ? '/img/liked.svg' : '/img/heart.svg'} 
          alt="Unliked" />
       </div>
        )}

        <img width={120} height={160} src={imageUrl} alt="Bags" />
        <h5>{title}</h5>
        <div className={styles.cardName}>
          <div className={styles.cardPrice}>
            <span>Price:</span>
            <b>${price}</b>
          </div>

          {onPlus && (<img
          className={styles.plus} 
          onClick={onClickPlus}
          src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} 
          alt="Plus" />
          )}
         
        </div>      
      </>
      )}   
    </div>
  );
}
export default Card;