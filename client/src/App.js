import React, { Component } from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import { Router, Route, Link } from 'react-router';
import Users from './Users';
import PageBar from './PageBar';
const qs = require('query-string');

class App extends Component {
    constructor(props){
      super(props);
        this.state={loaded:false,current_page:parseInt(props.match.params.number)};
    }

    componentDidMount(){
        this.loadData(this.state.current_page,20);
    }
    componentWillReceiveProps(props){
        let current_page=parseInt(props.match.params.number);
        this.setState({loaded:false,current_page:current_page});
        this.loadData(parseInt(props.match.params.number));
    }
    loadData(pageNo){
        fetch(`http://localhost:3000/api/users?pageNo=${pageNo}&size=50`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({loaded:true,messages:data.message,pages:data.pages});

            })
    }
    search(e){
        fetch(`http://localhost:3000/api/search?last_name=${e.target.value}`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({loaded:true,messages:data.message,pages:data.pages});
            })
    }
    render(){
       if (!this.state.loaded) return(<div>Загрузка</div>); else return (
           <div>
            <PageBar onChange={(e)=>this.search(e)} pages={this.state.pages} currentPage={this.state.current_page}/>
            <Users messages={this.state.messages}/>
           </div>
        );
    }
}

export default App;
