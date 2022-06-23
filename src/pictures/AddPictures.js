import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import UploadImages from "./PhotoUpload";
import "./Picture.css"

// when a user adds or edits a trip they are given the option to upload photos for that trip

export const AddPictures = () => {
    //use the useState hook function to set the initial value
    const history = useHistory()
    const { tripId } = useParams()

    //useState hook function sets the initial value of tripPicture to the defined properties, set is a function you invoke later on to modify the values
    const [tripPicture, setTripPicture] = useState({
        trip: tripId,
        image_url: ""
    });
    
    //this will be the form you display, you need to capture user input and save to new object
    // invoke the upload images pop up, set tripPic to true so 
    return (
        <form className="tripPictureForm">
            <h2 className="tripPictureForm__title">Add Pictures from Your Trip</h2>
            <div className="form-group">
                <UploadImages isTripPicture={true} obj={tripPicture} update={setTripPicture} />
                <Button id="bottomBtn" color="success" outline onClick={() => history.push(`/trip-details/${tripId}`)} >Finish</Button><br></br>
            </div>
        </form>
    )
}
