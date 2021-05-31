import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import AddCarComponent from './AddCarComponent';
import { toast } from 'react-toastify';
import axios from 'axios';
import { store } from './../../store/configureStore';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkCarRego: async (carRego?: string): Promise<void | {}> => {
    if (carRego && carRego.length !== 6) {
      toast.error('Car Registration has to be 6 characters');
      return {};
    }
    console.log(store.getState());
    try {
      const regoCheck = await axios({
        method: 'GET',
        url: `https://test.com/${carRego}`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`
        }
      });

      return regoCheck.data;
    } catch (error) {
      toast.error('Failed to check car registration');
      return {};
    }
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCarComponent);
