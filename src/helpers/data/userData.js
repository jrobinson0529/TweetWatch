import firebase from 'firebase';

const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;

export default getCurrentUsersUid;
