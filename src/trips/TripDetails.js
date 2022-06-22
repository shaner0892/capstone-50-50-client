import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import SimpleImageSlider from "react-simple-image-slider";
import { Button } from "reactstrap";
import { deleteTrip, getSingleTrip } from "./TripManager";
import { getTripPictures } from "../pictures/PictureManager";
import { getCurrentUser } from "../users/UserManager";


export const TripDetails = () => {
    //use the useState hook function to set the initial value of the new object
    const [trip, setTrip] = useState({})
    const [tripPictures, setTripPictures] = useState([])
    const [user, setUser] = useState({})
    const history = useHistory()
    const {tripId} = useParams()

    useEffect(
        () => {
            getSingleTrip(tripId)
                .then(setTrip)
            getTripPictures(tripId)
                .then(setTripPictures)
            getCurrentUser()
                .then(setUser)
        },
        []
    )
    //define a function to delete a trip
    //invoke the DELETE method and then fetch the new list of trips
    const removeTrip = (id) => {
        deleteTrip(id)
            .then(()=> {
                history.push(`/my-trips`)
            })
    }
    
    return (
        <>
        <section className="singleTrip" key={`trip--${trip.id}`}> 
        <h2>Trip to {trip.state?.name}</h2>
        {/* display trip images with slider */}
            { tripPictures.length > 0 ? <div className="tripPics">
                <SimpleImageSlider
                    width={700}
                    height={700}
                    images={tripPictures}
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}
                />
                </div> : ""
            }
            <div><b>Who:</b> {trip.fifty_user?.user?.first_name}</div>
            <div><b>Where:</b> {trip.city}, {trip.state?.name} </div>
            <div><b>When:</b> {trip.start_date} to {trip.end_date}</div>
            <div><b>What:</b> {trip.about} </div>
            <div><b>Activities:</b>
            {
                trip.activities?.length > 0 ? trip.activities?.map(a => <li>{a.title}</li>) : " No activities added"
            }
            </div>
            {/* display trip rating with stars component */}
            <div><b>Rating:</b>
                <ReactStars 
                    count={5}
                    edit={false}
                    value={trip.rating}
                    size={24}
                    activeColor="#ffd700"
                />
            </div>
            {
                trip.fifty_user?.id === user.id ? <div>
                <Button id="btn" color="success" outline onClick={() => history.push(`/edit-trip/${trip.id}`)}>Edit Trip</Button>
                <Button id="btn" color="warning" outline onClick={() => {removeTrip(trip.id)}}> Delete Trip </Button></div >
                : ""
            }
        </section>
        </>
    )
}
