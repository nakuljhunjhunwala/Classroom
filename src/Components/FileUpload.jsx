import React,{useState,useEffect} from "react";
import "./FileUpload.css";
import db,{storage} from "../firebase";

function FileUpload({subID,setIsOn,subjectKey}) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errorDetail,setErrorDetail] = useState("");
  const [availableItem, setAvailableItem] = useState([])


useEffect(() => {
  setAvailableItem([]);
storage.ref(subID).listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
  });
  res.items.forEach(function(itemRef) {
setAvailableItem((availableItem => [...availableItem, itemRef.location.path]))
  });
}).catch(function(error) {
console.log(error.msg);
});
}, [selectedFile,subID])

  const handleUpload = () => {

if(selectedFile){

  if (availableItem.includes(`${subID}/${selectedFile.name}`)) {
    setErrorDetail("File Already Exist in Database")
  }else{
  document.getElementById("upload").style.display = "none";
  setErrorDetail("Do not close or refresh the page till done");

  const uploadTask = storage.ref(`${subID}/${selectedFile.name}`).put(selectedFile);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        document.getElementById('progress').style.opacity = 1;
        document.getElementById('progress-done').style.width = `${progress}%`;
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(subID)
          .child(selectedFile.name)
          .getDownloadURL()
          .then(url => {

            db.child(`classes/subjects/${subjectKey}/files`).push(
              {
                file_name:selectedFile.name,
                file_type:selectedFile.type,
                file_size:selectedFile.size,
                file_url:url,
              },
              (err) => {
                if (err) console.log(err);
              }
            );

          });

          document.getElementById("fileUpload_bgCover").style.display = "none";
          document.getElementById("upload").style.display = "inline";
          setErrorDetail("")
          setSelectedFile(null)
          document.getElementById('progress').style.opacity = 0;
          document.getElementById('progress-done').style.width = 0;
          document.getElementById("fileVisible").checked = 1;
                setIsOn(true);
          setProgress(0);
      }
    )}
}else{
setErrorDetail("Select the file first")
}
    
  };





  
  
  


  return (
    <div className="fileUpload_bgCover" id="fileUpload_bgCover">
      <div className="upload_container">
        <p className="close" onClick={()=>{
          document.getElementById("fileUpload_bgCover").style.display = "none";
        }}>x</p>
        <div className="form_heading">
          <h3>Upload Files</h3>
        </div>
    <div className="file_main">
    <input type="file" onChange={(e)=>{
        if (e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
        }
    }}/>
    </div>
    <div className="progress" id="progress">
  <div className="progress-done" id="progress-done">
    {progress}
  </div>
</div>
    <div className="file_bottom">
    <button className="upload" id="upload" onClick={handleUpload}>Upload</button>
   {
     errorDetail && (<h3 className="errorDetail">{errorDetail}</h3>)
   } 
    </div>
        

      </div>
    </div>
  );
}

export default FileUpload;
