import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useEffect, useRef, useState } from 'react';
const UploadImage = ({ getURL }) => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [ loading, setLoading ] = useState(false);
    const ref = useRef();
    const uploadImage = (event) => {
        if(!loading) {
            event.preventDefault();
            setLoading(true);
            const data = new FormData();
            if (image !== "") {
                data.append("file", image);
                data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
                data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
                fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                    method: "post",
                    body: data
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setUrl(data.secure_url);
                        setLoading(false);
                        ref.current.value = "";
                    })
                    .catch(err => {
                        setLoading(false);
                        ref.current.value = "";
                        console.log(err)})
            }    
        }   
    }
    useEffect(() => {
        getURL(url);
    }, [url])
    const handleChooseFile = () => {
        ref.current.click();
    }
    return (
        <>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} ref={ref} style={{ display: "none" }} />
            <ButtonGroup style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Button style={{ width: "50%" }} onClick={handleChooseFile}>{image?.name || "Choose image"}</Button>
                <Button color="primary" onClick={uploadImage} style={{ width: "50%" }} startIcon={!loading && <CloudUploadIcon/>} disabled={image?.name ? false : true }>{loading ? <CircularProgress size={25} /> : "Upload"}</Button>
            </ButtonGroup>
        </>


    )
}
export default UploadImage;