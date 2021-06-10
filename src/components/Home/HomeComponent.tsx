import React, { Component } from 'react';
import axios from 'axios';
import { JsonObject } from '../../typings/common';
import HomeNav from '../HomeNav/HomeNav';
import './Home.css';
import { IUserReducerState } from '../../reducers/reducer_user';
import { Container, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Car from '../Car/Car';
import { API_URL } from '../../constants/const';

interface IHomeProps {
  deleteCar: (carId: string) => Promise<void>;
  buyCarInsurance: (carId: string) => Promise<void>;
  user: IUserReducerState;
}

interface IHomeState {
  carData: Array<JsonObject>;
}

class HomeComponent extends Component<IHomeProps, IHomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      carData: [],
    };
  }
  async componentDidMount() {
    await this.fetchCars();
  }
  private fetchCars = async (): Promise<void> => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/car`,
        headers: {
          Authorization: `Bearer ${this.props.user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      this.setState({
        carData: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  private listCars = () => {
    return this.state.carData.map((carData) => (
      <Car
        carData={carData}
        key={carData.id}
        deleteCar={this.props.deleteCar}
        buyCarInsurance={this.props.buyCarInsurance}
        fetchCars={this.fetchCars}
      />
    ));
  };
  render() {
    return (
      <React.Fragment>
        <HomeNav />
        <Container maxWidth="lg">
          <Grid container={true} justify="flex-end">
            <Typography variant="body1">
              Click <NavLink to="/addcar">here</NavLink> to add cars
            </Typography>
          </Grid>
          <Grid
            container={true}
            className="car-list"
            justify="center"
            spacing={2}
          >
            {this.listCars()}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default HomeComponent;
