import React, { Component } from 'react';
import { Meteor }           from 'meteor/meteor';
import { createContainer }  from 'meteor/react-meteor-data';
import MentorDetail         from './mentor_detail';
import MenteeDetail         from './mentee_detail';
import { Mentors }          from '../../imports/collections/mentors';
import { Mentees }          from '../../imports/collections/mentees';
import SearchResults        from './search_results';

export default class UserResults extends Component {
    constructor(props) {
        super(props);
        this.state = {users:[]};
    }

    onAddMentor(user) {
        Meteor.call('mentors.add', user);
        Meteor.call('mentees.add', user);
    }

    renderList() {
        if(this.state.users[0] === null) {
            return <div> </div>;
        }

        return this.state.users.map(user => {
            return (
                    <li className="list-group-item" key={user._id}>
                        <img className="result-image" src={user.profile.avatar}/>
                        <h2 id="username-result"><Link to={"/profile/"+user.username}>{user.profile.firstName}</Link></h2>
                        <a onClick={() => this.onAddMentor(user)}>
                            <img id="add-user" src="/add-user-icon.png"/>
                        </a>
                    </li>
            );
        });
    }

    render() {
        return (
            <div>
                <p>Results:</p>
                <div className="list-users">
                    <ul className="list-group">
                        {/*{this.renderList()}*/}
                    </ul>
                </div>
            </div>
        )
    }
};