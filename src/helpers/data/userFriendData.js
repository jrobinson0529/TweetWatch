import axios from 'axios';
import { firebaseConfig } from '../apiKeys';
import { getUserInfoByUid } from './userData';

const dbUrl = firebaseConfig.databaseURL;
const getSingleUserFriend = (uid, friendId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/friendedUsers.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      resolve(Object.values(response.data).filter((friend) => friendId === friend.friendId) || friendId === uid);
    }).catch((error) => reject(error));
});
const mergeUserFriendInfo = (friendArray) => new Promise((resolve, reject) => {
  const friendInfoPromiseArray = friendArray.map((friend) => getUserInfoByUid(friend.friendId));
  Promise.all(friendInfoPromiseArray).then((response) => {
    resolve(response);
  }).catch((error) => reject(error));
});
const getUserFriends = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/friendedUsers.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const createUserFriend = (uid, friendId) => new Promise((resolve, reject) => {
  getSingleUserFriend(uid, friendId).then((friendResponse) => {
    if (friendResponse.length <= 0) {
      const object = {
        uid,
        friendId,
      };
      axios.post(`${dbUrl}/friendedUsers.json`, object).then((response) => {
        const body = { id: response.data.name };
        axios.patch(`${dbUrl}/friendedUsers/${response.data.name}.json`, body);
      });
    }
  }).then(() => getUserFriends(uid).then((x) => mergeUserFriendInfo(x).then(resolve)))
    .catch((error) => reject(error));
});
const getSearchedUser = (username, uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="username"&equalTo="${username}"`)
    .then((response) => {
      if (Object.values(response.data)) {
        createUserFriend(uid, Object.values(response.data)[0].uid).then(resolve);
      }
    })
    .catch((error) => reject(error));
});
const deleteUserFriend = (uid, id) => new Promise((resolve, reject) => {
  getUserFriends(uid).then((x) => mergeUserFriendInfo(x).then((response) => {
    const singleFriend = response.filter((friend) => friend.id === id);
    getSingleUserFriend(uid, singleFriend[0].uid).then((friendResponse) => {
      axios.delete(`${dbUrl}/friendedUsers/${friendResponse[0].id}.json`)
        .then(() => getUserFriends(uid).then((friends) => mergeUserFriendInfo(friends).then(resolve)));
    });
  })).catch((error) => reject(error));
});
export {
  createUserFriend, getSearchedUser, getSingleUserFriend, getUserFriends, mergeUserFriendInfo, deleteUserFriend
};
