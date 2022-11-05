import React from "react";
class Homepage extends React.Component {
  constructor(props) {
    console.log("init component");
    super(props);
    this.state = {
      counter: 0,
    };
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.counter % 2 === 0;
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
}
export default Homepage;
