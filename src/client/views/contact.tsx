import * as React from 'react';
import { useState } from 'react';
import { apiService } from '../front-utils/apiService';
const Contact = () => {

    const [values, setValues] = useState<{ [key: string]: string }>(null);
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(values)
        let res = await apiService('/api/contact', 'POST', {
            email: values.email,
            subject: values.subject,
            content: values.content
        })
        console.log(res)
        setValues(null)
    }
    return (
        <>
            <main className="container">
                <section className="row justify-content-center text-center">
                    <div className="col-6">
                        <form className="form-group border rounded m-2 shadow p-4" style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderColor: 'black'
                        }}>
                            <label>Have a suggestion for a feature or an interest in hiring me? Shoot me an email, I'd love to meet you!</label>
                            <label>Your Email</label>
                            <input name="email" value={values?.email || ''} onChange={handleChanges} type="email" className="form-control" style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderColor: 'black'
                        }}/>
                            <label>Subject</label>
                            <input name="subject" value={values?.subject || ''} onChange={handleChanges} type="text" className="form-control" style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderColor: 'black'
                        }} />
                            <label>Content</label>
                            <input name="content" value={values?.content || ''} onChange={handleChanges} type="textarea" className="form-control" style={{
                            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderColor: 'black'
                        }} />
                            <div className='d-flex justify-content-end'>
                            <button onClick={handleSubmit} className="btn btn-primary mt-3">Send Email</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}


export default Contact;