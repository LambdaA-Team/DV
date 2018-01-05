import React, { Component } from 'react';
import RestaurantList from './RestaurantList';
import { checkStatus, parseJSON } from '../utilities/index';
import GeoLocation from './GeoLocation';

class RestaurantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      query: this.props.query,
      zipcode: 94080,
    };
    this.toggleSortDistance = this.toggleSortDistance.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.fetchRestaurants = this.fetchRestaurants.bind(this);
  }
  fetchRestaurants(query, zipcode) {
    let url =
      "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'" +
      zipcode +
      "'%20and%20query%3D'" +
      query +
      "'&format=json&diagnostics=true&callback=";
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(
        function(data) {
          let results = data.query.results.Result;
          if (this.state.sort === 'ratings') {
            results = results.sort((a, b) => {
              if (!isFinite(a.Rating.AverageRating - b.Rating.AverageRating))
                return !isFinite(a.Rating.AverageRating) ? 1 : -1;
              else return b.Rating.AverageRating - a.Rating.AverageRating;
            });
          } else {
            results = results.sort((a, b) => {
              if (!isFinite(a.Distance - b.Distance))
                return !isFinite(a.Distance) ? 1 : -1;
              else return a.Distance - b.Distance;
            });
          }
          this.setState({
            restaurants: results,
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log('request failed', error);
      });
  }
  componentDidMount() {
    this.fetchRestaurants(this.state.query, this.state.zipcode);
  }
  updateQuery(query) {
    this.setState({ query: query });
    this.fetchRestaurants(query, this.state.zipcode);
  }
  updateZip(zip) {
    this.setState({ zip: zip });
    this.fetchRestaurants(this.state.query, zip);
  }
  toggleSortDistance(e) {
    e.preventDefault();
    let results = this.state.restaurants;
    results = this.state.restaurants.sort((a, b) => {
      if (!isFinite(a.Distance - b.Distance))
        return !isFinite(a.Distance) ? 1 : -1;
      else return a.Distance - b.Distance;
    });
    this.setState({
      sort: 'distance',
      restaurants: results,
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-4 col-xs-12">
          <GeoLocation onZipchange={this.updateZip} />
        </div>
        <div className="col-sm-8 col-xs-12">
          <h3>Agencies Nearby:</h3>
          <RestaurantList restaurants={this.state.restaurants} />
        </div>
      </div>
    );
  }
}
export default RestaurantContainer;
