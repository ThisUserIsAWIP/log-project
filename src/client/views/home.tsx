import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../types';
import { apiService, TOKEN_KEY } from '../front-utils/apiService'
import * as s from 'react-bootstrap'
import Swal from 'sweetalert2'
import PrivateRoute from '../components/privateRoute';
import withReactContent from 'sweetalert2-react-content'
import { Exercise, Journal, FoodImages, DailyExercise, Note, WaterInput } from '../../../types'
const MySwal = withReactContent(Swal)
const Home = () => {

    return (
        <>
            <s.Container fluid>
                
                    <s.Row className='d-flex justify-content-center'>
                        <div className="col-10 m-5">
                            <header className="rounded text white text-center p-4" style={{
                                backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                <h1>Captain's Log</h1>
                                <hr />
                                <h3>The journal for growth</h3>
                            </header>
                        </div>
                    </s.Row>
                    <s.Row className='d-flex justify-content-center'>
                        <div className='col-9 mb-5 rounded p-4' style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>


                            <div className='text-center'>
                                <h5>
                                    Captain's Log offers a simplistic way to keep track of your journey, whether it be notes, journal entries, your exercise routine,
                                    or your diet we've got you covered. Start experiencing growth, start keeping track - Captain's Log.
                        </h5>
                            </div>
                        </div>

                    </s.Row>
                    <s.Row className='d-flex justify-content-center'>
                        <div className='col-9 mb-5 rounded p-4' style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>


                            <div className='text-center'>
                                <h5>
                                    Click <Link to='/register'>here to register</Link> or click one of the buttons below to register or login to an account. Happy Logging!
                        </h5>
                        <s.ButtonGroup size="lg" className="mb-2">
    <Link to='/register'><s.Button>Register</s.Button></Link>
    <Link to='/login'><s.Button>Login</s.Button></Link>
    
  </s.ButtonGroup>
                            </div>
                        </div>

                    </s.Row>
            </s.Container>
        </>
    )
}

export default Home;