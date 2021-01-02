import React from 'react';
import "./FilePreview.css"

function FilePreview({fileName,fileType,fileSize,url}) {
    return (
        <div className="file_box" onClick={()=>{
            window.open(url);
        }}>
       <div className="inner_file_box">
        <span className="file_name">{fileName}</span>
       </div>
       <span className="file_type">{fileType}</span>
       <span className="file_size">{fileSize} kb</span>
     </div>
    )
}

export default FilePreview
