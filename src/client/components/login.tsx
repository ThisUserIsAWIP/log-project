import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../types';
import { apiService, TOKEN_KEY } from '../front-utils/apiService'

const Login = () => {

    let history = useHistory()

    const [email, setEmail] = useState<User['email']>();
    const [password, setPassword] = useState<User['password']>();

    const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const authorData = {
            email: email,
            password: password
        };
        try {
            const token = await apiService('/auth/login', 'POST', {
                email: authorData.email,
                password: authorData.password
            });
            localStorage.setItem(TOKEN_KEY, `${token}`);
            history.push('/input')
        } catch (error) {
            
        }

    }
    return (
        <>
            <div className="row d-flex m-3 p-3 justify-content-center">
          <div className='col-lg-6 col-md-10 col-sm-12' style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }}>
                <span id="basic-addon1">Login</span>
                <input style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <input style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="text" className="form-control" placeholder='Password' aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <p className='card-subtext'>Don't have an account?<Link to={`/register`}>Register</Link></p>
                <div className='d-flex justify-content-end'>
                <button onClick={handleButtonClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Login</button>
                </div>
                </div>
            </div>
        </>
    )
};

export default Login;