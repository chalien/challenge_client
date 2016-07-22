import React, { PropTypes } from 'react';

const VehicleList = (props) => {

  let removeVehicle = function(event) {
    let { personId, id } = event.target.dataset;
    props.removeVehicle(personId, id);
  };

  return (
    <div className="overflow table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>License Plate</th>
            <th>Person Reference</th>
          </tr>
        </thead>
        <tbody>
          {props.vehicles.map(function(vehicle) {
            return (<tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.personId}</td>
                <td> <a href="javascript: void(0);" data-id={vehicle.id} data-personId = {vehicle.personId}  onClick = {removeVehicle} >Delete</a></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
};

VehicleList.propTypes = function(){
  return {
    'removeVehicle': PropTypes.func.isRequired,
  };
};

export default VehicleList;

