import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { publicAuth, privateAuth } from '../../helpers/auth';
import RequireAuthComponent from './RequireAuthComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  auth: (
    props: any,
    auth: 'private' | 'public' | undefined,
    callback: (success: boolean) => void,
  ) => {
    return (auth === 'public' ?
      publicAuth(dispatch, props, callback)
      :
      privateAuth(dispatch, props, callback)
    );
  },
});
const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuthComponent);
