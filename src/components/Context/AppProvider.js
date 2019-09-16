import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);    

    const config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: '',
      projectId: '',
      messagingSenderId: ''
    };

    firebase.initializeApp(config);

    this.state = {
      firebase,

      setFirebase: (firebase) => {
        this.setState({ firebase });
      },
      getFirebase: () => (
        this.state.firebase
      )
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
