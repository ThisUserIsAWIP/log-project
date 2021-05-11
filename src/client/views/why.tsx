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
const Why = () => {

    return (
        <>
            <s.Container fluid>
                    <s.Row className='d-flex justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-sm-12 m-3' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }} >
                                            <div className='text-center'>
                <h3>Why Captain's Log?</h3>
                </div>
                <p>
                    With so many products available offering intense micromanagement of nearly every aspect of your life Captain's Log has taken a
                    different route. Despite consisting solely of simple logs Captain Kirk's Captain's Log is undoubtedly filled with immense
                    knowledge of the trials and tribulations of his journey and those of the enterprise. Captain's Log offers you that same experience,
                    a simple way to visualize your growth when it comes to what matters most your health, knowledge, and experiences.
                    
                </p>
                </div>
                </s.Row>
                <s.Row className='d-flex justify-content-center'>
                <div className='col-lg-5 col-md-10 col-sm-12 m-3' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }} >
                <div className='text-center'>
                <h3>Health</h3>
                </div>
                <p>
                    At Captain's Log your health is important to us but we know there is plenty on your mind, so we
                    found a way to let you manage your health comprehensively without the piles of exercise recommendations, diets, and calorie calculators
                    that other platforms rely on. Worried about your diet? Utilize our foodimage function to store images of your food, experts suggest 
                    filling each plate 50% veggies, a 2017 study shows that only 9% of American's claim to consume the FDA recommended 1.5 - 2 cups of veggies
                    per day much less 50%. Hold yourself accountable by visualizing your diet, instead of counting it. Captain's Log also offers a simple water
                    intake counter. Drank a glass of water? Add a cup. Drank a bottle of water? Add two. As well as an exercise management system, allowing you to
                    create your own exercises as well as add your favorites. Including descriptions, required equipment, and a demonstration video you can be sure
                    you always can find an exercise to do no matter where you are or what you have and ensure it's done in proper form. Record the completed sets and reps in order to 
                    form a workout routine for tha day!
                    
                </p>
                </div>
                <div className='col-lg-5 col-md-10 col-sm-12 m-3' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }} >
                <div className='text-center'>
                <h3>Notes</h3>
                </div>
                <p>
                    Essentially your notes and journal functions are the same, a topic or title and then their respective content. What makes them 
                    different is how you use it. The Notes feature is intended to become an encyclopedia of information that is important to you.
                    Whether it's notes from class, questions for a job interview, your dates favorite color, or an incredible new word the Notes 
                    feature wont forget a thing as long as you remember to fill it's pages. The human mind is incredibly inconsistent and memory retention
                    can very drastically. If you use the note feature and starting taking notes on important details from face to face experiences with 
                    others as well as on new information you want to retain you'll not only have a means to accurately recount what happened or
                    what you learned, but also the ability to memorize that information. As a result of your information accumulation you'll
                    be able to see patterns in what information you value as well as behavioral patterns of people you interact with that otherwise
                    you wouldn't be aware of.
                </p>
                
                </div>
                <div className='col-lg-5 col-md-10 col-sm-12 m-3' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }} >
                <div className='text-center'>
                <h3>Journaling</h3>
                </div>
                <p>
                    Now that we mentioned patterns we can delve into our journaling function. As mentioned previously journaling functionally works the same as note taking
                    but again it's the content that matters. The journal is the core feature of Captain's Log, a tool to keep track of your everyday experiences,
                    growth, goals, emotions, and more. Offering you a "root" keeping a journal allows you an outlet to freely express yourself, oftentimes what we 
                    want out of life is washed away by day to day turbulance, keeping a journal allows you to keep a dialogue open with yourself about your aspirations.
                    This becomes the aforementioned "root" of your growth. Allowing you to quantify where it is you are, where you want to be, what you have achieved today,
                    and what you hope to achieve tomorrow. We recommend making a journal entry several times a day, throughout the day if something stressful happens,
                    before bed to catalog your achievements, as well as periodically to keep track of goals and monitor your emotions.
                </p>
                </div>
                <div className='col-lg-5 col-md-10 col-sm-12 m-3' style={{
                                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }} >
                <div className='text-center'>
                <h3>Compilation</h3>
                </div>
                <p>
                    Compilation is Captain's Log's crowning jewel of simplicity, at the end of each day every input you made whether it be a journal entry,
                    a note, an exercise, a glass of water, or your lunch is compiled into one giant Journal Entry. This is the ultimate visualization of your growth
                    through this tool you will be able to see in one place what you have learned, what you have experienced, exercises you completed, as well as
                    water and food you have consumed. This allows users to experience the simplicity and versatility of a real journal without the limitations
                    and inconveniences having to buy a new little book to carry with you each month presents.
                     The phasers are set! Allow us to stun you with our cutting edge simplicity, start your journey towards 
                    bettering your life today, free of charge.
                </p>
                </div>
                </s.Row>
            </s.Container>
        </>
    )
}

export default Why;