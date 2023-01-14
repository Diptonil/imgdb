import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './home';
import Signup from './signup';
import Login from './login';
import MovieDesc from './moviedesc'


export default function App(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={ <Login />} />
                    {/* link address for each movie page to be figured out */}
                    <Route path={"/moviedesc/:id"} element={ <MovieDesc />} />
                </Routes>
            </Router>
        </div>
      );
}
