import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Explore the world news about NPK!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/background.png'
              text='Why do we need to save NPK'
              label='Savings'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Why NPK are so important for Rice grow?'
              label='NPK'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Explore effect of Natri on growing a Rice'
              label='Natri'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Explore effect of Kali on growing a Rice'
              label='Kali'
              path='/services'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Explore effect of Photpho on growing a Rice'
              label='Photpho'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;