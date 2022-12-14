import { FirebaseApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { helperPromise } from 'universal-helper';

let auth: Auth;
export const AuthInit = (app: FirebaseApp) => {
  auth = getAuth(app);
};

const GetCurrentUser = () => auth.currentUser;

const SignInWithEmailAndPassword = (sEmail: string, sPassword: string) => {
  return helperPromise.GolangResponse(
    signInWithEmailAndPassword(auth, sEmail, sPassword),
  );
};

const SignOut = () => {
  return signOut(auth);
};

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     authWrapper.classList.remove('open');
//     authModals.forEach(modal => modal.classList.remove('active'));
//   } else {
//     authWrapper.classList.add('open');
//     authModals[0].classList.add('active');
//   }
// });

export default { GetCurrentUser, SignInWithEmailAndPassword, SignOut };
