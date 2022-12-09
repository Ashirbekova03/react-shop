import React from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart';


function Header(props) {

  const { totalPrice } = useCart();



    return(
        <header>
          <Link to="/">
        <div className="headerDiv">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />
          <div>
            <h3>Women's bag shop</h3>
            <p>Shop the best women's bags</p>
          </div>
        </div>
        </Link>
        <ul className="headerUl">
          <li onClick={props.onClickCart} className="headerLi">
            <img width={18} height={18} src="/img/cart.png" alt="Cart" />
            <span>${totalPrice}</span>
          </li>
          <li className="headerLiSvg">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/heart.svg" alt="Favorites"/> 
            </Link>
          </li>

          <li className="headerLiSvg">
            <Link to="/orders">
            <img width={18} height={18} src="/img/user.svg" alt="User"/> 
            </Link>
          </li>
        </ul>
      </header>
    );
}
export default Header;