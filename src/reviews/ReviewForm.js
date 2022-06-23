import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button } from "reactstrap";
import { getSingleActivity } from "../activities/ActivityManager";
import { postReview } from "./ReviewManager";


export const ReviewActivity = () => {
    //use the useState hook function to set the initial values
    const [activity, setActivity] = useState({})
    const [rating, setRating] = useState({})
    const {activityId} = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getSingleActivity(activityId)
                .then(setActivity)
        },
        []
    )

    //useState hook function sets the initial value of the review to the defined properties, set is a function you invoke later on to modify the values
    const [review, setReview] = useState({
        activity: activityId,
        rating: 0,
        review: ""
    });
    
    //this updates the state as the user makes changes
    const updateReviewState = (evt) => {
        const newReview = Object.assign({}, review)
        newReview[evt.target.name] = evt.target.value
        setReview(newReview)
    }

    // this sets the rating; could not set evt.target.name to rating inside the stars component
    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    // when the user hits submit, POST the new activity and reroute to the details page
    const addNewReview = (evt) => {
        //capture the event and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newReview = {
            activity: activityId,
            rating: rating,
            review: review.review
        }
        postReview(newReview)
            .then(() => history.push(`/activity-details/${activityId}`))
    }
    
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripForm">
            <h2 className="tripForm__title">Add a Review for {activity.title}</h2>
            <fieldset>
                <div className="form-group">
                    <h4 htmlFor="review">Review: </h4>
                    <textarea id="form-review" cols="40" rows="5"
                        type="text" name="review" 
                        className="form-control"
                        placeholder="Tell us what you thought"
                        onChange={updateReviewState} >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <h4 htmlFor="rating">Rating: </h4>
                    <ReactStars 
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        />
                </div>
            </fieldset>
            <div>
                <Button id="btn" color="success" outline className="btn btn-addTrip" onClick={addNewReview} >Next</Button>
            </div>
        </form>
    )
}
