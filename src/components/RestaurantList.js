import React, { Component } from 'react';
import 'whatwg-fetch';

class RestaurantList extends Component {
  render() {
    var restaurants = this.props.restaurants || [];
    return (
      <div>
        <ul className="list-group">
          {restaurants.map(function(restaurant) {
            return (
              <ul key={restaurant.id} className="list-group-item">
                <a href={restaurant.BusinessUrl}>
                  <h4 className="list-group-item-heading">
                    {restaurant.Title}
                  </h4>
                </a>
                <p className="list-group-item-text">
                  <a href={restaurant.Url}>
                    {restaurant.Address} {restaurant.City}, {restaurant.State}{' '}
                  </a>
                  <br />
                  {restaurant.Phone}
                  <br />
                  Distance: {restaurant.Distance}
                  <br />
                </p>
              </ul>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default RestaurantList;
