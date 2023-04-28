import React from 'react';
import './FourOhFour.css'
import { poems } from '../poems'

export default function FourOhFour(){

    const poemArr = Object.values(poems)
    const poem = poemArr[getRandomInt(poemArr.length)]

	return (
        <div className='the-page'>
            <div className='four-oh-four-div'>
                <h1>404</h1>
                <h4>I do hope you're not lost, and that I haven't sent you here myself.</h4>
                <h2>Here's a poem for your trouble.</h2>
                <div className='poem-div'>
                    <h2>{poem.title}</h2>
                    <h3>{poem.author} {poem.years}</h3>
                    <pre>{poem.content}</pre>
                </div>
            </div>
        </div>
	);
}

function getRandomInt(max) { //As seen on MDN
    return Math.floor(Math.random() * max);
}
