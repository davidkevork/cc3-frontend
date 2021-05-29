import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './Page404.css';

class Page404 extends React.PureComponent {
  public render(): JSX.Element {
    return(
      <React.Fragment>
        <Grid container={true} className="page page-404">
          <Grid item={true}>
            <h2>Sorry page not found</h2>
            <h4><NavLink to="/">Go back to main page</NavLink></h4>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Page404;
