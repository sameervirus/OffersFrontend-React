import Header from "./components/Header";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import Offers from "./components/Offers";
import Offer from "./components/Offer";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";

import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState();
  const textcenter = !isLoggedIn && !user ? "main-sign" : "";
  const [loading, setLoading] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const createNotification = (type) => NotificationManager.error(type);

  const [offers, setOffers] = useState([]);

  if (isLoggedIn || user) {
    axios.defaults.headers.common["Authorization"] = user.token;
    axios.defaults.headers.common["content_type"] = "application/json";
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/offers")
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          createNotification(error.message);
        } else if (error.message === "Network Error") {
          createNotification(
            "Couldn't connect to the server, Please check your internet connection"
          );
        }
        setLoading(false);
      });
  }, []);

  const loginUser = (e) => {
    setIsLoggedIn(e);
  };

  const editItem = (e) => {
    setIsEdit(e);
  };

  const onEdit = (offer) => {
    console.log(offer);
  };

  const onClickEdit = (offer) => {
    setIsEdit(true);
    setSelectedItem(offer);
  };

  return (
    <div className={`app ${textcenter}`}>
      {loading && (
        <div
          tabIndex="0"
          aria-label="Loading"
          className="vld-overlay is-active is-full-page"
        >
          <div className="vld-background"></div>
          <div className="loader"></div>
        </div>
      )}
      <NotificationContainer />
      {!isLoggedIn && !user && <Login loginUser={loginUser} />}
      {(isLoggedIn || user) && (
        <div>
          <Header loginUser={loginUser} />
          {!isEdit && (
            <Offers items={offers} editItem={editItem} onEdit={onClickEdit} />
          )}
          {isEdit && (
            <Offer
              onEdit={onEdit}
              editItem={editItem}
              selectedItem={selectedItem}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
