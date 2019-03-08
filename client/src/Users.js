import React, { Component } from 'react';


class Users extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }
    render(){
        return (
            <div className="container users">
            <div className={"row"}>
                {this.props.messages.map((item, i) => {
                        return <div key={i} className={"col col-xl-4 col-6 user"}>
                            <h4>{item.first_name +' '+ item.last_name}</h4>
                            <ul>
                                <li>{item.email}</li>
                                <li>{item.birth_date}</li>
                            </ul>
                        </div>

                    }
                )}
            </div>
            </div>
        );
    }
}

export default Users;
