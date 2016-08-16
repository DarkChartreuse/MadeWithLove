import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();
const muiTheme = getMuiTheme();

const App = ({ children, loginUser }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Navbar />
      {(document.body.clientWidth <= 500 && !loginUser.first_name) ? <div className="moboxnoLogin"></div> : null
      }
      {(document.body.clientWidth <= 500 && loginUser.first_name && loginUser.isChef) ? <div className="moboxLoginChef"></div> : null
      }
      {(document.body.clientWidth <= 500 && loginUser.first_name && loginUser.isChef === false) ? <div className="moboxLoginUser"></div> : null
      }

      {children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.object,
};

const mapStateToProps = ({ loginUser }) => ({ loginUser });

App.propTypes = {
  loginUser: React.PropTypes.object,
};

export default connect(mapStateToProps, null)(App);
