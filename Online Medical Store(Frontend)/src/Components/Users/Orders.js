import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import { Button, Typography } from "@mui/material";

export default function Orders() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    axios
      .post(
        `https://localhost:7156/api/Orders/${localStorage.getItem("userId")}`
      )
      .then(
        (response) => {
          // console.log(response.data);
          setInputs(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <>
      <NavBar />
      {inputs.length === 0 ? (
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginTop: "8%", marginLeft: "1%" }}
        >
          You haven't ordered yet!!{" "}
          <Button
            onClick={() => {
              navigate("/");
            }}
            style={{ color: "#008080", textTransform: "capitalize" }}
          >
            click here
          </Button>{" "}
          to order.
        </Typography>
      ) : (
        <Table
          bordered
          hover
          style={{
            margin: "15% 9%",
            width: "80%",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          <thead style={{ backgroundColor: "#009999", color: "white" }}>
            <tr>
              <th>Id</th>
              <th>Medicine Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((i) => (
              <tr>
                <td>{i.id}</td>
                <td>{i.medicineName}</td>
                <td>{i.orderTotal}</td>
                <td>1</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
