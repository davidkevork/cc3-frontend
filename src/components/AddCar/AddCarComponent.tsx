import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import HomeNav from '../HomeNav/HomeNav';
import { carMake, carModel } from '../../constants/carModelList';
import { IUserReducerState } from '../../reducers/reducer_user';
import { JsonObject } from '../../typings/common';
import './AddCar.css';

interface IAddCarState {
  carMake?: string;
  carModel?: string;
  carYear?: string;
  carRego?: string;
  carRegoDetails?: JsonObject;
}

interface IAddCarProps {
  checkCarRego: (rego?: string) => Promise<JsonObject | undefined>;
  addCar: (
    carMake?: string,
    carModel?: string,
    carYear?: string,
    carRego?: string,
  ) => Promise<JsonObject | undefined>;
  user: IUserReducerState;
}

class AddCar extends Component<IAddCarProps, IAddCarState> {
  constructor(props: IAddCarProps) {
    super(props);

    this.state = {
      carMake: undefined,
      carModel: undefined,
      carYear: undefined,
      carRego: undefined,
      carRegoDetails: undefined,
    };
  }
  private onChangeCarMake = (event: React.ChangeEvent<{}>, value: string) => {
    this.setState({ carMake: value });
  };
  private onChangeCarModel = (event: React.ChangeEvent<{}>, value: string) => {
    this.setState({ carModel: value });
  };
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  private addCar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await this.props.addCar(this.state.carMake, this.state.carModel, this.state.carYear, this.state.carRego);
  };
  private checkCarRego = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const regoDetails = await this.props.checkCarRego(this.state.carRego);
    this.setState({ carRegoDetails: regoDetails });
  };
  private showCarRegoDetails = (): JSX.Element => {
    const details = this.state.carRegoDetails;
    if (!details) {
      return <div></div>;
    }

    return (
      <div>
        <p>
          <b>Car Registration Details</b>
        </p>
        {Object.keys(details).map((detail) => (
          <p key={detail}>
            {detail}: {details[detail]}
          </p>
        ))}
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <HomeNav />
        <Grid
          container={true}
          direction="row"
          justify="center"
          alignContent="center"
          alignItems="center"
          className="add-car"
        >
          <Grid item={true} lg={10} sm={10} xs={10}>
            <h2 className="text-center">Add Car</h2>
          </Grid>
          <Grid item={true} lg={10} sm={10} xs={10}>
            <Autocomplete
              freeSolo={false}
              id="carMake"
              disableClearable={true}
              options={carMake}
              fullWidth={true}
              onChange={this.onChangeCarMake}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid>
          <Grid item={true} lg={10} sm={10} xs={10}>
            {this.state.carMake ? (
              <Autocomplete
                freeSolo={false}
                id="carModel"
                disableClearable={true}
                // @ts-ignore
                options={this.state.carMake && carModel[this.state.carMake]}
                fullWidth={true}
                onChange={this.onChangeCarModel}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            ) : (
              <p>Select a car make to choose the car model</p>
            )}
          </Grid>
          <Grid item={true} lg={10} sm={10} xs={10}>
            <TextField
              id="carYear"
              label="Car Year"
              margin="normal"
              type="number"
              fullWidth={true}
              inputProps={{
                maxLength: 4,
                minLength: 4,
              }}
              onChange={this.handleChange}
              required={true}
            />
          </Grid>
          <Grid item={true} lg={10} sm={10} xs={10}>
            <TextField
              id="carRego"
              label="Car Rego"
              margin="normal"
              type="text"
              fullWidth={true}
              inputProps={{
                maxLength: 6,
                minLength: 6,
              }}
              onChange={this.handleChange}
              required={true}
            />
          </Grid>
          <Grid item={true} lg={10} sm={10} xs={10}>
            <Button
              variant="contained"
              color="primary"
              className="add-car-btn"
              onClick={this.checkCarRego}
            >
              Check Car Rego
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="add-car-btn"
              onClick={this.addCar}
            >
              Add Car
            </Button>
          </Grid>
        </Grid>

        <Grid
          container={true}
          alignContent="center"
          justify="center"
          className="add-car"
        >
          <Grid item={true} lg={10} sm={10} xs={10}>
            {this.showCarRegoDetails()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddCar;
