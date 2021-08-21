import axiosClient from "./axiosClient";

const userAPI = {
    signup(data){
        const url = '/api/user/signup';
        return axiosClient.post(url, data);
    },
    login(data){
        const url = '/api/user/login';
        return axiosClient.post(url, data);
    }

}
export default userAPI;