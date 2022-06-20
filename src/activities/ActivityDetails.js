import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { deleteActivity, getActivities, getSingleActivity } from "./ActivityManager";
import "./Activity.css"
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { getCurrentUser } from "../users/UserManager";
import { getReviews } from "../reviews/ReviewManager";
import { EditActivity } from "./EditActivity";


export const ActivityDetails = () => {
    //use the useState hook function to set the initial value of the new object
    const [activity, setActivity] = useState({})
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const {activityId} = useParams()
    const [user, setUser] = useState({})
    
    useEffect(
        () => {
            getSingleActivity(activityId)
                .then(setActivity)
            getReviews(activityId)
                .then(setReviews)
            getCurrentUser()
                .then(setUser)
        },
        []
    )
    //define a function to delete a dog from the user's profile
    //invoke the DELETE method from ApiManager and then fetch the user's new list of dogs
    const removeActivity = (id) => {
        deleteActivity(id)
            .then(() => history.push(`/all-activities`))
    }
    
    return (
        <>
            <section className="activityProfile" key={`activity--${activity.id}`}> 
                <h4><b>{activity.title}</b> </h4>
                    <div>Location: {activity.city}, {activity.state?.postal_abbreviation}</div>
                    <div>Category: {activity.category?.name}</div>
                    <div>Average Rating: 
                        <ReactStars 
                            className="stars"
                            count={5}
                            edit={false}
                            value={activity.average_rating}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>
            </section>
            <button id="btn" outline className="btn btn-addReview" onClick={() => history.push(`/review-activity/${activity.id}`)} >Review This Activity</button>
            {/* if staff, allow them to delete the activity */}
            {
                user.user?.is_staff ? <div>
                    <button id="btn" outline className="btn btn-deleteActivity" onClick={() => removeActivity(activity.id)} >Delete This Activity</button>
                </div> : ""
            }
            {/* display reviews here */}
            <section className="reviews">
                {
                    reviews.map((r) => {
                        return <div className="review">"{r.review}"
                            <ReactStars 
                                className="stars"
                                count={5}
                                edit={false}
                                value={r.rating}
                                size={24}
                                activeColor="#ffd700"
                            />
                            {
                                <div>From: {r.fifty_user?.user?.username}</div>
                            }
                        </div>
                    })
                }
            </section>

        </>
    )
}
