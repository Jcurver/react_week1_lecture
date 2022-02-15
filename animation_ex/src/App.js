import styled, { keyframes } from "styled-components";

function App() {
  return (
    <div className="App">
      <Box></Box>
    </div>
  );
}


const boxAnimation = keyframes`
  0% {
    border-radius:0px;
    top:20px
  }
  50% {
    border-radius:50px;
    top:400px
  }
  100% {
    border-radius:0px;
    top:50px
  }
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: green;
  border-radius: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
  animation: ${boxAnimation} 2s 1s infinite linear alternate;
`;


export default App;
