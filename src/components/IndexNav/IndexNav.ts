import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import IndexNavComponent from './IndexNavComponent';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(IndexNavComponent);
