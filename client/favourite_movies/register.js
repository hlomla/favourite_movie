import axios from 'axios';

export default function Register () {
    return {
        signup: {
            firstname: '',
            lastname: '',
            username: '',
            password: ''
        },

        registerUser(){
            axios
            .post(`localhost:4090/api/signup`, this.signup)
            .then(r => r.json())
                .then(userData => {
                    console.log(userData);
                    this.registered = userData.data

                }).catch(err => console.log(err))
        }
    }

}