import React, { PropTypes } from 'react';

const VehicleList = (props) => {
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
          { props.vehicles.map(function(vehicle) {
            return (<tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.personId}</td>
            </tr>);
          })
          }
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;

