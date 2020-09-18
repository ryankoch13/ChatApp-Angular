import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { auth } from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore,
  AngularFirestoreDocument 
  } from 'angularfire2/firestore'

import { Observable, of } from 'rxjs'
import { switchMap, first } from 'rxjs/operators'
import { User } from './user.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )

  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider()
    const credential =  await this.afAuth.auth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut()
    return this.router.navigate(['/'])
  }
  
  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`)

    const data = {
      uid,
      email,
      displayName,
      photoURL
    }

    return userRef.set(data, { merge: true })
  }

}
