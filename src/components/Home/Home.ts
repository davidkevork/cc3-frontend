
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/const';
import { RootState } from '../../reducers';
import { store } from '../../store/configureStore';
import HomeComponent from './HomeComponent';

const mapDispatchToProps = () => ({
  deleteCar: async (carId: string): Promise<void> => {
    try {
      await axios({
        method: 'DELETE',
        url: `${API_URL}/car/${carId}`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Car deleted successfully');
    } catch (error) {
      toast.error('Failed to delete car');
    }
  },
  buyCarInsurance: async (carId: string): Promise<void> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/car/${carId}/insurance`,
        headers: {
          Authorization: `Bearer ${store.getState().user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Car insurance purchased successfully');
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
