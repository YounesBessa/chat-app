import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyAN1CPfI-Eu3OSJPbc6q1ZDwSzJ00xZL_g",
        authDomain: "chatapp-cc5aa.firebaseapp.com",
        projectId: "chatapp-cc5aa",
        storageBucket: "chatapp-cc5aa.appspot.com",
        messagingSenderId: "147675152351",
        appId: "1:147675152351:web:d03edef3ff6e392111ce6a",
        measurementId: "G-1RLXP8PCRD",
      };
      firebase.initializeApp(firebaseConfig);
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
        const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user
        };

        this.db.push(message);
    });
};

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
