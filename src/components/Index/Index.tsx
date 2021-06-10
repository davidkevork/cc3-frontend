import { Container, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import IndexNav from '../IndexNav/IndexNav';
import './Index.css';

class Index extends Component<any, any> {
  render() {
    return (
      <React.Fragment>
        {/*
        // @ts-ignore */}
        <IndexNav />
        <Container className="container" maxWidth="lg">
          <Typography variant="h3" className="center">
            Welcome to InsuranceCo.
          </Typography>
          <hr />
          <Typography variant="body1" className="center">
            InsuranceCo. offers the best car insurance in Victoria, Australia. We offer crash insurance analytics data to help to you buy the best car with the least accidents and drive. We offer discounted insurance policies for older cars.
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
