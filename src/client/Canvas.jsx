import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
// import signUp from './signUp.jsx';

        // <Link to="/signup" component={signUp}</Link>

// const Canvas = () => (
//   <div>
//     did this render?
//   </div>
// );

// // Patient.propTypes = {
// //   patient: PropTypes.object.isRequired,
// // };

// export default Canvas;


class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
    }
  }




  render() {
    return (
      <div>
        The map being rendered is:
        {this.props.match.params.id}
        <TestMap></TestMap>
      </div>
      )
  }

}

export default withRouter(Canvas);
