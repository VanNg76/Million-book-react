import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createAuthor } from "./AuthorManager";

export const CreateAuthor = () => {
    const [form, updateForm] = useState({ name: "" })
    const history = useHistory()

    const submitAuthor = (e) => {
        e.preventDefault()
        const newAuthor = {
            name: form.name
        }
        createAuthor(newAuthor)
            .then(() => history.push(`/authors`))
    }

    return (
        <form className="box">
            <div className="field">
                <input required type="text" id="name" className="input is-primary" placeholder="Author name"
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
                    submitAuthor(e)
                    updateForm({ name: "" })
                }}>
            Add Author</button>
        </form>
    )
}
