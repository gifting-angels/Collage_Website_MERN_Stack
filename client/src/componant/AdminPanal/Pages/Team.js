import axios from "../../../Axios/axios";
import React, { useState,useEffect  } from "react";
import SideBar from "../SideBar";
import Navbar from "../../Nav/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Team() {
  const [adminRequestData, setadminRequestData] = useState([]);
  const [showReject, setShowReject] = useState(false);
  const [id, setId] = useState()
  const [update, setupdate] = useState(false)
  const [name, setname] = useState()
  // admin Request

  useEffect(() => {
    axios
        .get("/team")
        .then((result) => {
            setadminRequestData(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
},[update]);
  


// Remove

    const handleCloseReject = () => setShowReject(false);
    const handleRejectAdmin = () => {
      axios.put("/removeAdmin",{id:id})
      .then((result) => {
        setupdate(!update)
      }).catch((err) => {
        setupdate(!update)
      });
      setShowReject(false)
    //   setupdate(update)
    };
    const handleShowReject = (id,name) => {
      setShowReject(true);
      setId(id)
      setname(name)
    } 
  return (
    <>
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{width:"80%",margin:"0px auto"}}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
                <th scope="col">Remove from Admin</th>
              </tr>
            </thead>
            <tbody>
              {adminRequestData.map((requests, i) => {
                return (
                  <tr key={requests._id}>
                    <th scope="col">{i + 1}</th>
                    <th scope="col">{requests.Name}</th>
                    <th scope="col">{requests.Email}</th>
                    <th scope="col">{requests.Date}</th>
                    <th scope="col" style={{ display: "flex" }}>
                      <button
                        style={{ marginLeft: "10px" }}
                        type="button"
                        className="btn btn-danger "
                        onClick={()=>handleShowReject(requests._id,requests.Name)}
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
       show={showReject} onHide={handleCloseReject}>
        <Modal.Header closeButton>
          <Modal.Title>Remove from Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove <span style={{color:"blue"}}>{name}</span> from admin.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReject}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRejectAdmin}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  </>
  )
}
