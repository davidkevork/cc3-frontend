import React from 'react';
import Select from 'react-select';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { ActionMeta, ValueType } from 'react-select/lib/types';
import currenciesList from '../../schemas/currenciesList';
import { isEmpty } from '../../helpers/isEmpty';
import './Currencies.scss';

interface ICurrenciesProps {
  required: boolean;
  value: string;
  label: string;
  inputProps: {
    id: string;
    [arbitrary: string]: any;
  };
  onChange: (value: string) => void;
  classes: any;
  theme: any;
}

interface IvalueInterface {
  value: string;
  label: string;
}

interface ICurrenciesState {
  value: string;
  single: null | IvalueInterface;
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    marginTop: '12px',
    marginBottom: '8px',
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    maxHeight: '800px',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
  },
});

function NoOptionsMessage(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }: { inputRef: any }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: any) {
  return (
    <TextField
      fullWidth={true}
      required={props.selectProps.required}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props: any) {
  return (
    <ListItem
      value={props.value}
      component="div"
      className="country-select"
      selected={props.isSelected}
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </ListItem>
  );
}

function Placeholder(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props: any) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: any) {
  return <div className={props.selectProps.classes.valueContainer} data-index="5">{props.children}</div>;
}

function Menu(props: any) {
  return (
    <Paper square={true} className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Currencies extends React.PureComponent<ICurrenciesProps, ICurrenciesState> {
  private Currencies = Object.keys(currenciesList).map((element) => {
    return { value: element, label: `${element} - ${currenciesList[element]}` };
  });
  constructor(props: ICurrenciesProps) {
    super(props);
    let single: null | IvalueInterface = null;
    single = isEmpty(this.props.value) ? null : {
      value: this.props.value,
      label: `${this.props.value} - ${currenciesList[this.props.value]}`,
    };
    this.state = {
      value: this.props.value,
      single,
    };
  }
  public static getDerivedStateFromProps(nextProps: ICurrenciesProps, prevState: ICurrenciesState) {
    if (nextProps.value !== prevState.value) {
      let single: null | IvalueInterface = null;
      single = isEmpty(nextProps.value) ? null : {
        value: nextProps.value,
        label: `${nextProps.value} - ${currenciesList[nextProps.value]}`,
      };
      return {
        value: nextProps.value,
        single,
      };
    }
    return null;
  }
  private onChange = (value: ValueType<IvalueInterface>, action: ActionMeta) => {
    const options = [
      'select-option',
      'remove-value',
      'deselect-option',
    ];
    if (options.includes(action.action) && value !== null && value !== undefined && !Array.isArray(value)) {
      this.setState({
        single: {
          value: value.value,
          label: `${value.value} - ${currenciesList[value.value]}`,
        },
      });
      this.props.onChange(value.value);
    } else if (action.action === 'clear') {
      this.setState({
        single: null,
      });
    }
  }
  public render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: (base: any) => ({
        ...base,
        'color': theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        {/*
        // @ts-ignore */}
        <Select
          // @ts-ignore
          classes={classes}
          styles={selectStyles}
          inputId={this.props.inputProps.id}
          name={this.props.inputProps.name}
          options={this.Currencies}
          textFieldProps={{
            label: this.props.label,
            InputLabelProps: {
              shrink: true,
            },
          }}
          required={this.props.required}
          components={components}
          value={this.state.single}
          onChange={this.onChange}
          isClearable={true}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          menuPlacement="bottom"
          menuPosition="fixed"
        />
      </div>
    );
  }
}

// @ts-ignore
export default hot(module)(withStyles(styles, { withTheme: true })(Currencies));
