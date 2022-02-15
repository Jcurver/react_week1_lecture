import logo from "./logo.svg";
import "./App.css";
import { BroserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Cat from "./Cat";
import Dog from "./Dog";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/">홈으로 가기</Link>
        <Link to="/cat">캣으로 가기</Link>
        <Link to="/dog">독으로 가기</Link>
      </div>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/cat" exact component={Cat}>
        {/* <Cat></Cat> */}
      </Route>
      <Route path="/dog" >
        <Dog></Dog>
      </Route>
    </div>
  );
}

export default App;
