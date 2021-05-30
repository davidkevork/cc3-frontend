import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { publicAuth, privateAuth } from '../../helpers/auth';
import RequireAuthComponent from './RequireAuthComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  auth: async (
    props: any,
    auth: 'private' | 'public' | undefined,
    callback: (success: boolean) => void,
  ) => {
    return await (auth === 'public' ?
      await publicAuth(dispatch, props, callback)
      :
      await privateAuth(dispatch, props, callback)
    );
  },
});
const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuthComponent);
