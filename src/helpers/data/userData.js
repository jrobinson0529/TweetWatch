import axios from 'axios';
import firebase from 'firebase';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;
const getUserInfo = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${id}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const createUser = (userObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, userObject)
    .then((response) => {
      const body = { id: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, body).then((res) => getUserInfo(res.data.id).then(resolve));
    }).catch((error) => reject(error));
});
const editUser = (userObject, id) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${id}.json`, userObject)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
export {
  getUserInfo, getCurrentUsersUid, createUser, editUser, getUsers
};
