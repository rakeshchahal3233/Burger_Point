import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className='container'>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
                    <span className="text-muted">© 2024 Burger Point, Inc</span>
                </div>
                <div className="col-md-4 text-end"> {/* Add Bootstrap class text-end for right alignment */}
                    <span className="text-muted">Rakesh Chahal</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer