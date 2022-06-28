import axios from 'axios';
import Register from './register';

export default function Login() {

    return {
        ...Register(),
        login:{
            username: '',
            password: ''
        },
        login_message: '',
        open: false,

        logIn() {
            axios
                .post(`localhost:4090/api/login`, this.registerUser())
                .then(r => this.registerUser())
            alert('loggeddd')
                .then(() => {
                    console.log(userData);
                    this.registered = userData.data
                    this.login_message = 'Logged In!!!';
                    this.open = true;
                })

                .catch(err => console.log(err))
        },


    }
}