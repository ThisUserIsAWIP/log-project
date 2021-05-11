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
const FoodImageHistory = () => {
    const [allFoodImages, setAllFoodImages] = useState<Array<FoodImages>>()

    useEffect(() => {
        try {
            apiService('/api/foodimages')
                .then(reply => {
                    setAllFoodImages(reply)
                })
                .then(reply => console.log(allFoodImages))
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <>
            <s.Row className='justify-content-center'>
                <div className='col-12 text-center rounded shadow mt-4 pb-2'>
                    <h3>Meal History</h3>
                    <div className='col-12 d-flex justify-content-center'>
                        {allFoodImages?.map(fi => {
                            return (
                                <s.Card style={{
                                    backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    borderColor: 'black',
                                    width: '18rem'
                                }} className='p-1 m-2' key={`image-id-${fi.imageid}`}>
                                    <s.Card.Img variant="top" src={`${fi.image}`} />
                                    <s.Card.Body>
                                        <s.Card.Title>{fi.imagename}</s.Card.Title>
                                        <s.Card.Text>{fi.created}</s.Card.Text>
                                    </s.Card.Body>
                                </s.Card>
                            )
                        })}
                    </div>
                </div>
            </s.Row>
        </>
    )
}

export default FoodImageHistory;