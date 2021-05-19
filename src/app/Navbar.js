import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar component">
                <h1>Currency tools</h1>
                <div className="links">
                    <Link className="links__link" to="/currencies">Список валют</Link>
                    <Link className="links__link" to="/converter">Конвертер</Link>
                </div>
        </nav>
    )
}