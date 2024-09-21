import React from "react";
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {
  return (
    <div className="">
      {/* <SearchBar options={options} /> */}
      <nav class="navbar navbar-light p-2">
        <a class="navbar-brand" href="/">
          <img src="./logo.png" width="140" height="30" alt="" />
        </a>
      </nav>
      <SearchBar />
      {/* <MobilePhoneInfo {...phoneDetails} /> */}
    </div>
  );
};

export default App;
