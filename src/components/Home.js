import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <h1 className="title is-3 mt-6 ml-4">Welcome to
                <strong className="has-text-underlined has-text-link">
                    Book-Millions</strong> store !
            </h1>
            <p className="ml-4">Click <Link className="is-underlined" to="./books">here</Link>
                 to start browsing millions books.</p>
        </>
    )
}