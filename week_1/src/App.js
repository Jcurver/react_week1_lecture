import logo from "./logo.svg";
import "./App.css";

function App() {
  const styles = {
    border: "1px solid black",
    padding: "20px",
    width: "200px",
    margin: "30px auto",
  };
  return (
    <div className="App">
      <div style={{ styles }}>
        <h1 style={{ color: "green" }}>안녕하세여</h1>
        <hr />
        <p style={{ textAlign: "left" }}>이름을 입력해주세요</p>
        <input type="text" />
      </div>
    </div>
  );
}

export default App;
