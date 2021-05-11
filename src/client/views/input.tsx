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
import { v4 as uuidv4 } from 'uuid';
import { Exercise, Journal, FoodImages, DailyExercise, Note, WaterInput } from '../../../types'

const MySwal = withReactContent(Swal)
const Input = () => {
    // Global Variables
    const [showAllExerciseModal, setShowAllExerciseModal] = useState(false);
 
    const handleAllExerciseModalShow = () => {
        setShowAllExerciseModal(true)
        
    };
    let history = useHistory()

    // ADD NEW EXERCISE

    // All exercises from all users
    const [allExercises, setAllExercises] = useState<Array<Exercise>>();
    // Selected exercise from all
    const [selectedGlobalExerciseid, setSelectedGlobalExerciseid] = useState<Exercise['exerciseid']>()
    // Variable to store existing exercises
    const [exercises, setExercises] = useState<Array<Exercise>>();
    // Collects the name of the new exercise
    const [newExerciseName, setNewExerciseName] = useState<Exercise['exercisename']>();
    // Collects the description of the new exercise
    const [newExerciseDescription, setNewExerciseDescription] = useState<Exercise['exercisedescription']>();
    // Collects the required equipment of the new exercise
    const [newRequiredEquipment, setNewRequiredEquipment] = useState<Exercise['requiredequipment']>();
    // Collects the demolink of the new exercise
    const [newDemoLink, setNewDemoLink] = useState<Exercise['demolink']>();
    // New exercises you added today
    const [todaysAddedExercises, setTodaysAddedExercises] = useState<Array<Exercise>>(null)
    // Object to trigger new gets for selectable exercises on add
    // Also passed to apiService for our POST
    let newExerciseData = {
        exercisename: newExerciseName,
        exercisedescription: newExerciseDescription,
        requiredequipment: newRequiredEquipment,
        demolink: newDemoLink
    }
    // Add a new exercise to your profile
    const NewExerciseClick = (e: React.MouseEvent<HTMLButtonElement>) => {


        try {
            apiService('/api/exercises', "POST", newExerciseData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added exercise!')
                    }
                })
        } catch (error) {
            console.log(error)
        }



    }

    // Collects the name of the new exercise
    const [newGlobalExerciseName, setNewGlobalExerciseName] = useState<Exercise['exercisename']>();
    // Collects the description of the new exercise
    const [newGlobalExerciseDescription, setNewGlobalExerciseDescription] = useState<Exercise['exercisedescription']>();
    // Collects the required equipment of the new exercise
    const [newGlobalRequiredEquipment, setNewGlobalRequiredEquipment] = useState<Exercise['requiredequipment']>();
    // Collects the demolink of the new exercise
    const [newGlobalDemoLink, setGlobalNewDemoLink] = useState<Exercise['demolink']>();
    // New exercises you added today

    let newGlobalExerciseData = {
        exercisename: newGlobalExerciseName,
        exercisedescription: newGlobalExerciseDescription,
        requiredequipment: newGlobalRequiredEquipment,
        demolink: newGlobalDemoLink
    }
    // Add a new exercise to your profile
    const NewGlobalExerciseClick = (e: React.MouseEvent<HTMLButtonElement>) => {


        try {
            apiService('/api/exercises', "POST", newGlobalExerciseData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added exercise!')
                    }
                })
        } catch (error) {
            console.log(error)
        }



    }

    const handleClose = () => setShowAllExerciseModal(false);

    const GlobalAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let id = selectedGlobalExerciseid

        try {

            apiService(`/api/exercises/${id}`)
                .then(reply => {
                    console.log(reply)
                    setExercises(reply)
                })

        } catch (error) {
            console.log(error)

        }
    }

    // Add an exercise from global






    // RECORD EXERCISE COMPLETION

    // Captures the selected exercise for imputting sets & reps
    const [selectedExerciseID, setSelectedExerciseID] = useState<Exercise['exerciseid']>();
    // Sets of the selected exercise
    const [completedSets, setCompletedSets] = useState<Number>();
    // Reps within each set
    const [completedReps, setCompletedReps] = useState<Number>();
    // Todays completed exercises
    const [todaysDailyExercises, setTodaysDailyExercises] = useState<Array<DailyExercise>>(null)
    // Object to POST a completedexercise
    let completedExerciseData = {
        exerciseid: selectedExerciseID,
        completedsets: completedSets,
        completedreps: completedReps
    }
    // Complete an exercise
    const CompletedExerciseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(completedExerciseData)
        try {
            apiService('/api/dailyexercises', "POST", completedExerciseData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully recorded exercise!')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    // Post a FoodImage


    // the title/name/caption of food image
    const [imageName, setImageName] = useState<FoodImages['imagename']>();
    // the content of the journal  you'd like to posts
    const [imageLink, setImageLink] = useState<FoodImages['image']>();
    // todays water consumption
    const [water, setWater] = useState<WaterInput['water']>()
    // containing todays water consumption
    const [todaysWater, setTodaysWater] = useState<Array<WaterInput>>()
    // containing today's food Images
    const [todaysFoodImages, setTodaysFoodImages] = useState<Array<FoodImages>>()
    // Object to POST a FoodImage
    let foodImageData = {
        imagename: imageName,
        image: imageLink
    }
    // Object to POST a drink
    let waterData = {
        water: water
    }
    // Post a foodimage
    const PostFoodImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            apiService('/api/foodimages', "POST", foodImageData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added image!')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    const PostWaterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            apiService('/api/water', "POST", waterData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added water!')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }


    // Post a Note


    // the topic of the note you'd like to post
    const [noteTopic, setNoteTopic] = useState<Note['topic']>();
    // the content of the note  you'd like to post
    const [noteContent, setNoteContent] = useState<Note['content']>();
    // containing todays notes
    const [todaysNotes, setTodaysNotes] = useState<Array<Note>>(null);
    // Object to POST a note
    let noteData = {
        topic: noteTopic,
        content: noteContent,
    }
    // Post a note
    const PostNoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(completedExerciseData)
        try {
            apiService('/api/notes', "POST", noteData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added note!')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    // Post a Journal


    // the title of the journal you'd like to post
    const [journalTitle, setJournalTitle] = useState<Journal['title']>();
    // the content of the journal  you'd like to posts
    const [journalContent, setJournalContent] = useState<Journal['content']>();
    // containing todays journals
    const [todaysJournals, setTodaysJournals] = useState<Array<Journal>>(null)
    // Object to POST a journal
    let journalData = {
        title: journalTitle,
        content: journalContent
    }
    // Post a Journal
    const PostJournalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            apiService('/api/journal', "POST", journalData)
                .then(reply => {
                    if (reply.sqlMessage) {
                        alert(reply.sqlMessage)
                    } else if (reply.affectedRows >= 1) {
                        alert('Successfully added journal!')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    // On Page Load

    // Fill the selector for Completed Exercise
    useEffect(() => {
        try {
            apiService('/api/exercises')
                .then(reply => {
                    setExercises(reply)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/getallexercises')
                .then(reply => {
                    setAllExercises(reply)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todaysdailyexercises')
                .then(reply => {
                    setTodaysDailyExercises(reply)
                })
                .then(reply => console.log(reply))
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todaysexercises')
                .then(xRes => {
                    setTodaysAddedExercises(xRes)
                    console.log(todaysAddedExercises)
                    console.log(xRes)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todaysfoodimages')
                .then(reply => {
                    setTodaysFoodImages(reply)
                })
                .then(reply => console.log(todaysFoodImages))
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todaysjournal')
                .then(reply => {
                    setTodaysJournals(reply)
                })
                .then(reply => console.log(todaysJournals))
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todaysnotes')
                .then(noteRes => {
                    setTodaysNotes(noteRes)
                    console.log(noteRes)
                    console.log(todaysNotes)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            apiService('/apitoday/todayswater')
                .then(reply => {
                    setTodaysWater(reply)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])






    // Page render

    return (

        <s.Container fluid>
            <s.Row >
                <s.Col>
                    {/* tabs with various inputs */}
                    <s.Tabs defaultActiveKey="notes" variant="pills" className='d-flex justify-content-center' id="inputTabs">
                        {/* exercise parent tab */}
                        <s.Tab eventKey="exercise" href='#exercises' title="Exercise">
                            <s.Tabs defaultActiveKey="recordExercise" variant="pills" className='d-flex justify-content-center' id="exerciseTabs">
                                {/* new exercise child tab */}
                                <s.Tab eventKey="Exercise" href='#newexercise' title="New Exercise">
                                    <s.Row className="d-flex justify-content-center">
                                        <s.Form className='col-lg-8 border rounded shadow mt-4 pb-2' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                            <s.Form.Group controlId="newExerciseName" className="text-center">
                                                <s.Form.Label><h4>Exercise Name</h4></s.Form.Label>
                                                <s.Form.Control as="textarea" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExerciseName(e.target.value)} rows={3} />
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <s.Form.Group controlId="newExerciseDescription" className="text-center">
                                                <s.Form.Label><h4>Exercise Description</h4></s.Form.Label>
                                                <s.Form.Control as="textarea" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExerciseDescription(e.target.value)} rows={5} />
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <s.Form.Group controlId="newExerciseEquipment" className="text-center">
                                                <s.Form.Label><h4>Required Equipment</h4></s.Form.Label>
                                                <s.Form.Control as="textarea" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRequiredEquipment(e.target.value)} rows={5} />
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <s.Form.Group controlId="NewExerciseDemo" className="text-center">
                                                <s.Form.Label><h4>Exercise Demo Link</h4>(An embed link)</s.Form.Label>
                                                
                                                <s.Form.Control as="textarea" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemoLink(e.target.value)} rows={3} />
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <div className="d-flex justify-content-end">
                                                <s.Button onClick={NewExerciseClick} type="Submit">Add Exercise</s.Button>
                                            </div>
                                        </s.Form>
                                    </s.Row>
                                    {/* <s.Button variant="primary" onClick={() => setShowAllExerciseModal(true)}>Select an exercise </s.Button>

                                        <s.Modal
                                            size='lg'
                                            show={showAllExerciseModal}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                            centered
                                        >
                                            <s.Modal.Header style={{ textAlign: 'center' }} closeButton>
                                                <s.Modal.Title>Global Exercises</s.Modal.Title>
                                            </s.Modal.Header>
                                            <s.Modal.Body>
                                                <div className='row d-flex justify-content-center'>
                                                    {allExercises?.map(ae => {
                                                        return (
                                                            <div className="card col-lg-5 m-1" style={{ width: '36rem' }} key={ae.exerciseid}>
                                                                <video style={{ maxWidth: '100%' }} src={ae.requiredequipment} controls></video>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{ae.exercisename}</h5>
                                                                    <p className="card-text">{ae.exercisedescription}</p>
                                                                    <p className="card-subtext">{ae.demolink}</p>
                                                                    <s.Button value={ae.exerciseid} key={ae.exerciseid} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                                        e.preventDefault()
                                                                        setSelectedGlobalExerciseid(Number(ae.exerciseid))
                                                                        let id = selectedGlobalExerciseid
                                                                        console.log(id)
                                                                        try {

                                                                            apiService(`/api/exercises/${id}`)
                                                                                .then(reply => {
                                                                                    console.log(reply)
                                                                                    let [exercise] = reply
                                                                                    setNewGlobalExerciseName(exercise.exercisename)
                                                                                    setNewGlobalExerciseDescription(exercise.exercisedescription)
                                                                                    setNewGlobalRequiredEquipment(exercise.demolink)
                                                                                    setGlobalNewDemoLink(exercise.requiredequipment)
                                                                                })
                                                                                .then(reply => {
                                                                            try {
                                                                                apiService('/api/exercises', "POST", newGlobalExerciseData)
                                                                                    .then(reply => {
                                                                                        if (reply.sqlMessage) {
                                                                                            alert(reply.sqlMessage)
                                                                                        } else if (reply.affectedRows >= 1) {
                                                                                            alert('Successfully added exercise!')
                                                                                        }
                                                                                    })
                                                                            } catch (error) {
                                                                                console.log(error)
                                                                            }
                                                                        })
                                                                        } catch (error) {
                                                                            console.log(error)

                                                                        }
                                                                    }}>
                                                                        Add Exercise</s.Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </s.Modal.Body>
                                            <s.Modal.Footer>
                                                <s.Button variant="secondary" onClick={handleClose}>Close</s.Button>

                                            </s.Modal.Footer>
                                        </s.Modal>
                                        {/* form to select an exercise from all exercises */}
                                    {/* <s.Form className='col-lg-6 border rounded shadow mt-4 pb-2'>

                                            <s.Form.Group controlId="newExerciseName">
                                                <s.Form.Label>Exercise Name</s.Form.Label>
                                                <s.Form.Control as="textarea" disabled onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExerciseName(e.target.value)} rows={1} />
                                            </s.Form.Group>
                                            <s.Form.Group controlId="newExerciseDescription">
                                                <s.Form.Label>Exercise Description</s.Form.Label>
                                                <s.Form.Control as="textarea" disabled onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewExerciseDescription(e.target.value)} rows={3} />
                                            </s.Form.Group>
                                            <s.Form.Group controlId="newExerciseEquipment">
                                                <s.Form.Label>Required Equipment</s.Form.Label>
                                                <s.Form.Control as="textarea" disabled onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRequiredEquipment(e.target.value)} rows={2} />
                                            </s.Form.Group>
                                            <s.Form.Group controlId="NewExerciseDemo">
                                                <s.Form.Label>Exercise Demo Link</s.Form.Label>
                                                <s.Form.Control as="textarea" disabled onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemoLink(e.target.value)} rows={1} />
                                            </s.Form.Group>
                                            <s.Button onClick={NewExerciseClick} type="Submit">Add Exercise</s.Button>
                                                </s.Form> */}
                                    <div className='text-center'>
                                            <h3>Today's Added Exercises</h3>
                                    </div>
                                    <div className='col-12 d-flex justify-content-center inline-block'>
                                        {todaysAddedExercises?.map(tae => {
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
                                                        <h5 className="card-title">{tae.exercisename}</h5>
                                                        <p className="card-text">{tae.exercisedescription}</p>
                                                        <p className="card-subtext">{tae.demolink}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </s.Tab>
                                {/* record exercise child tab */}
                                <s.Tab eventKey="recordExercise" title="Record Exercise">
                                    <s.Form.Row className="d-flex justify-content-center">
                                        <s.Form className='col-lg-6 border rounded shadow mt-4 pb-2' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                            <s.Form.Group controlId="exercise selector" className="text-center">
                                                <s.Form.Label><h4>Select Exercise</h4></s.Form.Label>
                                                <s.Form.Control as="select" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExerciseID(Number(e.target.selectedOptions[0].value))} defaultValue='default'>
                                                    {/* needs function mapping all of your exercises */}
                                                    <option disabled value='default' style={{
                                                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        borderColor: 'black'
                                                    }}>Select Exercise</option>
                                                    {exercises?.map(e => {
                                                        return (
                                                            <option value={e.exerciseid} key={e.exerciseid}>{e.exercisename}</option>
                                                        )
                                                    })}
                                                </s.Form.Control>
                                                </s.Form.Group>
                                                <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <s.Form.Group controlId="examples.Form.ControlTextarea1" className="text-center">
                                                <s.Form.Label><h4>Sets</h4></s.Form.Label>
                                                <s.Form.Control as='textarea' style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompletedSets(Number(e.target.value))} rows={3}/>
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                                borderTop: '2px solid black'
                                            }}></hr>
                                            <s.Form.Group controlId="examples.Form.ControlTextarea1" className="text-center">
                                                <s.Form.Label><h4>Reps</h4></s.Form.Label>
                                                <s.Form.Control as='textarea' style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompletedReps(Number(e.target.value))} rows={3} />
                                            </s.Form.Group>
                                            <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                            <div className="d-flex justify-content-end">
                                                <s.Button onClick={CompletedExerciseClick} size="sm" type="Submit">Complete Exercise</s.Button>
                                            </div>
                                        </s.Form>
                                    </s.Form.Row>
                                    <s.Row>
                                        <s.Table striped bordered hover size="sm" variant="dark" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            color: 'black'
                                        }}>
                                            <thead>
                                                <tr className="text-center">
                                                    <th align='center' colSpan='3'><h3>Today's Exercises</h3></th>
                                                </tr>
                                                <tr>
                                                    <th>Exercise</th>
                                                    <th>Sets</th>
                                                    <th>Reps</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {todaysDailyExercises?.map(tde => {
                                                    return (
                                                        <tr key={uuidv4()}>
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
                            </s.Tabs>
                        </s.Tab>
                        <s.Tab eventKey="food" title="Food">
                            <div className='row d-flex justify-content-center'>
                                <s.Form className='col-lg-8 border rounded shadow mt-4 pr-1 pb-2' style={{
                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <s.Form.Group controlId="newExerciseName" className="text-center">
                                        <s.Form.Label><h4>Caption</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageName(e.target.value)} rows={3} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop: '2px solid black'
                                    }}></hr>
                                    <s.Form.Group controlId="newExerciseDescription" className="text-center">
                                        <s.Form.Label><h4>Image Link</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageLink(e.target.value)} rows={6} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                    <div className="d-flex justify-content-end">
                                        <s.Button type="Submit" onClick={PostFoodImageClick} >Add Image</s.Button>
                                    </div>
                                </s.Form>
                                <s.Form className='col-lg-8 border rounded shadow mt-4 pl-1 pb-2' style={{
                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <s.Form.Group controlId="examples.Form.ControlTextarea1" className="text-center">
                                        <s.Form.Label><h4>8oz glasses of Water</h4></s.Form.Label>
                                        <s.Form.Control type='text' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWater(Number(e.target.value))} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                    <div className="d-flex justify-content-end">
                                        <s.Button onClick={PostWaterClick} size="sm" type="Submit">Add Drink</s.Button>
                                    </div>
                                </s.Form>
                            </div>
                            <s.Row className='justify-content-center'>
                                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                                    <h3>Today's Meals</h3>
                                    <div className='col-12 d-flex justify-content-center inline-block'>
                                        {todaysFoodImages?.map(fi => {
                                            return (
                                                <s.Card className="shadow my-2 col-md-8 col-lg-6 col-sm-10 p-1" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black',
                                                    width: '18rem'
                                                }} key={`image-id-${fi.imageid}`}>
                                                    <s.Card.Img variant="top" src={`${fi.image}`} />
                                                    <s.Card.Body>
                                                        <s.Card.Title>{fi.imagename}</s.Card.Title>
                                                    </s.Card.Body>
                                                </s.Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            </s.Row>
                        </s.Tab>
                        <s.Tab eventKey="notes" title="Notes">
                            <s.Row className='justify-content-center'>
                                <s.Form className='col-lg-8 border rounded shadow mt-4 pb-2' style={{
                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <s.Form.Group controlId="newExerciseName" className="text-center">
                                        <s.Form.Label><h4>Note Topic</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNoteTopic(e.target.value)} rows={1} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop: '2px solid black'
                                    }}></hr>
                                    <s.Form.Group controlId="newExerciseDescription" className="text-center">
                                        <s.Form.Label><h4>Note Content</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNoteContent(e.target.value)} rows={6} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                    <div className="d-flex justify-content-end">
                                        <s.Button type="Submit" onClick={PostNoteClick} >Add Note</s.Button>
                                    </div>
                                </s.Form>
                            </s.Row>
                            <s.Row>
                                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                                    <h3>Today's Notes</h3>
                                    <div className='row d-flex justify-content-center inline-block'>
                                        {todaysNotes?.map(n => {
                                            return (
                                                <div className="col-md-8 col-lg-8 col-sm-12 p-1" key={`note-id-${n.noteid}`}>
                                                    <div className="card shadow my-2" style={{
                                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    borderColor: 'black'
                                                }}>
                                                        <div className="card-body">
                                                            <h4 className='card-title'>{n.topic}</h4>
                                                            <p className='card-text'>{n.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </s.Row>
                        </s.Tab>
                        <s.Tab eventKey="journal" title="Journal" >
                            <s.Row className='justify-content-center'>
                                <s.Form className='col-lg-8 border rounded shadow mt-4 pb-2' style={{
                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <s.Form.Group className='text-center' controlId="newExerciseName">
                                        <s.Form.Label><h4>Journal Title</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJournalTitle(e.target.value)} rows={2} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop: '2px solid black'
                                    }}></hr>
                                    <s.Form.Group className='text-center' controlId="newExerciseDescription">
                                        <s.Form.Label><h4>Journal Content</h4></s.Form.Label>
                                        <s.Form.Control as="textarea" style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            borderColor: 'black'
                                        }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJournalContent(e.target.value)} rows={10} />
                                    </s.Form.Group>
                                    <hr className="col-8 col-lg-4" style={{
                                        borderTop:'2px solid black'
                                    }}></hr>
                                    <div className="d-flex justify-content-end">
                                        <s.Button type="Submit" onClick={PostJournalClick} >Add Journal</s.Button>
                                    </div>
                                </s.Form>
                            </s.Row>
                            <s.Row>
                                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                                    <h3>Today's Journal Entries</h3>
                                    <div className='row d-flex inline-block justify-content-center'>
                                        {todaysJournals?.map(j => {
                                            return (
                                                <div className="col-md-8 col-lg-8 col-sm-12 p-1" key={`journal-id-${j.journalid}`} >
                                                    <div className="card shadow my-2" style={{
                                                        backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        borderColor: 'black'
                                                    }}>
                                                        <div className="card-body">
                                                            <h4 className='card-title'>{j.title}</h4>
                                                            <p className='card-text'>{j.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </s.Row>
                        </s.Tab>
                    </s.Tabs>
                </s.Col>
            </s.Row>
        </s.Container>

    )
}

export default Input;