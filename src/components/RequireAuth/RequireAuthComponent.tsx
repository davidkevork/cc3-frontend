import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IUserReducerState } from '../../reducers/reducer_user';
import { getToken } from '../../helpers/token';

interface IRequireAuthComponentState {
  readonly authDone: boolean;
}

interface IRequireAuthComponentProps {
  auth: (
    props: any,
    auth: 'private' | 'public' | undefined,
    callback: (success: boolean) => void,
  ) => void;
  user: IUserReducerState;
  type?: 'private' | 'public' | undefined;
  children?: any;
}

class RequireAuthComponent extends React.Component<
  IRequireAuthComponentProps,
  IRequireAuthComponentState
> {
  constructor(props: any) {
    super(props);
    const data = getToken();
    const authDone = this.props.type === 'public' && data.error !== undefined ? true : false;
    this.state = { authDone };
  }
  public render() {
    return (
      <React.Fragment>
        {this.state.authDone ?
          this.props.children
          :
          <LinearProgress
            color="primary"
            style={{
              display: 'absolute',
              top: '0',
              left: '0',
              right: '0',
            }}
          />
        }
      </React.Fragment>
    );
  }
}

export default RequireAuthComponent;
