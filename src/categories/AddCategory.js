import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { getCategories, postCategory } from "./CategoryManager";

// this page is only viewable by staff

export const AddCategory = () => {
    //use the useState hook function to set the initial value of the new object
    const [categories, setCategories] = useState([])
    const history = useHistory()
    
    useEffect(
        () => {
            getCategories()
                .then(setCategories)
        },
        []
    )
    
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [category, setCategory] = useState({
        name: "",
    });

    const updateCategory = (evt) => {
        const newCategory = Object.assign({}, category)
        newCategory[evt.target.name] = evt.target.value
        setCategory(newCategory)
    }

    const addNewCategory = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newCategory = {
            name: category.name
        }
        postCategory(newCategory)
            .then(()=>
                getCategories()
                    .then(setCategories))
    }
    

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="categoryForm">
            <fieldset>
                <div className="form-group">
                    <label> Add a New Category: </label>
                    <input name="name" className="form-control"
                        onChange={updateCategory}
                        /> 
                    </div>
            </fieldset>
            <div>
                <button id="btn" outline className="btn btn-addCategory" onClick={addNewCategory} >Add Category</button>
            </div>
        </form>
        <label>Category List</label> 
        {
            categories.map((c) => <ul>{c.name}</ul>)

        }
        </>
    )
}
