import {useAuthValue} from '../../auth-context'
import {useState, useEffect} from 'react'
import {auth} from '../../config/firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

import './verifyEmail.css'

function VerifyEmail() {

  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verifique seu endereço de e-mail</h1>
        <p>
          <strong>Um e-mail de verificação foi enviado para:</strong><br/>
          <span>{currentUser?.email}</span>
        </p>
        <span>Siga as instruções no e-mail para verificar sua conta</span>       
        <button 
          onClick={resendEmailVerification}
          disabled={timeActive}
        >Reenviar email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerifyEmail