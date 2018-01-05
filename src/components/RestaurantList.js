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
              <li key={restaurant.id} className="list-group-item">
                <a href={restaurant.Url}>
                  <h4 className="list-group-item-heading">
                    {restaurant.Title}
                  </h4>
                </a>
                <p className="list-group-item-text">
                  {restaurant.Address} {restaurant.City} {restaurant.State}
                </p>
                Estimated Distance: {restaurant.Distance} Miles <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default RestaurantList;
