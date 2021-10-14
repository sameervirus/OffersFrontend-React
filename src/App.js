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
import { format } from "fecha";

import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState();
  const textcenter = !isLoggedIn && !user ? "main-sign" : "";
  const [loading, setLoading] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        NotificationManager.success(message, "Oh yeah!");
        break;
      case "warning":
        NotificationManager.warning(message, "Pay attention");
        break;
      case "error":
        NotificationManager.error(message, "Error");
        break;
      default:
        NotificationManager.info(message);
        break;
    }
  };

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
          createNotification("error", error.message);
        } else if (error.message === "Network Error") {
          createNotification(
            "error",
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
    if (offer.rec_date) offer.rec_date = format(offer.rec_date, "YYYY-MM-DD");
    if (offer.quo_date) offer.quo_date = format(offer.quo_date, "YYYY-MM-DD");
    setSelectedItem();
    setLoading(true);
    if (offer.id) {
      axios
        .put(`http://localhost:5000/offers/${offer.id}`, { model: offer })
        .then((response) => {
          const objIndex = offers.findIndex((obj) => obj.id === offer.id);
          offers[objIndex] = response.data;
          setOffers(offers);
          setIsEdit(false);
          setLoading(false);
          createNotification("success", "Item updated successfully");
        })
        .catch((error) => {
          if (error.response) {
            createNotification("error", error.message);
          } else if (error.message === "Network Error") {
            createNotification(
              "error",
              "Couldn't connect to the server, Please check your internet connection"
            );
          }
          setLoading(false);
        });
    } else {
      axios
        .post(`http://localhost:5000/offers/`, { model: offer })
        .then((response) => {
          setOffers([response.data, ...offers]);
          setIsEdit(false);
          setLoading(false);
          createNotification("success", "Item Added successfully");
        })
        .catch((error) => {
          if (error.response) {
            createNotification("error", error.message);
          } else if (error.message === "Network Error") {
            createNotification(
              "error",
              "Couldn't connect to the server, Please check your internet connection"
            );
          }
          setLoading(false);
        });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (id) {
        setLoading(true);
        axios
          .delete(`http://localhost:5000/offers/${id}`)
          .then((res) => {
            console.log(res);
            if (res.data.message === "deleted") {
              setOffers(offers.filter((item) => item.id !== id));
              createNotification("success", "Item deleted successfully");
            } else {
              createNotification("error", "Please select at leaset one item");
            }
            setLoading(false);
          })
          .catch((error) => {
            if (error.response) {
              createNotification("error", error.message);
            } else if (error.message === "Network Error") {
              createNotification(
                "error",
                "Couldn't connect to the server, Please check your internet connection"
              );
            }
            setLoading(false);
          });
      } else {
        createNotification("error", "Please select at leaset one item");
      }
    }
  };

  const getQuoNo = (id) => {
    if (id) {
      setLoading(true);
      const code = user.id === 1 ? "QU" : "FQU";
      axios
        .post(`http://localhost:5000/offers/update-last`, { code, id })
        .then((res) => {
          const objIndex = offers.findIndex((obj) => obj.id === id);
          if (objIndex > -1) {
            offers[objIndex].quo_no = res.data.quo_no;
            createNotification("success", res.data.quo_no);
          } else {
            createNotification("error", "Please select at leaset one item");
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            createNotification("error", error.message);
          } else if (error.message === "Network Error") {
            createNotification(
              "error",
              "Couldn't connect to the server, Please check your internet connection"
            );
          }
          setLoading(false);
        });
    } else {
      createNotification("error", "Please select at leaset one item");
    }
  };

  const onClickEdit = (offer) => {
    setIsEdit(true);
    setSelectedItem(offer);
  };

  const aadCurrentPage = (page) => {
    setCurrentPage(page);
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
            <Offers
              items={offers}
              editItem={editItem}
              onEdit={onClickEdit}
              addCurrentPage={aadCurrentPage}
              currentPage={currentPage}
              onDelete={onDelete}
              getQuoNo={getQuoNo}
            />
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
