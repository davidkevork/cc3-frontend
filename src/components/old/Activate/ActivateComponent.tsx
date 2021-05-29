import React from 'react';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import IntlMessageFormat from 'intl-messageformat';
import { redirect } from '../../helpers/history';
import { UserBusinessActionTypes } from '../../actions/userBusiness';
import { IUserBusinessReducerState } from '../../reducers/reducer_user_business';
import IndexNav from '../../IndexNav/IndexNav';
import { enUS } from '../../locales/en-US';
import './Activate.scss';

interface IActivateComponentState {
  token: string | undefined;
  __html: string;
}

interface IActivateComponentProps {
  activate: (token: string) => void;
  match: {
    params: {
      token: string | undefined;
    },
  };
  userBusiness: IUserBusinessReducerState;
}

class ActivateComponent extends React.Component<IActivateComponentProps, IActivateComponentState> {
  constructor(props: IActivateComponentProps) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      __html: intl.get('ACTIVATE.PLEASE_WAIT').d(enUS.ACTIVATE.PLEASE_WAIT),
    };
    if (this.state.token !== undefined) {
      this.props.activate(this.state.token);
    }
  }
  public componentWillReceiveProps(nextProps: IActivateComponentProps) {
    if (nextProps.userBusiness.status === UserBusinessActionTypes.ACTIVATE_FAILURE
      && typeof nextProps.userBusiness.error === 'string') {
      this.setState({ __html: nextProps.userBusiness.error });
    } else if (nextProps.userBusiness.status === UserBusinessActionTypes.ACTIVATE_SUCCESS) {
      nextProps.userBusiness.role === 'user' ? redirect('/cards') : redirect('/locations');
    }
  }
  public render() {
    // tslint:disable-next-line:max-line-length
    const type = process.env.ROLE === 'user' ? intl.get('ACTIVATE.CARD').d(enUS.ACTIVATE.CARD) : intl.get('ACTIVATE.BUSINESS').d(enUS.ACTIVATE.BUSINESS);
    return (
      <React.Fragment>
        <IndexNav />
        <div className="page-activate">
          {this.state.token === undefined ?
            (
              <div className="activate-box">
                <i className="icon-sent-mail" />
                <h3 className="text-center">
                  {intl.get('ACTIVATE.VERIFY_EMAIL').d(enUS.ACTIVATE.VERIFY_EMAIL)}
                </h3>
                <p className="text-center">
                  {intl.get('ACTIVATE.ALMOST_THERE', { type }).d(
                    new IntlMessageFormat(enUS.ACTIVATE.ALMOST_THERE, 'en-US').format({ type }),
                  )}
                </p>
              </div>
            )
          :
            (
              <div className="activate-box">
                <h3 className="text-center" dangerouslySetInnerHTML={this.state} />
              </div>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(ActivateComponent);
