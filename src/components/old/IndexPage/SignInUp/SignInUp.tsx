import React from 'react';
import { hot } from 'react-hot-loader';
import './SignInUp.scss';
import { NavLink } from 'react-router-dom';
import intl from 'react-intl-universal';
import { enUS } from '../../../locales/en-US';
import { INDEXPAGE_USER, INDEXPAGE_BUSINESS } from '../../../constants/images';
import { scrollTo } from '../../../helpers/scrollTo';

const role = (process.env.ROLE || '').toUpperCase();

const getText = (text: string) => {
  const path = `INDEX_PAGE.SIGNINUP.${role}.${text}`;
  const pathValue = path.split('.').reduce((o, i) => o[i], enUS);
  return intl.get(path).d(pathValue);
};

const USER_IMAGES = () => {
  return (
    <div className="images">
      <img className="phone1" src={INDEXPAGE_USER.SIGNINUP.IMAGE2} />
      <img className="phone2" src={INDEXPAGE_USER.SIGNINUP.IMAGE3} />
      <img className="background" src={INDEXPAGE_USER.SIGNINUP.IMAGE1} />
    </div>
  );
};

const BUSINESS_IMAGES = () => {
  return (
    <div className="images">
      <img className="phone1" src={INDEXPAGE_BUSINESS.SIGNINUP.IMAGE2} />
      <img className="phone2" src={INDEXPAGE_BUSINESS.SIGNINUP.IMAGE3} />
      <img className="background" src={INDEXPAGE_BUSINESS.SIGNINUP.IMAGE1} />
    </div>
  );
};

const USER_BUTTONS = () => {
  const buySmartCardLinkk = 'https://smartcashpay.com/';
  // @ts-ignore
  const downloadGiftCard = () => SmartCard && SmartCard.openModal();
  return (
    <div>
      <a className="button primary" onClick={downloadGiftCard}>
        {getText('BUTTON_PRIMARY')}
      </a>
      <NavLink className="button primary" to="/register">
        {getText('BUTTON_PRIMARY_REGISTER')}
      </NavLink>
      <a className="button secondary" title={getText('BUTTON_SECONDARY')} href={buySmartCardLinkk}>
        {getText('BUTTON_SECONDARY')}
      </a>
    </div>
  );
};

const BUSINESS_BUTTONS = () => {
  const smartPayLink = 'https://play.google.com/store/apps/details?id=cc.smartcash.pos';
  return (
    <div>
      <NavLink className="button primary" to="/register" title={getText('BUTTON_PRIMARY')}>
        {getText('BUTTON_PRIMARY')}
      </NavLink>
      <a className="button secondary" title={getText('BUTTON_SECONDARY')} href={smartPayLink}>
        {getText('BUTTON_SECONDARY')}
      </a>
    </div>
  );
};

class SignInUp extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  private arrowDownSection = () => {
    scrollTo('.howItWorks');
  }
  public render() {
    return (
      <div className="signinup">
        {role === 'USER' ? <USER_IMAGES/> : <BUSINESS_IMAGES/>}
        <div className="text">
          <h3 className="title">{getText('TITLE')}</h3>
          <p className="subtitle">{getText('SUBTITLE')}</p>
          {role === 'USER' ? <USER_BUTTONS/> : <BUSINESS_BUTTONS/>}
          <i className="icon-down-arrow" onClick={this.arrowDownSection}/>
        </div>
      </div>
    );
  }
}

export default hot(module)(SignInUp);
