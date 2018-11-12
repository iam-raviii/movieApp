import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {

  state = {
    data: [],
    id: 0,
    title: null,
    actor: null,
    genre: null,
    date: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDb();
    if(!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }  


  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };


  putDatatoDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)){
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idTObeAdded,
      title: title,
      actor: actor,
      genre: genre,
      date: date
    });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null; 
    this.state.data.forEach( dat => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
    });

    axios.delete("/api/deleteData", {
      data {
        id: objIdToDelete
      }
    });
  };


  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   this.state.data.forEach(dat => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat-_id;
  //     }
  //   });

  //   axios.post ("/api/updateDate", {
  //     id: objIdToUpdate,
  //     update: {  }
  //   })
  // }


  render() {

    const { data } = this.state;

    
    return (
      <div >
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map (dat => (
                <li style = {{ padding : "10px" }} key={data.message}>
                  <span style= {{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style= {{ color: "gray" }}> data: </span>
                {dat.message}
                </li>
              ))}
        </ul>

        <div style = {{ padding: "10px" }}>
          <input
          >
        <p>Movie App</p>
      </div>
    );
  }
}

export default App;
