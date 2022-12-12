import React from 'react';

export default function Navabar(){
    return(
        <nav className='nav-bar'>
            <div className="container-nav">
                <div className="brand">
                    <h2>IMGDb</h2>
                </div>
                <div>
                    <ul>
                        <li><a href="#" className="nav-item">Sign Up</a></li>
                        <li><a href="#" className="nav-item">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}