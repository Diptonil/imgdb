import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './home';
import Layout from './Layout'
import Signup from './signup';
import Login from './login';
import MovieDesc from './moviedesc'
import RequireAuth from './RequireAuth';


export default function App(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="login" element={ <Login />} />
                    {/* link address for each movie page to be figured out */}
                    <Route path={"moviedesc/:id"} element={ <MovieDesc />} />
                    

                    {/* Protected routes */}
                    <Route element={<RequireAuth/>}>
                        
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
