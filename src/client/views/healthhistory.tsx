import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
const HealthHistory = () => {
    const [selectedDate, setSelectedDate] = useState<DailyExercise['date_string']>(null)
    const [exerciseDates, setExerciseDates] = useState<Array<DailyExercise>>(null)
    const [allDailyExercises, setAllDailyExercises] = useState<Array<DailyExercise>>(null)
    const [allWater, setAllWater] = useState<Array<WaterInput>>(null)
    const [allAddedExercises, setAllAddedExercises] = useState<Array<Exercise>>(null)

    console.log(selectedDate)
            let date = selectedDate
            
            console.log(date)

    useEffect(() => {
        
            if (date == null) {
                
            } else {
        try {
            
            apiService(`/api/dailyexercises/${date}`)
                .then(reply => {
                    setAllDailyExercises(reply)
                })

        } catch (error) {
            console.log(error)
        }
    }

    }, [selectedDate])

    useEffect(() => {
        try {
            apiService('/api/exercisedates')
                .then(reply => {
                    console.log(reply)
                    setExerciseDates(reply)
                })

        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService(`/api/water/${date}`)
                .then(reply => {
                    console.log(reply)
                    setAllWater(reply)
                })
        } catch (error) {
            console.log(error)
        }

    }, [selectedDate])

    useEffect(() => {
        try {
            apiService('/api/exercises')
                .then(reply => {
                    setAllAddedExercises(reply)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])


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
                    <s.Form.Label><h4>Displaying History from:</h4></s.Form.Label>
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
                <s.Tabs defaultActiveKey="myexercises" id="uncontrolled-tab-example" className='d-flex justify-content-center'>
                    <s.Tab eventKey="myexercises" title="Exercises">
                    <s.Row className='d-flex justify-content-center'>
                    
                                        {allAddedExercises?.map(tae => {
                                            return (
                                                <div className="card m-1" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black',
                                                    width: '36rem'
                                                }} key={tae.exerciseid}>
                                                    <iframe height='300px' style={{ maxWidth: '100%' }} src={tae.requiredequipment} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                    
                                                    <div className="card-body">
                                                        <h4 className="card-title">{tae.exercisename}</h4>
                                                        <h5 className='card-text'>Description</h5>
                                                        <p className="card-text">{tae.exercisedescription}</p>
                                                        <h5 className='card-text'>Equipment</h5>
                                                        <p className="card-subtext">{tae.demolink}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    
                                    </s.Row>
                    </s.Tab>
                    <s.Tab eventKey="myworkouts" title="Workouts">
                        <s.Row className='d-flex justify-content-center'>
                            <s.Table className='col-8' striped size="sm" variant="dark" style={{
                                backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                color: 'black'
                            }}>
                                <thead>
                                    <tr className="text-center">
                                        <th align='center' colSpan={3}><h3>Today's Exercises</h3></th>
                                    </tr>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {allDailyExercises?.map(tde => {
                                        return (
                                            <tr key={`exercise-id-${tde.insertid}-${tde.created}-${tde.exercisename}`}>
                                                <td>{tde.exercisename}</td>
                                                <td>{tde.completedsets}</td>
                                                <td>{tde.completedreps}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </s.Table>
                        </s.Row>
                    </s.Tab>
                    <s.Tab eventKey="mywater" title="Hydration">
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
                                        <th align='center' colSpan={3}><h3>Today's Exercises</h3></th>
                                    </tr>
                                    <tr>
                                        <th>Glasses</th>
                                        <th>When</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allWater?.map(aw => {
                                        return (
                                            <tr key={`water-id-${aw.waterid}-${aw.created}`}>
                                                <td>{aw.water}</td>
                                                <td>{aw.created}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </s.Table>
                        </s.Row>
                    </s.Tab>
                </s.Tabs>
                </s.Container>
        </>
    )
}

export default HealthHistory;