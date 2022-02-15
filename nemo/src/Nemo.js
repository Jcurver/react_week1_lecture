import React from "react";

// addNemo = () => {
//   this.setState({ count: this.state.count + 1 });
// };
// removeNemo = () => {
//   if (this.state.count > 0) {
//     this.setState({ count: this.state.count - 1 });
//   } else {
//     window.alert("네모가 없어여");
//   }
// };

const Nemo = (props) => {
  const [count, setCount] = React.useState(3);

  const nemo_count = Array.from({ length: count }, (v, i) => i);
  const addNemo = () => {
    setCount(count + 1);
  };
  const removeNemo = () => {
    if (count > 0) {
      setCount(count - 1);
    } 
  };

  return (
    <>
      {nemo_count.map((n, i) => {
        return (
          <div
            key={i}
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "#dddddd",
              margin: "10px",
            }}
          >
            nemo
          </div>
        );
      })}
      <div onClick={addNemo}>하나 추가</div>
      <div onClick={removeNemo}>하나 빼기</div>
    </>
  );
};

export default Nemo;
