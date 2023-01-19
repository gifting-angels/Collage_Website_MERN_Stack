import React, { useState, useEffect } from "react";
import Navbar from "../../Nav/Navbar";
import SideBar from "../SideBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UploadMaterial.css";
import { NavLink, Link } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Document, Page } from "react-pdf";
// import PDFViewer from "pdf-viewer-reactjs";
import * as AiIcons from "react-icons/ai";
import axios from "../../../Axios/axios";
import "./UploadMaterial.css";
// import * as AiIcons from "react-icons/ai";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
export default function () {
  const [branch, setbranch] = useState();
  const [classes, setclasses] = useState();
  const [subject, setsubject] = useState();
  const [studyMaterial, setstudyMaterial] = useState([]);
  const [pdfFile, setpdfFile] = useState(null);
  const [viewPdf, setviewPdf] = useState(null);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [id, setid] = useState();
  const [update, setupdate] = useState(false)

  //   plugin
  const newplugin = defaultLayoutPlugin();

  function handleSelectSubject(e) {
    setsubject(e.target.value);
  }
  function handleSelectClass(e) {
    setclasses(e.target.value);
  }
  function handleSelectBranch(e) {
    setbranch(e.target.value);
  }

  useEffect(() => {
    axios
      .post("/findStudyMaterial", {
        Branch: branch,
        Classes: classes,
        Subject: subject,
      })
      .then((result) => {
        setstudyMaterial(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  function handleSearchMaterial(e) {
    e.preventDefault();
    setupdate(!update)
  }
  const fileType = ["application/pdf"];
  function handlePDFClick(item) {
    console.log(item);
    let selectedFile = item.Material;
    // console.log(selectedFile);
    var blob = new Blob([selectedFile], { type: "application/pdf" });
    // console.log(blob)
    if (selectedFile) {
      // console.log('clicked');

      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (e) => {
        setpdfFile(e.target.result);
        setviewPdf(pdfFile);
      };
    } else {
    }
  }
  function handleDeleteIconClick(id) {
    setShowDeleteModel(true);
    setid(id);
  }
  const handleCloseModal = () => {
    setShowDeleteModel(false);
  };
  async function handleDeleteOkClick() {
    await axios
      .put("/deleteMaterial", { id })
      .then((result) => {})
      .catch((err) => {});
    setShowDeleteModel(false);
    setupdate(!update)
  }
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ padding: "20px 50px", width: "100%" }}>
          <div style={{ position: "relative" }}>
            <h2 style={{ textAlign: "center" }}> Delete Study Material</h2>
            <Link
              to="/UploadMaterial"
              className="px-3 rounded"
              style={{
                position: "absolute",
                right: "0px",
                top: "10px",
                color: "white",
                backgroundColor: "green",
              }}
            >
              Upload Study Material
            </Link>
          </div>
          <hr />
          <form action="" method="post" onSubmit={handleSearchMaterial}>
            <MDBRow>
              {/* <div style={{ width:"100%",display: "flex", justifyContent: "space-between" }}> */}
              <MDBRow>
                <MDBCol>
                  <label htmlFor="cars">
                    Branch <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                    onChange={handleSelectBranch}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="comp">Computer</option>
                    <option value="mech">Mechanical</option>
                    <option value="civil">Civil</option>
                  </select>
                </MDBCol>
                <MDBCol>
                  <label htmlFor="cars">
                    Class <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                    onChange={handleSelectClass}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </MDBCol>

                <MDBCol>
                  <label htmlFor="cars">
                    Subject <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "200px" }}
                    onChange={handleSelectSubject}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="DSA">DSA</option>
                    <option value="AI">AI</option>
                    <option value="MI">Ml</option>
                    <option value="CS">CS</option>
                  </select>
                </MDBCol>
                <MDBCol>
                  <button className="py-1 px-4 mt-4" style={{}} type="submit">
                    Search
                  </button>
                </MDBCol>
              </MDBRow>
            </MDBRow>
          </form>
          <div className="" style={{}}>
            {studyMaterial.length >= 0 ? (
              <div
                className="mt-5"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {studyMaterial.map((item, i) => {
                  // console.log(item.name);
                  return (
                    <div
                      key={item._id}
                      className=" my-2 mx-2"
                      style={{
                        backgroundColor: "#e7ffed",
                        color: "green",
                        borderRadius: "7px",
                        border: "1px solid green",
                        display: "flex",
                      }}
                    >
                      <span
                        onClick={() => handlePDFClick(item)}
                        className="p-2 pdf"
                      >
                        {item.FileName}
                      </span>
                      <div className="p-2">
                        <AiIcons.AiFillDelete
                          color="red"
                          size={"1.5em"}
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            handleDeleteIconClick(item._id);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-5">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              {viewPdf ? (
                <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
              ) : (
                ""
              )}
            </Worker>
          </div>
        </div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showDeleteModel}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete document </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteOkClick}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
