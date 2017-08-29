
// import React from 'react'

// const App = () => <h1>Hello breakfastfordinner!</h1>

// export default App

import React from 'react';
import Home from './Home.jsx';
import Auth from './Auth.jsx';
import Canvas from './Canvas.jsx';


import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

// const App = () =>
//     <div>
//         <h1>Home</h1>
//           <Switch>
//             <Route exact path="/" render={()=><Home auth="213"/>} />
//             <Route path="/canvas/:id" component={Canvas}/>
//             <Route path="/auth" component={Auth} />
//           </Switch>

//         <footer>
//             <Link to="/">Home </Link>
//             <Link to="/auth">Auth</Link>
//         </footer>

//     </div>;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    //an ajax call to check if session exist
    

  }

  handleLogin(userObj) {
    this.setState({
      signedIn: true,
      user: userObj
    })
    //send a post request to server and 
  }



  render() {
    return (
      <div>
        <h1>Home</h1>
          <Switch>
            <Route exact path="/" render={()=><Home auth="213"/>} />
            <Route path="/canvas/:id" component={Canvas}/>
            <Route path="/auth" component={Auth} />
          </Switch>

        <footer>
            <Link to="/">Home </Link>
            <Link to="/auth">Auth</Link>
        </footer>

      </div>


    )
  }
}


export default App;