import React from 'react';
import { Link } from 'react-router-dom';

export default function Navabar(){
    return(

        <nav className='nav-bar'>
            <div className="container-nav">
                <div className="brand">
                    <h2>IMGDb</h2>
                </div>
                <div>
                    <ul>
                        <li><Link to ="/signup" className="nav-item">Sign Up</Link></li>
                        <li><Link to ="/login" className="nav-item">Login</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}