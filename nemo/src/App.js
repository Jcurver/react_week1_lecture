import React from "react";
import Nemo from "./Nemo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
    };
  }
  componentDidMount() {}

  render() {
    const nemo_count = Array.from({ length: this.state.count }, (v, i) => i);

    return (
      <div className="App">
        <Nemo />
        
      </div>
    );
  }
}

export default App;
