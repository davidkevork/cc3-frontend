import React from 'react';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import { enUS } from '../../../locales/en-US';
import { INDEXPAGE_USER, INDEXPAGE_BUSINESS } from '../../../constants/images';
import './Security.scss';

const role = (process.env.ROLE || '').toUpperCase();

const LIST_SECURITY = () => {
  // enUS.INDEX_PAGE.SECURITY.USER.LIST is an array
  // but intl.get() is only specified to type string and not array/object we will have ts error
  // @ts-ignore
  const list: object[] = role === 'USER' ?
    intl.get('INDEX_PAGE.SECURITY.USER.LIST') || enUS.INDEX_PAGE.SECURITY.USER.LIST
    :
    intl.get('INDEX_PAGE.SECURITY.BUSINESS.LIST') || enUS.INDEX_PAGE.SECURITY.BUSINESS.LIST;
  const template = (obj: any, index: number) => {
    return (
      <div className="info-item" key={index}>
        <div className="icon" dangerouslySetInnerHTML={{ __html: obj.ICON }}/>
        <div className="texts">
          <span className="title">{obj.TITLE}</span>
          <span className="content">{obj.CONTENT}</span>
        </div>
      </div>
    );
  };
  return (
    <div>{list.map((content: any, index: number) => template(content, index))}</div>
  );
};

const getText = (text: string) => {
  const path = `INDEX_PAGE.SECURITY.${role}.${text}`;
  const pathValue = path.split('.').reduce((o, i) => o[i], enUS);
  return intl.get(path).d(pathValue);
};

const USER_IMAGES = () => {
  return (
    <div className="user-images">
      <img className="img1" src={INDEXPAGE_USER.SECURITY.IMAGE1} />
    </div>
  );
};

const BUSINESS_IMAGES = () => {
  return (
    <div className="business-images">
      <img className="img1" src={INDEXPAGE_BUSINESS.SECURITY.IMAGE1} />
    </div>
  );
};

class Security extends React.Component {
  public render() {
    return (
      <div className="security " id="security">
        <h3 className="title">{getText('TITLE')}</h3>
        <div className="list">
          <LIST_SECURITY/>
        </div>
        {role === 'USER' ? <USER_IMAGES/> : <BUSINESS_IMAGES/>}
      </div>
    );
  }
}

export default hot(module)(Security);
