
import React, {Component} from "react";
import {
    getAllPerson, createPerson, deletePerson,
  } from '../endpoints';
import {BsFillTrashFill} from "react-icons/bs"

class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allPosts: [],
            shownPosts: [],
            name: "",
            description: "",
            email: "defaultEmail",
            filterName: ""
            
        }
    }

    componentDidMount() {
        this.updateStatePeople();
    }

    updateStatePeople = () => {
        getAllPerson()
        .then(response => {
            this.setState({allPosts: response.data, shownPosts: response.data});
            console.log(this.state);
        })
        .catch(error => {
            console.log(error);
        })
    }

    createPost = (event) => {
        event.preventDefault();
        createPerson({name: this.state.name, description: this.state.description, email: this.state.email}).
        then( () => {
            this.updateStatePeople();
        })
        .catch(error => {
            console.log(error);
        })
      };
    
    deletePost = (idx) => {
        deletePerson({id: this.state.shownPosts[idx].person_id})
        .then( () => {
            this.updateStatePeople();
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});

    }

    handleFilterChange = (e) => {
        this.setState({filterName: e.target.value});

    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});

    }

    filterPosts = (e) => {
        e.preventDefault();
        console.log("filter "+ this.state.filterName)
        if (this.state.filterName) {
            this.setState({shownPosts: this.state.allPosts.filter((pp) => pp.name.includes(this.state.filterName))});
        } else{
            this.setState({shownPosts: this.state.allPosts});
        }
        console.log(this.state.shownPosts);
    }
    
    render() {
        return (
            
            <div className="posts">
                <form>
                    <input
                        type={Text}
                        placeholder="Filter by name"
                        name="filter"
                        onChange={this.handleFilterChange}
                    ></input>
                    <button onClick={this.filterPosts}>Search</button>
                </form>
                <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.shownPosts.map((val, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{val.name}</td>
                            <td>{val.description}</td>
                            <td><BsFillTrashFill className="delete-btn" onClick={() => this.deletePost(idx)}></BsFillTrashFill></td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                <form>
                    <input
                        type={Text}
                        placeholder="Enter Name"
                        name="postName"
                        onChange={this.handleNameChange}
                    ></input>
                    <input
                        type={Text}
                        placeholder="Enter description"
                        name="postDescription"
                        onChange={this.handleDescriptionChange}
                    ></input>
                    <button onClick={this.createPost}>Create</button>
                </form>
                
                
            </div>
    
        );
    }
   
  };

  export default Posts;