import React from 'react'
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maskStyle: {
                left: 512,
                right: 0
            } ,
            registerName:'',
            registerEmail:'',
            password:'',
            signInEmail:'',
            signInPassword:'',
            localstorage:[],
            errors:{},
            signInErrors:{}

        }

        this.container = React.createRef()
        this.onSignIn = this.onSignIn.bind(this)
        this.onSignUp = this.onSignUp.bind(this)
        this.signUp = this.signUp.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)

    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }

    onSignUp() {
        this.container.current.classList.add("right-panel-active");
    }
    onSignIn() {
        this.container.current.classList.remove("right-panel-active");
    }

    componentDidMount() {
        let str = JSON.parse(localStorage.getItem('storage'))
        str === null ? str = [] : str = JSON.parse(localStorage.getItem('storage'))
        this.setState({localstorage:str})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('storage',JSON.stringify(this.state.localstorage))
    }

    signUpValidation = () =>{
        const {registerName , password , registerEmail} = this.state
        let isValid = true
        const errors = {}
        if(registerName.trim().length < 3){
            errors.registerName = 'name is invalid'
            isValid = false
        }
        if(!registerEmail.trim().includes('@') || !registerEmail.includes('.')){
            errors.registerEmail = 'email is invalid'
            isValid = false
        }
        if(password.trim().length < 3){
            errors.password = 'password is invalid'
            isValid = false
        }
        this.setState({errors})
        return isValid
    }

    signUp = (e) => {
        e.preventDefault()
        const isValid = this.signUpValidation()
        if(isValid){
            let myObj = {}
            myObj.registerName = this.state.registerName
            myObj.password = this.state.password
            myObj.registerEmail = this.state.registerEmail
            this.setState({localstorage:[...this.state.localstorage , myObj]})
            alert('you registered')
            this.setState({registerName:'',registerEmail:'',password:''})
        }
    }


    signInValidation = () =>{
        const { signInEmail , signInPassword} = this.state
        let isValid = true
        const signInErrors = {}
        if(!signInEmail.trim().includes('@') || !signInEmail.includes('.')){
            signInErrors.signInEmail = 'email is invalid'
            isValid = false
        }
        if(signInPassword.trim().length < 3){
            signInErrors.signInPassword = 'password is invalid'
            isValid = false
        }
        this.setState({signInErrors})
        return isValid
    }

    handleSignIn = (e) =>{
        e.preventDefault()
        const isValid = this.signInValidation()
        if(isValid){
            let is_valid = false
            let storage = JSON.parse(localStorage.getItem('storage'))
            for (let item of storage) {
                if((item.registerEmail == this.state.signInEmail )&& (item.password == this.state.signInPassword)){
                    is_valid=true
                }
            }
            if(is_valid){
                localStorage.setItem('IS_LOGGED_IN' , true)
                alert('welcome')
                this.setState({signInEmail:'' , signInPassword:''})
            }
            else{
                alert('You not Sign in')
            }
        }

    }


    render() {
        const clipValue = `inset(0 ${this.state.maskStyle.left}px 0 ${this.state.maskStyle.right}px)`
        return (
            <div className="container" id="container" ref={this.container}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1 className={'title'}>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <FontAwesomeIcon className='social-icons' icon={faFacebookF} />
                            </a>
                            <a href="#" className="social">
                                <FontAwesomeIcon className='social-icons' icon={faGooglePlusG} />
                            </a>
                            <a href="#" className="social">
                                <FontAwesomeIcon className='social-icons' icon={faLinkedinIn} />
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <div style={{width:'100%'}}>
                            <FontAwesomeIcon className='placeholder' icon={faUser} />
                            <input onChange={(e)=>{this.setState({registerName:e.target.value})}} type="text" placeholder="Name" />
                            <div className={'errors'}>{this.state.errors.registerName}</div>
                        </div>
                        <div style={{width:'100%'}}>
                            <FontAwesomeIcon className='placeholder' icon={faEnvelope} />
                            <input onChange={(e)=>{this.setState({registerEmail:e.target.value})}} type="email" placeholder="Email" />
                            <div className={'errors'}>{this.state.errors.registerEmail}</div>
                        </div>
                        <div style={{width:'100%'}}>
                            <FontAwesomeIcon className='placeholder' icon={faLock} />
                            <input onChange={(e)=>{this.setState({password:e.target.value})}} type="password" placeholder="Password" />
                            <div className={'errors'}>{this.state.errors.password}</div>
                        </div>
                        <button style={{marginTop:'1.2rem'}} onClick={this.signUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1 className={'title'}>Sign in to Diprella</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FontAwesomeIcon className='social-icons' icon={faFacebookF} /></a>
                            <a href="#" className="social"><FontAwesomeIcon className='social-icons' icon={faGooglePlusG} /></a>
                            <a href="#" className="social"><FontAwesomeIcon className='social-icons' icon={faLinkedinIn} /></a>
                        </div>
                        <span>or use your account</span>
                        <div style={{width:'100%'}}>
                            <FontAwesomeIcon className='placeholder' icon={faEnvelope} />
                            <input type="email" placeholder="Email" onChange={(e)=>{this.setState({signInEmail:e.target.value})}} />
                            <div className={'errors'}>{this.state.signInErrors.signInEmail}</div>
                        </div>
                        <div style={{width:'100%'}}>
                            <FontAwesomeIcon className='placeholder' icon={faLock} />
                            <input type="password" placeholder="Password" onChange={(e)=>{this.setState({signInPassword:e.target.value})}} />
                            <div className={'errors'}>{this.state.signInErrors.signInPassword}</div>
                        </div>
                        <a href="#">Forgot your password?</a>
                        <button style={{marginTop:'1.2rem'}} onClick={this.handleSignIn}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 style={{color:'white'}}>Welcome Back!</h1>
                            <p>To keep connected with us please<br/>login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={this.onSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 style={{color:'white'}}>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={this.onSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {Login}