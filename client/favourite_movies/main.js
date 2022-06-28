import "./login"
import './style.css'
import Alpine from 'alpinejs'
import Login from './login';
import './register';

// import persist from '@alpinejs/persist'
 
// Alpine.plugin(persist)

window.Alpine = Alpine
Alpine.data('login', Login)
Alpine.start()


