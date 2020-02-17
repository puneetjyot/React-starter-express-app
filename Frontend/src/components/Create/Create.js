import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";

class Create extends Component {
  state = {
    BookID: "",
    Title: "",
    Author: "",
    bookCreateFlag: false,
    errors: ""
  };

  componentWillMount() {
    this.setState({
      bookCreateFlag: false
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
      Title: this.state.Title,
      Author: this.state.Author
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/create", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            bookCreateFlag: true
          });
        }
      })
      .catch(errors => {
        console.log(errors);
        this.setState({ errors: "Book Id Already Exists" });
       
      });
  };

  render() {
    let redirectVar = null;

    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    } else if (this.state.bookCreateFlag) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirectVar}
        <ul>
          <p style={{ color: "red" }}>{this.state.errors}</p>
        </ul>
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="number"
                className="form-control"
                name="BookID"
                placeholder="Book ID"
                onChange={e => {
                  this.setState({ BookID: e.target.value });
                }}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Title"
                placeholder="Book Title"
                onChange={e => {
                  this.setState({ Title: e.target.value });
                }}
                required
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Author"
                placeholder="Book Author"
                onChange={e => {
                  this.setState({ Author: e.target.value });
                }}
                required
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
