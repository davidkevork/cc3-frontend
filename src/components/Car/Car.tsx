import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { JsonObject } from '../../typings/common';

interface CarProps {
  deleteCar: (carId: string) => Promise<void>;
  buyCarInsurance: (carId: string) => Promise<void>;
  fetchCars: () => Promise<void>;
  carData: JsonObject;
}

const Car = (props: CarProps) => {
  const buyInsurance = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await props.buyCarInsurance(props.carData.id);
    await props.fetchCars();
  };
  const deleteCar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await props.deleteCar(props.carData.id);
    await props.fetchCars();
  };
  return (
    <Grid item={true}>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Car make: {props.carData.carMake}
          </Typography>
          <Typography variant="body1">
            Car model: {props.carData.carModel}
          </Typography>
          <Typography variant="body1">
            Car year: {props.carData.carYear}
          </Typography>
          <Typography variant="body1">
            Car rego: {props.carData.carRego}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container={true} justify={'space-between'}>
            <Button
              size="small"
              data-id={props.carData.id}
              onClick={buyInsurance}
              disabled={props.carData.insuranceId}
            >
              Buy Insurance
            </Button>
            <IconButton onClick={deleteCar}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Car;
