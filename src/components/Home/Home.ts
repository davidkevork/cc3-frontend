
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import HomeComponent from './HomeComponent';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(HomeComponent);
