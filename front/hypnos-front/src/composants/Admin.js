import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
import ListEtablissment from "./ListEtablissment";

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    axios
      .get(
        `${config.urlServer.url}:${config.urlServer.port}/etablissment/get?token=${token}&role=${role}`
      )
      .then((data) => {
        console.log("data", data);
        setData(data.data.data);
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.response.data);
      });
  }, []);

  return (
    <Fragment>
      <Header />

      <div className="container">
        <div className="titre">
          <h3>Listes d'établissment</h3>
          <button
            //onClick={() => onConnect()}
            className="btn btn-color "
          >
            Ajouter un établissment
          </button>
        </div>
        <ListEtablissment data={data} />
      </div>
    </Fragment>
  );
};

export default Admin;
