import React from "react";

const ListEtablissment = ({ data }) => {
  if (!data || data.length === 0)
    return <h3>aucun établissment enregistré </h3>;
  return (
    <div>
      <row className="row">
        <div className="col-2"> nom </div>
        <div className="col-2"> ville </div>
        <div className="col-2"> adresse </div>
        <div className="col-4"> description </div>
        <div className="col-2"> id_gerant </div>
      </row>
      {data.map((etab) => {
        return (
          <row className="row" id={etab.id}>
            <div className="col-2"> {etab.nom} </div>
            <div className="col-2"> {etab.ville} </div>
            <div className="col-2"> {etab.adresse} </div>
            <div className="col-4"> {etab.description} </div>
            <div className="col-2"> {etab.id_gerant} </div>
          </row>
        );
      })}
    </div>
  );
};

export default ListEtablissment;
