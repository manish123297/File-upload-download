import { useState,useRef } from "react";
// useRef=> It can be used to store a mutable value that does not cause a re-render when updated.
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from "../utils/constants";

const Form = () => {
  // --------------drag &drop---------------------
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage

  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef();
//   999999999999999999999999999999999[onDrop]---------------------------

const onDrop = (files) => {
  // this function is going to run each time we will upload some file
    const [uploadedFile] = files; //uploadedFile is the file that i have uploaded
    setFile(uploadedFile);
  // 000000000000000[to read the file]000000000
    const fileReader = new FileReader(); //this FileReader Api is needed to read the file
    fileReader.onload = () => {
      // fileReader.result->The FileReader result property returns the file's contents.
      //  This property is only valid after the read operation is complete, 
      // and the format of the data depends on which of the methods was used to 
      // initiate the read operation.
      setPreviewSrc(fileReader.result);
      // The result of the read operation
      //  will be available in the result property of the fileReader which we're 
      // assigning to the previewSrc state variable.
    };
    // 0000000000000000000000000000000000000000
    fileReader.readAsDataURL(uploadedFile);
    // The readAsDataURL method is used to read the contents of the
    //  specified Blob or File. When the read operation is finished,
    //  the readyState becomes DONE, and the loadend is triggered. At that time,
    //  the result attribute contains the data as a data: URL representing the file's
    //  data as a base64 encoded string.
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };
// 99999999999999999999999999999999999
  // --------------------------------------------
  const [state, setState] = useState({ title: "", description: "" });
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // console.log(e)
    // 33333333333333333[Calling Api To save Data]3333333333333333333333333333333333333333
    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();

          // The FormData interface provides a way to construct a set of key/value pairs 
          // representing form fields and their values, which can be sent using the fetch() 
          // or XMLHttpRequest.send() method. It uses the same format a form would use if the 
          // encoding type were set to "multipart/form-data".
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
  
          setErrorMsg('');
          await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
            // mentioning the content type of multipart/form-data is very important 
            // otherwise the file will not be sent to the server.
          });
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
    // 3333333333333333333333333333333333333333333333333333333333333333333333333333333333333 
  };
  console.log(errorMsg)
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          style={{
            width: "450px",
            border: "1px solid grey",
            marginTop: "20px",
            height: "30px",
          }}
          placeholder="Enter title"
          name="title"
          value={state.title || ""}
          onChange={handleInputChange}
        ></input>

        <br />
        <input
          style={{
            width: "450px",
            border: "1px solid grey",
            marginTop: "20px",
            height: "30px",
          }}
          placeholder="Enter description"
          name="description"
          value={state.description || ""}
          onChange={handleInputChange}
        ></input>
        <br></br>
        <div>
{/*------------------------------------ drag and drop--------------------------------------------  */}
          <div className="upload-section" style={{backgroundColor:"#80808045",padding:"20px",margin:"50px 300px",fontSize:"2rem"}}>
            {/* DropZone-------------------------------------- */}
            <Dropzone onDrop={onDrop} >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  ref={dropRef}
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {/* -------------------------------------------------------- */}
            {/* ---------------preview Area---------------------------- */}
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className="image-preview" >
                  <img
                  style={{width:"200px",height:"200px"}}
                    className="preview-image"
                    src={previewSrc}
                    alt="Preview"
                  />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )}
          {/* ------------------------------------------------- */}
          </div>
{/* --------------------------------------------------------------------------------------------------*/}
        </div>
        <button
          type="submit"
          style={{
            color: "whitesmoke",
            backgroundColor: "darkblue",
            width: "250px",
            border: "1px solid grey",
            marginTop: "20px",
            height: "38px",
          }}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
