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
const JournalHistory = () => {
    const [allJournals, setAllJournals] = useState<Array<Journal>>(null)

    useEffect(() => {
        try {
            apiService('/api/journal')
                .then(reply => {
                    setAllJournals(reply)
                })
                .then(reply => console.log(allJournals))
        } catch (error) {
            console.log(error)
        }

    }, [])

    return (
        <>
            <s.Row>
                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                    <h3>All Journal Entries</h3>
                    <div className='row d-flex inline-block justify-content-center'>
                        {allJournals?.map(j => {
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
                                            <p className='card-subtext'>{j.created}</p>
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

export default JournalHistory;