import React,{useCallback,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './style.css'
export default function home() {
    const [value, setvalue] = useState();
    const navigate=useNavigate();
    const handelJoin=useCallback((e)=>{
       navigate(`/room/${value}`)
    },[])

  return (
    <div>
      <input type="text" name="" onChange={e=>setvalue(e.target.value)} id="" /><br/>
      <button onClick={handelJoin} className='button-17'>Join</button>
    </div>
  )
}