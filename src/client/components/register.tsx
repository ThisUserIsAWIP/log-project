import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../types';
import { apiService, TOKEN_KEY } from '../front-utils/apiService'

const Register = () => {
   
    const [username, setUserName] = useState<User['username']>();
    const [email, setEmail] = useState<User['email']>();
    const [bio, setBio] = useState<User['bio']>();
    const [password, setPassword] = useState<User['password']>();

    let history = useHistory()


    const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const userData = {
            username: username,
            email: email,
            password: password,
            bio: bio
        };
        try {
			const token = await apiService('/auth/register', 'POST', {
				username: userData.username,
                email: userData.email,
                password: userData.password,
                bio: userData.bio
			});
			localStorage.setItem(TOKEN_KEY, `${token}`);
            history.push('/login')
            
		} catch (error) {
			
		}
            
    }
    



    return (
        <>
            <div className="row d-flex m-3 p-3 justify-content-center" >
          <div className='col-lg-6 col-md-10 col-sm-12'style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }}>
                <span id="basic-addon1">Register</span>
                <input style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} type="username" autoComplete="username" className="form-control" placeholder="Userame" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                <input style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBio(e.target.value)} type="text" className="form-control" placeholder="Bio" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                 <p className='card-subtext'>Have an account?<Link to={`/login`}>Login</Link></p>
                <div className='d-flex justify-content-end'>
                <button onClick={handleButtonClick} className="btn btn-outline-secondary m-2 p-1" type="button" id="button-addon2">Register</button>
                </div>
                </div>
            </div>
        </>
    )
};

export default Register;