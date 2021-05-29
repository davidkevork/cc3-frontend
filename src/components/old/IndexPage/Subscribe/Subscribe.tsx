import React from 'react';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import { enUS } from '../../../locales/en-US';
import './Subscribe.scss';

const role = (process.env.ROLE || '').toUpperCase();

const getText = (text: string) => {
  const path = `INDEX_PAGE.SUBSCRIBE.${text}`;
  const pathValue = path.split('.').reduce((o, i) => o[i], enUS);
  return intl.get(path).d(pathValue);
};

class Subscribe extends React.Component {
  public render() {
    // tslint:disable-next-line:max-line-length
    const userFormAction = 'https://smartcash.us17.list-manage.com/subscribe/post?u=11bca91f2dda8669512d9f8c7&id=a92e64e645';
    // tslint:disable-next-line:max-line-length
    const businessFormAction = 'https://smartcash.us17.list-manage.com/subscribe/post?u=11bca91f2dda8669512d9f8c7&id=27b3472879';
    const userInputName = 'b_11bca91f2dda8669512d9f8c7_a92e64e645';
    const businessInputName = 'b_11bca91f2dda8669512d9f8c7_27b3472879';
    return (
      <div className="subscribe">
        <span className="title">{getText('TITLE')}</span>
        <span className="subtitle">{getText('SUBTITLE')}</span>
        <form
          action={role === 'USER' ? userFormAction : businessFormAction}
          method="post"
          className="validate"
          target="_blank"
        >
          <input placeholder={getText('INPUT_PLACEHOLDER')} type="email" name="EMAIL" />
          <div className="inputHidden" aria-hidden="true">
            <input type="text" name={role === 'USER' ? userInputName : businessInputName}/>
          </div>
          <button type="submit">{getText('SUBMIT')}</button>
        </form>
      </div>
    );
  }
}

export default hot(module)(Subscribe);
