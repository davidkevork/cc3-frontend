import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/icons/Menu';
import { IUserReducerState } from '../../reducers/reducer_user';
import './IndexNav.css';

interface IIndexNavState {
  readonly isOpen: boolean;
  readonly isLoggedIn: boolean;
}
interface IIndexNavProps {
  user: IUserReducerState;
}

const LoginSignUp = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    !isLoggedIn ?
      <MenuList className="menu">
        <MenuItem disableRipple={true} disableTouchRipple={true}>
          <NavLink to="/login">Login</NavLink>
        </MenuItem>
        <MenuItem disableRipple={true} disableTouchRipple={true}>
          <NavLink to="/register">Register</NavLink>
        </MenuItem>
      </MenuList>
    :
      <MenuList className="menu">
        <MenuItem disableRipple={true} disableTouchRipple={true}>
          <NavLink to={'/home'}>
            Account
          </NavLink>
        </MenuItem>
      </MenuList>
  );
};

class IndexNav extends React.Component<IIndexNavProps, IIndexNavState> {
  constructor(props: any) {
    super(props);
    const isLoggedIn = this.props.user.userId !== undefined
                    && this.props.user.jwt !== undefined
                    && this.props.user.userId.length !== 0;
    this.state = {
      isOpen: false,
      isLoggedIn,
    };
  }
  private toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  public render() {
    return (
      <AppBar position="fixed" color="inherit">
        <Toolbar className="wrapper">
          <div>
            <IconButton onClick={this.toggleMenu} className="iconButton" aria-label="Menu">
              <Menu/>
            </IconButton>
          </div>
          <LoginSignUp isLoggedIn={this.state.isLoggedIn} />
          <SwipeableDrawer
            anchor="left"
            className="drawer"
            open={this.state.isOpen}
            onOpen={this.toggleMenu}
            onClose={this.toggleMenu}
          >
            <LoginSignUp isLoggedIn={this.state.isLoggedIn} />
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
}

export default IndexNav;
