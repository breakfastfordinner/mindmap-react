
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

const App = () =>
    <div>
        <h1>Home</h1>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/canvas/:id" component={Canvas}/>
            <Route path="/auth" render={() => <Auth />} />
          </Switch>


        <footer>
            <Link to="/">Home </Link>
            <Link to="/auth">Auth</Link>
        </footer>

    </div>;

// class App extends React.Component {

//   render() {
//     return (
//       <div>
//         <Router>
//           <Switch>
//             <Route path="/auth" component={Auth} />
//             <Route path="/" component={Home} />
//           </Switch>
//         </Router>
//       </div>


//     )
//   }
// }


export default App;