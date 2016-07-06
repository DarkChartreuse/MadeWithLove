import React from 'react';
import Navbar from './Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();
const muiTheme = getMuiTheme();

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Navbar />
      {children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
