import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import withContext from '../Context/withContext';
import { isSignedIn, signIn } from '../../utils/userState';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    if (isSignedIn()) props.history.push('/Home');

    let priv = false;
    try {
      window.openDatabase(null, null, null, null);
    }
    catch (e) {
      priv = true;
    }

    this.state = {
      loading: false,
      private: priv
    }
  }

  firebase = this.props.context.getFirebase();

  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      this.firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        if (authResult) this.signInSuccess();
        return false;
      }
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = this.firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) this.signInSuccess();
      }
    );
  }

  signInSuccess = async () => {
    try {
      this.setState({ loading: true });

      const user = await this.firebase.auth().currentUser;
      const token = await user.getIdToken(true);

      signIn({ token, user });

      const { history } = this.props;
      history.push('/Home');
    }
    catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div>
        <h1>React App</h1>
        {this.state.private && 
          <h4 style={{ color: 'red' }}>
            Private browsing may cause<br/>problems with sign in!
          </h4>
        }
        {this.state.loading && <p>Loading...</p>}
        {<StyledFirebaseAuth 
          uiConfig={this.uiConfig} 
          firebaseAuth={this.firebase.auth()} 
        />}
      </div>
    );
  }
}

export default withContext(SignIn);