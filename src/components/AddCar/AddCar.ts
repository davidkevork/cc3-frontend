import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import AddCarComponent from './AddCarComponent';
import { toast } from 'react-toastify';
import { JsonObject } from '../../typings/common';
import axios from 'axios';
import { store } from './../../store/configureStore';
import { API_URL } from '../../constants/const';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkCarRego: async (carRego?: string): Promise<JsonObject | undefined> => {
    if (carRego && carRego.length !== 6) {
      toast.error('Car Registration has to be 6 characters');
      return;
    }
    try {
      const regoCheck = await axios({
        method: 'GET',
        url: `${API_URL}/car/registration/${carRego}`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(regoCheck);

      return regoCheck.data;
    } catch (error) {
      toast.error('Failed to check car registration');
      return;
    }
  },
  addCar: async (
    carMake?: string,
    carModel?: string,
    carYear?: string,
    carRego?: string,
  ): Promise<JsonObject | undefined> => {
    if (!carMake || !carModel || !carYear || !carRego) {
      toast.error('Car Make, Model, Year or Rego cannot be empty');
      return;
    }
    if (carRego && carRego.length !== 6) {
      toast.error('Car Registration has to be 6 characters');
      return;
    }
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/car`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
        data: {
          carMake,
          carModel,
          carYear: parseInt(carYear),
          carRego,
        },
      });

      toast.success('Car added successfully');
    
      return response.data;
    } catch (error) {
      toast.error('Failed to add car');
      return;
    }
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCarComponent);
