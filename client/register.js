import axios from 'axios';

export default function Register () {
    return {
        user_info:[],
        signup: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        register_message: '',

        registerUser(){
            axios
            .post(`http://localhost:4090/api/signup`, this.signup)
            .then(r => r.json())
                .then(results => {
                    console.log(results);
                    this.registered = results.data
                    this.register_message = 'You have been registered!!!'

                }).catch(err => console.log(err))
        }
    }

}