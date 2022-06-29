import "./login"
import './style.css'
import Alpine from 'alpinejs'
import Login from './login';
// import './register';
// import Register from "./register";

// import persist from '@alpinejs/persist'
 
// Alpine.plugin(persist)

window.Alpine = Alpine
Alpine.data('user_info', Login)
// Alpine.data('user_info', Register)
Alpine.start()


