import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import BrewContainerByName from "./ByName";
import BrewContainerByPostral from "./ByPostral";
import BrewContainerByState from "./ByState";

const BrewContainer = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get("https://api.openbrewerydb.org/breweries", {
      params: {
        by_city: name,
      }
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => {
      const tem = JSON.stringify(res);
      console.log(tem);
      setResult(res.data);
    })
      .catch((err) => { console.log(err); })
  };
  return (
    <React.Fragment>
      <Container style={{ margin: "25px 0px 10px 100px", minHeight: "100px" }}>
        <div>
          Enter City
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div
          style={{
            width: "70px",
            padding: "4px 0px 0px 15px",
            margin: "25px 0px 0px 120px",
            cursor: "pointer",
            height: "25px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "8px"
          }}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </div>

        <Table striped bordered hover size="md" bordered="true">
          <thead>
            <tr>
              <th>ID</th>
              <th> Name</th>
              <th>Brewery Type</th>

              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          {result.lenght === 0
            ?
            null
            :
            <React.Fragment>
              {

                result.map((o, i) => {
                  return (
                    <tbody key={i}>
                      <tr >
                        <td>{o.id}</td>
                        <td>{o.name}</td>
                        <td>{o.brewery_type}</td>
                        <td>{o.city}</td>
                        <td>{o.state}</td>
                        <td>{o.country}</td>
                      </tr>
                    </tbody>
                  );
                })

              }
            </React.Fragment>
          }
        </Table>

      </Container>

      <Container style={{ margin: "50px 0px 10px 0px", minHeight: "100px" }}>
        <BrewContainerByName />
      </Container>
      <Container style={{ margin: "50px 0px 10px 0px", minHeight: "100px" }}>
        <BrewContainerByState />
      </Container>
      <Container style={{ margin: "50px 0px 10px 0px", minHeight: "100px" }}>
        <BrewContainerByPostral />
      </Container>

    </React.Fragment >
  );
};
export default BrewContainer;
