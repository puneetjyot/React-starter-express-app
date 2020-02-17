import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";

class Delete extends Component {
  state = {
    BookID: "",
    errors: "",
    bookCreateFlag:""
  };

  handleSubmit=(e)=>{

    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
     
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a delete request with the user data
    axios.delete("http://localhost:3001/delete", {data:{data:data}}).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
       
        this.setState({
            
          bookCreateFlag: true
        });
      } 
    })
    .catch(errors=>
    {
        console.log(errors)
           this.setState({errors:"Book Id Doesn't Exist"}) ;
        
        
    })

  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    else if (this.state.bookCreateFlag) {
        redirectVar = <Redirect to="/home" />;
     }
    return (
      <div class="container">
        {redirectVar}
        <ul>
            <p style={{color:"red"}}>{this.state.errors}</p>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div style={{ width: "50%", float: "left" }} class="form-group">
            <input
              type="number"
              class="form-control"
              name="BookID"
              placeholder="Search a Book by Book ID"
              onChange={e => {
                  this.setState({BookID:e.target.value})
              }}
            />
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <button class="btn btn-success" type="submit">
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Delete;
