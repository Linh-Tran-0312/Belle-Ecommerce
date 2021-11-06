import React, { useState, useEffect } from 'react'
const UploadImage = ({getURL}) => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const uploadImage = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ldupxrel");
        data.append("cloud_name", "linh-cloudinary-img");
        fetch("https://api.cloudinary.com/v1_1/linh-cloudinary-img/image/upload", {
            method: "post",
            body: data
        }) 
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.secure_url);
                console.log(data.secure_url);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getURL(url);
    },[url])
    return (
       
            <div style={{width: "100%", display: "flex", justifyContent:"center"}}>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button onClick={uploadImage}>Upload</button>
            </div>
      
    )
}
export default UploadImage;