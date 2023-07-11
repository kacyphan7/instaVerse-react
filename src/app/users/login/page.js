'use client';
import { useEffect, useState } from 'react';
import '../../globals.css';

export default function Login() {

    const background = {
        backgroundColor: 'white'
    };

    return (
        <div style={background}>
            <main className='loginItems'>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email"
                            aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We will never share your
                            email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox"
                            className="form-check-input" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </main >
        </div >
    );
}