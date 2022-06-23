import React, { useState } from "react"
import { Button } from "reactstrap"
import { postTripPicture } from "./PictureManager"


export default function UploadImages({isTripPicture, obj, update}) {
    const [uploadedImages, setUploadedImages] = useState("")

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = {...obj}
            copy.url = resultEvent.info.secure_url
            update(copy)
            setUploadedImages(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
            // if it is a trip picture it needs to be posted each time since multiple pictures can be added
            if (isTripPicture) {
                postTripPicture(copy)
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
            <Button id="topBtn" color="success" outline type="file" onClick={showWidget} >Browse</Button>
            <p>{uploadedImages ? "Photo(s) added" : ""}</p>
        </>
    )
}