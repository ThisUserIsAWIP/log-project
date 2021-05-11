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
const NoteHistory = () => {

    const [allNotes, setAllNotes] = useState<Array<Note>>(null)

    useEffect(() => {
        try {
            apiService('/api/notes')
                .then(noteRes => {
                    setAllNotes(noteRes)
                    console.log(noteRes)
                    console.log(allNotes)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <>
            <s.Row>
                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                    <h3>All Notes</h3>
                    <div className='row d-flex justify-content-center inline-block'>
                        {allNotes?.map(n => {
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
                                            <p className='card-subtext'>{n.created}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </s.Row>
        </>
    )
}

export default NoteHistory;