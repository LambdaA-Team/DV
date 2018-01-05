import React, { Component } from 'react';
import 'whatwg-fetch';
import { checkStatus, parseJSON } from '../utilities/index';

class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      zipcode: '',
    };
    this.updatePosition = this.updatePosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleQuerysubmit = this.handleQuerysubmit.bind(this);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition);
    } else {
      this.setState({
        message:
          'Geolocation is not supported by this browser. App default location used.',
      });
    }
  }
  getZipcode(lat, long) {
    let url =
      'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      lat +
      ',' +
      long +
      '&sensor=false';
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(
        function(data) {
          var zipcode = data.results[0].address_components[7].short_name
            ? data.results[0].address_components[7].short_name
            : '94015';
          this.setState({ zipcode: zipcode });
          this.props.onZipchange(this.state.zipcode);
        }.bind(this)
      )
      .catch(function(error) {
        console.log('request failed');
        console.log(error);
      });
  }
  updatePosition(position) {
    this.getZipcode(position.coords.latitude, position.coords.longitude);
    var message = '';
    message = 'GPS Location';
    this.setState({
      message: message,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  handleQuerysubmit(e) {
    e.preventDefault();
    this.props.onZipchange(this.state.zipcode);
  }
  handleZipChange(e) {
    this.setState({ zipcode: e.target.value });
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <p>
            {this.state.message}
            {this.state.zipcode ? ' ' + this.state.zipcode : ''}
          </p>
          <form onSubmit={this.handleQuerysubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Enter Zipcode: </label>
              <input
                type="text"
                value={this.state.zipcode}
                onChange={this.handleZipChange}
                className="form-control"
                id="query"
                name="query"
                placeholder="Change Zipcode"
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default GeoLocation;
