import { useEffect, useState, useMemo } from "react";
import Table from "react-bootstrap/Table";

const MyTable = (props) => {
  return (
    <>
      {props.loading && <h2>Loading....</h2>}
      {!props.loading && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {props.objectkeys.map((key) => {
                return <td key={key}>{key}</td>;
              })}
              {/* <th>API</th>
              <th>Description</th>
              <th>Auth</th>
              <th>Cors</th>
              <th>Link</th>
              <th>Category</th> */}
            </tr>
          </thead>
          <tbody>
            {props.currentData.map((entry, index) => {
              return (
                <tr key={index}>
                  {props.objectkeys.map((key) => {
                    return <td key={key}>{entry[key]}</td>;
                  })}
                  {/* <td>{entry.API}</td>
                  <td>{entry.Description}</td>
                  <td>{entry.Auth}</td>
                  <td>{entry.Cors}</td>
                  <td>{entry.Link}</td>
                  <td>{entry.Category}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyTable;
