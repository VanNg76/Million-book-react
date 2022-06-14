import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCategory } from "./CategoryManager";


export const CreateCategory = () => {
    const [form, updateForm] = useState({ name: "" })
    const history = useHistory()

    const submitCategory = (e) => {
        e.preventDefault()
        const newCategory = {
            name: form.name
        }
        createCategory(newCategory)
            .then(() => history.push(`/categories`))
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <input required type="text" id="name" className="form-control" placeholder="Category name"
                        value={form.name}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.name = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <div className="submitButton">
                <button className="submit-button"
                    onClick={(e) => {
                        submitCategory(e)
                        updateForm({ name: "" })
                    }}>
                Add Category</button>
            </div>
        </>
    )
}