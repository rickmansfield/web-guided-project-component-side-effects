import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
  useEffect(() => {
    console.log(`👉 EFFECT ONLY AFTER FIRST RENDER+DOM SURGERY`);
    return () => {
      console.log(`👉 CLEAN UP before component is removed from dom`);
    }
  }, []);

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.

  useEffect(() => {
    //memory leak or "dirty" thing typically here..
    const listener = evt => {
      console.log(`here is a pseudorandom number ${Math.random()}`);
    }
    document.addEventListener('click', listener);
    return() => {
      //clean up
      document.removeEventListener('click', listener)
    }
  });

  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
  useEffect(()=>{
    console.log(`🥵 runs after first render+DOM surgery and all others too`);
    return() => {
      console.log(`🥵 cleanup after the effect of the PREVIOUS render of the component`);
    }
  });

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
  console.log('**** RENDERING! ****');
  useEffect(()=>{
    //this rund after first render for sure, then after every render+somSurgery
    //caused by a change in friendId
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
    .then(res =>{
      setDetails(res.data)
    })
    .catch(err => {
      // debugger
    })
  }, [friendId]);

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
