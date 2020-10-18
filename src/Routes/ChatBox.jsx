import React,{useState} from 'react'
import Header from "../Components/Header.jsx"
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';
import "./ChatBox.css"

export default function Chatbox(props) {

    const [input, setInput] = useState("");


    return (
        <div>
            <Header/>
      <Divider/>
      <div className="subject__name">
                <h1>Subject Name</h1>
                <h3>Subject Code</h3>
      </div>
      <div className="chat__container">
        <div className="message__container" >


        <p className="chat__message" >
            <span className="chat__name">Nakul</span>
            message  fgdftfdfh ghfyhyf dgfhf        
        </p>

        <p className="chat__reciever chat__message"  >
            <span className="chat__name" >Nakul</span>
            message
        </p>

        <p className="chat__message" >
            <span className="chat__name">Nakul</span>
            message  fgdftfdfh ghfyhyf dgfhf        
        </p>

        <p className="chat__reciever chat__message"  >
            <span className="chat__name" >Nakul</span>
            message
        </p>
        
       
        </div>
        <Divider/>
        <div className="message__input">
        
        <div className="message__input__left">
        <Avatar src="/broken-image.jpg" className="messageBox__ava" />
        </div>
        <div className="message__input__right">
        <form>

        <textarea
        value={input}
        onChange={e => setInput(e.target.value)} 
        placeholder="Type a Message" 
        type="text"
        style= {{width:"55vw",resize:"none",height:"15px"}}
    
        >

            </textarea>


<button type="submit" >Send Message</button>
</form>
        </div>
        </div>
      </div>
        </div>
    )
}
