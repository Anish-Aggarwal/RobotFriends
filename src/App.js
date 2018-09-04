import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";
import { connect } from "react-redux";
import { setSearchField } from "./actions";

const mapStateToProps = (state) => {
    return { searchField: state.searchField };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            robots: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(resp => resp.json())
            .then(users => {
                this.setState({ robots: users });
            })
    }

    render() {
        if (this.state.robots.length === 0) {
            return <h1>Robots is loading!</h1>
        }
        else {
            const filteredrobots = this.state.robots
                .filter(robot => robot.name.toLowerCase().includes(this.props.searchField.toLowerCase()));

            return (
                <div className="tc">
                    <h1>Robot Friends</h1>
                    <SearchBox searchChange={this.props.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredrobots} />
                    </Scroll>
                </div>);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);