import axios from 'axios';
import Register from './register';

export default function Login() {

    return {
        ...Register(), 
        login:{
            email: '',
            password: ''
        },
        login_message: '',
        open: false,
        signup: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        movies:'',

        registerUser(){
            axios
            .post(`http://localhost:4090/api/signup`, this.signup)
                .then(results => {
                    console.log(results);
                    this.registered = results.data
                    this.register_message = 'You have been registered!!!'

                }).catch(err => console.log(err))
        },

        logIn() {
            axios
                .post(`http://localhost:4090/api/login`, this.login)
            alert('loggeddd')
                .then(results => {
                    console.log( results.data);
                    this.registered =  results.data
                    this.login_message = 'Logged In!!!';
                    this.open = true;
                })

                .catch(err => console.log(err))
        },
        searchMovies(){
            axios 
            .get('https://api.themoviedb.org/3/search/movie?api_key=30bff053330ac6be7f6cdb819420fbf3&query=perfect', {

            })
            .then(results => {
                console.log(results);
                this.registered = results.data
                this.movies = results.data.results

            })
        },
        favourieMovies(){

        }
    }
}