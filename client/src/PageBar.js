import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from "jquery";

class PageBar extends Component {
    gotoPage(number){
        let path = {pathname:`../users/${number}`}
        this.props.history.push(path);
    }
    fillBar(){
        const links=[];
        const current_page=this.props.currentPage;
        const pages=this.props.pages;
        links.push(1);
        links.push(pages);
        for (let i=current_page-2;i<current_page+3;i++) {
            if (i > 0 && i < pages) {
                links.push(i)
            }
        }
        let uniq = [...new Set(links)];
        return uniq.sort((a,b)=>a-b);
    }
    render(){
        return (
            <div>
                <form className="form-inline">
                        <input  onChange={(e)=>this.props.onChange(e)} placeholder="last_name search" name="search" type="text" className="form-control col-12"/>
                </form>
            </div>
        );
    }
}

export default withRouter(PageBar);
