import store from '../store/index';

export default (to,from,next) => {

    if (store.getters.isAuthorized){
        next()
    }
    else{
        next('/login');
    }
}