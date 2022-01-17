import axios from "axios";

class UsuarioService{

    async userLogin(data){
        return axios({
            url: "http://134.122.114.179:8089/user",
            method: "GET",
            timeout: 5000,
            headers:{
                email: data.email,
                password: data.password
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })
        
    };

    async userCreate(data){
        return axios({
            url: "http://134.122.114.179:8089/user",
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                token: 'f72233a9541da9bc21b2920e99dc24f82ca629eb'
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })
        
    };
}

const userServices = new UsuarioService()
export default userServices