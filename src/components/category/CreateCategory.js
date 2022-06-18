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
        <form className="box">
            <div className="field">
                <input required type="text" id="name" className="input is-primary" placeholder="Category name"
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

            <button className="button is-dark"
                onClick={(e) => {
                    submitCategory(e)
                    updateForm({ name: "" })
                }}>
            Add Category</button>
        </form>
    )
}