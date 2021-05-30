import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';

const AuthTabs = (props: any) => {
  const login = () => { props.history.push('/login'); };
  const register = () => { props.history.push('/register'); };
  return (
    <Tabs
      value={props.value}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      centered={true}
    >
      <Tab
        label={<span>Login</span>}
        value="login"
        onClick={login}
      />
      <Tab
        label={<span>Register</span>}
        value="register"
        onClick={register}
      />
    </Tabs>
  );
};

export default withRouter(AuthTabs);
 