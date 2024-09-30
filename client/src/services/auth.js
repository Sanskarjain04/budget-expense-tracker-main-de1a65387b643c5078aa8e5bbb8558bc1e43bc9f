import * as api from '../api/index'
import configData from '../config.json'

const hardcodedUserData = {
    firstName: "User",
    lastName: "145",
    emailId: "User@gmail.com",
    // Include any other fields required by your application
};

export const login = async (formData, setShowAlert, setAlertMessage) => {
    try {
        // Simulate successful login with hardcoded user data
        localStorage.setItem("profile", JSON.stringify(hardcodedUserData));
        window.location.href = configData.DASHBOARD_URL;
        return hardcodedUserData; // Return hardcoded user data
    } catch (err) {
        setShowAlert(true);
        setAlertMessage("Oops! Something went wrong");
        return false;
    }
};

export const register = async (formData, setShowAlert, setAlertMessage) => {
    try {
        // Simulating registration, you can adjust if needed
        const data = await api.register(formData);
        login(formData, setShowAlert, setAlertMessage);
        return data;
    } catch (err) {
        setShowAlert(true);
        err.response.status === 400 || err.response.status === 401
            ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went wrong");
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("profile");
    window.location.href = configData.LOGIN_URL;
};


export const getUser = async (formData, setShowAlert, setAlertMessage) => {
    try{
        //registering user to the DB
        const data = await api.getUser(formData)
        return data
    }catch(err){
        setShowAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const getEmailList = async () => {
    try{
        const data = await api.getEmailList()
        return data 
    }catch(err){
        return null 
    }
}

export const deleteUser = async(data, setShowAlert, setAlertMessage) => {
    try{
        const response = await api.deleteUser(data)
        localStorage.removeItem("profile")
        window.location.href=configData.USER_DELETED_URL
    }catch(err){
        setShowAlert(true)
         err.response.status === 400 || err.response.status === 401
         ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const updatePassword = async (formData, setShowAlert, setAlertMessage, showHomeAlert, homeAlertMessage) => {
    try{
        //registering user to the DB
        const {data} = await api.updatePassword(formData)
        showHomeAlert(true)
        homeAlertMessage("Password Updated Sucessfully!")
        return true
    }catch(err){
        setShowAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}


export const editUser = async (formData, setShowAlert, setAlertMessage, showHomeAlert, homeAlertMessage) => {
    try{
        //registering user to the DB
        const {data} = await api.editUser(formData)
        showHomeAlert(true)
        homeAlertMessage("User Updated Sucessfully!")
        return true
    }catch(err){
        setShowAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}