import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../types';
import { apiService, TOKEN_KEY } from '../front-utils/apiService'
import * as s from 'react-bootstrap'
import Swal from 'sweetalert2'
import PrivateRoute from '../components/privateRoute';
import withReactContent from 'sweetalert2-react-content'
import { v4 as uuidv4 } from 'uuid';
import { aDaysUserData, Exercise, Journal, FoodImages, DailyExercise, Note, WaterInput } from '../../../types'
const CronJob = require("cron").CronJob;
const MySwal = withReactContent(Swal)
const Entries = () => {
    const [aDaysUserData, setADaysUserData] = useState<aDaysUserData>(null)
    const [selectedDate, setSelectedDate] = useState<String>(null)

    // Run at midnight every night
    const cronExpression = "00 00 * * *";

    const timeZone = "America/Chicago";

    const cronJob = new CronJob(
        cronExpression,
        cronFunction,
        null,
        true,
        timeZone
    );

    function cronFunction() {
        console.log("cronFunction: Running....");
        /* Do whatever you wish here... */
    }

    useEffect(() => {

        if (selectedDate == null) {

        } else {
        try {
            console.log(selectedDate)
            apiService(`/apitoday/todayscompile/${selectedDate}`)
                .then(reply => {

                    setADaysUserData(reply)
                    console.log(reply)
                })
        } catch (error) {
            console.log(error)
        }
    }
    }, [selectedDate])
    return (
        <>
            <s.Container fluid>
            <s.Row className='d-flex justify-content-center'>
            <s.Form className='col-lg-6 col-md-8 col-sm-10 rounded shadow m-4' style={{
                backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <s.Form.Group controlId="exercise selector" className="text-center">
                    <s.Form.Label><h4>Displaying Entry from:</h4></s.Form.Label>
                    <s.Form.Control as='input' type='date' style={{
                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderColor: 'black'
                    }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)} defaultValue={Date()}>
                        
                    </s.Form.Control>
                </s.Form.Group>
                </s.Form>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-sm-12'>
                    
                        <s.Table striped bordered hover size="sm" variant="dark" style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            color: 'black'
                        }}>
                            <thead>
                                <tr className="text-center">
                                    <th align='center' colSpan='3'><h3>Completed Exercises</h3></th>
                                </tr>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aDaysUserData?.completedexercises?.map(ce => {
                                    return (
                                        <tr key={uuidv4()}>
                                            <td>{ce.exercisename}</td>
                                            <td>{ce.completedsets}</td>
                                            <td>{ce.completedreps}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </s.Table>
                    </div>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                <div className='col-lg-8 col-md-10 col-sm-12 text-center'>
                    <h4>Notes</h4>
                    {aDaysUserData?.completednotes?.map(cn => {
                        return (
                            <>
                                <div className="col-md-12 col-lg-12 col-sm-12 p-1" key={uuidv4()}>
                                    <div className="card shadow my-2" style={{
                                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderColor: 'black'
                                    }}>
                                        <div className="card-body text-center">
                                            <h4 className='card-title'>{cn.topic}</h4>
                                            <p className='card-text'>{cn.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-sm-12 text-center justify-content-center'>
                    <h4>Journal</h4>
                        {aDaysUserData?.completedjournals?.map(cj => {
                            return (
                                
                                    
                                        <div className="card shadow my-2" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} key={uuidv4()}>
                                            <div className="card-body text-center">
                                                <h4 className='card-title'>{cj.title}</h4>
                                                <p className='card-text'>{cj.content}</p>
                                            </div>
                                        </div>
                                    
                                
                            )
                        })}
                    </div>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-sm-12 d-flex text-center justify-content-center'>
                    <h4>Food Images</h4>
                        {aDaysUserData?.consumedfood?.map(cf => {
                            return (
                                <>
                                    <s.Card className="shadow my-2 p-1" style={{
                                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderColor: 'black',
                                        width: '18rem'
                                    }} key={uuidv4()}>
                                        <s.Card.Img variant="top" src={`${cf.image}`} />
                                        <s.Card.Body className='text-center'>
                                            <s.Card.Title>{cf.imagename}</s.Card.Title>
                                        </s.Card.Body>
                                    </s.Card>
                                </>
                            )
                        })}
                    </div>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                    
                    <s.Table className='col-8'striped size="sm" variant="dark" style={{
                                backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                color: 'black'
                            }}>
                                <thead>
                                    <tr className="text-center">
                                        <th align='center' colSpan='3'><h3>Hydration</h3></th>
                                    </tr>
                                    <tr>
                                        <th>8oz Glasses of Water</th>
                                        <th>Recorded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aDaysUserData?.consumedwater?.map(cw => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td>{cw.water}</td>
                                                <td>{cw.created}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </s.Table>
                    
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                    <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center inline-block'>
                        {aDaysUserData?.addedexercises?.map(ae => {
                            return (
                                <>
                                    <div className="card m-1" style={{
                                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderColor: 'black',
                                        width: '28rem'
                                    }} key={uuidv4()}>
                                        <iframe height='300px' style={{ maxWidth: '100%' }} src={ae.requiredequipment} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        <div className="card-body">
                                            <h5 className="card-title">{ae.exercisename}</h5>
                                            <p className="card-text">{ae.exercisedescription}</p>
                                            <p className="card-subtext">{ae.demolink}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </s.Row>
            </s.Container>
        </>
    )
}

export default Entries;