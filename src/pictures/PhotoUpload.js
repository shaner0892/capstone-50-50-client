import React, { useState } from "react"
import { postTripPicture } from "./PictureManager"
// import { Button } from "reactstrap"

export default function UploadImages({isTripPicture, obj, update}) {
    // change this to an array
    const [uploadedImages, setUploadedImages] = useState("")

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = {...obj}
            copy.url = resultEvent.info.secure_url
            console.log(copy)
            update(copy)
            setUploadedImages(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
            if (isTripPicture){
                postTripPicture(copy)
            } else {
                
            }
        }
    }

    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({cloudName: "dfxsl6a2c", uploadPreset: "tb942fag"}, (error, result) => {checkUploadResult(result)})
        widget.open()
    }

    return (
        <>
            <button id="uploadBtn" type="file" onClick={showWidget} >Browse</button>
            {/* {
                uploadedImages.map((img) => {return {img}} )
            } */}
            <p>{uploadedImages ? "Photos added" : ""}</p>
        </>
    )
}