import React from 'react';

import { signOut } from '../../utils/userState';
import withContext from '../Context/withContext';

class Home extends React.Component {
  firebase = this.props.context.getFirebase();
  
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1>Home</h1>
        <button onClick={() => signOut(this.firebase, history)}>
          SIGN OUT
        </button>
      </div>
    )
  }
}

export default withContext(Home);