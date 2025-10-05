
// Firebase Configuration
// استبدل هذه القيم بقيمك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQIPfJlzoTWgjeAEf5kxlylPM0O-ZrGps",
  authDomain: "novaacademy-aeea4.firebaseapp.com",
  projectId: "novaacademy-aeea4",
  storageBucket: "novaacademy-aeea4.firebasestorage.app",
  messagingSenderId: "62427684859",
  appId: "1:62427684859:web:a29ade664613ec99e9b55e",
  measurementId: "G-MF5GGXWVSP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Auth State Observer
auth.onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
  } else {
    localStorage.removeItem('currentUser');
  }
});

// Google Sign In
async function signInWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

// Email/Password Sign Up
async function signUpWithEmail(email, password, displayName) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName });
    return result.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// Email/Password Sign In
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

// Sign Out
async function signOut() {
  try {
    await auth.signOut();
    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
