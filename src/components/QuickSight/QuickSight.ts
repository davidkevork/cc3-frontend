import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import QuickSightComponent from './QuickSightComponent';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(QuickSightComponent);
