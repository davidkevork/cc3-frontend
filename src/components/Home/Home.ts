
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../reducers';
import { store } from '../../store/configureStore';
import HomeComponent from './HomeComponent';

const mapDispatchToProps = () => ({
  deleteCar: async (carId: string): Promise<void> => {
    try {
      await axios({
        method: 'DELETE',
        url: `https://api.cc3-david.com/car/${carId}`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      toast.error('Failed to delete car');
    }
  },
  buyCarInsurance: async (carId: string): Promise<void> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `https://api.cc3-david.com/car/${carId}/insurance`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error('Failed to buy insurance');
    }
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
