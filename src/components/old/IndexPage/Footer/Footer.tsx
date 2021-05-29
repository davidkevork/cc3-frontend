import React from 'react';
import intl from 'react-intl-universal';
import { hot } from 'react-hot-loader';
import { NavLink } from 'react-router-dom';
import { enUS } from '../../../locales/en-US';
import './Footer.scss';

class Footer extends React.Component {
  public render() {
    return (
      <div className="footer">
        <div className="s-link">
          <a href="https://forum.smartcash.cc/"><i className="icon-s5" /></a>
          <a href="https://twitter.com/scashofficial"><i className="icon-s1" /></a>
          <a href="https://discord.gg/BDUh8jr"><i className="icon-s4" /></a>
          <a href="https://www.reddit.com/r/smartcash/"><i className="icon-s3" /></a>
          <a href="https://github.com/SmartCash"><i className="icon-s2" /></a>
        </div>
        <div className="links">
          <span>© 2018 SmartCash</span>
          <NavLink title="Data Processing Policy" to="/policy">
            {intl.get('DATA_PROCESSING_POLICY').d(enUS.DATA_PROCESSING_POLICY)}
          </NavLink>
          <NavLink title="Terms and Conditions" to="/terms">
            {intl.get('TERMS_AND_CONDITIONS').d(enUS.TERMS_AND_CONDITIONS)}
          </NavLink>
        </div>
      </div>
    );
  }
}

export default hot(module)(Footer);
