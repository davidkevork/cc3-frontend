import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import HomeNav from '../HomeNav/HomeNav';
import { carMake, carModel } from '../../constants/carModelList';
import './Home.css';

interface IHomeState {
  carMake?: string;
  carModel?: string;
  carYear?: number;
  carRego?: string;
}

class Home extends Component<any, IHomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      carMake: undefined,
      carModel: undefined,
      carYear: undefined,
      carRego: undefined,
    };
  }
  componentDidMount() {
    // const options = {
    //   method: 'GET',
    //   url: 'https://vicroads-registration-check.p.rapidapi.com/vicroads/YIP348',
    //   headers: {
    //     'x-rapidapi-key': '1c118fab90msh2a4f0e3e13a3305p1a7a82jsn94d20379c9a2',
    //     'x-rapidapi-host': 'vicroads-registration-check.p.rapidapi.com'
    //   }
    // };
    // // @ts-ignore
    // axios(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
    // {"registration_number": "YIP348", "registration_status": "Current - 28/04/2022", "vehicle": "2011 BLUE KIA WAGON", "vin_number": "KNAMH817MB6407800", "engine_number": "G6DCAS608018", "registration_seriel_number": "6083288", "compliance_plate_date": "01/2011", "sanction": "None", "goods_carrying_vehicle": "No", "transfer_in_dispute": "No"}
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
  render() {
    return (
      <React.Fragment>
        <HomeNav />

        <Grid container={true} direction="row" justify="center" alignItems="center" lg={8} className="add-car">
          <Grid item={true} lg={10}>
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
          <Grid item={true} lg={10}>
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
          <Grid item={true} lg={10}>
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
          <Grid item={true} lg={10}>
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
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
