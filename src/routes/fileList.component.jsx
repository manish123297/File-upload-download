import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../utils/constants";

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // This useEffect() is used to get the Alldata from database
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  //

  const downloadFile = async (id, path, mimetype) => {
    // id->fileid
    // path->filepath in backend
    // mimetype:type of file
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      });

      //   Inside the downloadFile function, we're making call to the /download/:id API.
      //   Note that, we're setting the responseType to blob. This is very important otherwise
      //    you will not get the file in the correct format.

      const split = path.split("/"); //spliting the path value about '/'
      const filename = split[split.length - 1];
      setErrorMsg("");
      //   parameters for download:
      // filepath-> Path to the file.
      // “downloaded-book.png” -> Alternate name for the file when a user downloads it. (optional)
       //   filetype
      // (err) => {} -> Error callback. (optional)
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div >
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table" style={{ marginLeft:"86px", marginTop:"80px",backgroundColor: "#ece6e6bf" ,width:"90%"}}>
        <thead style={{ backgroundColor: "#a1a1d3",width:"90%",height:"80px" ,fontSize:"1.4rem"}}>
          <tr style={{ backgroundColor: "#a1a1d3",width:"90%", }}>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id} style={{ border:"1px solid #111010",width:"90%",height:"50px",fontSize:"1.1rem" }}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr style={{ backgroundColor: "red",width:"90%",height:"50px",fontSize:"1.1rem" }}>
              <td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
