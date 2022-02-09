import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../ducks/reducer'
import { connect } from 'react-redux'

const Register = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = () => {
        if(password === password2 ){
            const body = {
                email: email,
                username: username,
                password: password
            }
            axios.post('/auth/register', body).then((res) => {
                props.loginUser(res.data)
                navigate('/')
            })
        } else {
            console.log('passwords dont match')
        }
    }


    return (
        <div>
            <Link to="/login">Already have an account?</Link>
            <Link to="/">Continue shopping without earning points</Link>

            <input placeholder='Email'
             maxLength='100'
             onChange={(e) => {
                 setEmail(e.target.value)
             }}/>
            <input placeholder='Username' 
            maxLength='20'
            onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <input placeholder='Password'
             maxLength='25'
             type='password'
             onChange={(e) => {
                 setPassword(e.target.value)
             }}/>
            <input placeholder='Confirm Password'
             maxLength='25'
             type='password'
             onChange={(e) => {
                 setPassword2(e.target.value)
             }}/>

             <button onClick={() => {handleSubmit()}}>Submit</button>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

 export default connect(mapStateToProps, { loginUser })(Register)