import React from 'react';
import Select from 'react-select';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { ActionMeta, ValueType } from 'react-select/lib/types';
import countryList from '../../schemas/countryList';
import { isEmpty } from '../../helpers/isEmpty';
import { enUS } from '../../locales/en-US';
import './Countries.scss';

interface ICountriesProps {
  required: boolean;
  value: string | string[];
  label: string;
  inputProps: {
    id: string;
    [arbitrary: string]: any;
  };
  onChange: (value: string | string[]) => void;
  classes: any;
  theme: any;
  multiple: boolean | undefined;
}

interface IvalueInterface {
  value: string;
  label: string;
}

interface ICountriesState {
  value: string | string[];
  single: null | IvalueInterface;
  multi: IvalueInterface[];
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
  const data = props.children[0];
  if (Array.isArray(data)) {
    const child = [ props.children[1] ];
    const dataMultiple: string[] = [];
    data.map((element: any) => dataMultiple.push(element.props.data.label));
    let dataMultipleValue = dataMultiple.join(', ');
    // tslint:disable-next-line:max-line-length
    dataMultipleValue = dataMultipleValue.length > 27 ? `${dataMultipleValue.substring(0, 24).trim()}...` : dataMultipleValue;
    return <div className={props.selectProps.classes.valueContainer} data-index="5">{dataMultipleValue} | {child}</div>;
  }
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

class Countries extends React.PureComponent<ICountriesProps, ICountriesState> {
  private Countries = Object.keys(countryList).map((element) => {
    return { value: element, label: countryList[element].name };
  });
  constructor(props: ICountriesProps) {
    super(props);
    let single: null | IvalueInterface = null;
    let multi: IvalueInterface[] = [];
    if (isEmpty(this.props.value) || this.props.value.includes('EMPTY')) {
      single = null;
      multi = [];
    } else if (Array.isArray(this.props.value)) {
      this.props.value.map((element) => {
        if (element !== 'EMPTY') {
          multi.push({ value: element, label: countryList[element].name });
        }
      });
    } else {
      single = { value: this.props.value, label: countryList[this.props.value].name };
    }
    this.state = {
      value: this.props.value,
      single,
      multi,
    };

    if (this.props.multiple) {
      // tslint:disable-next-line:max-line-length
      this.Countries.unshift({ value: 'CHOOSE', label: intl.get('PROFILE.ALL_COUNTRIES').d(enUS.PROFILE.ALL_COUNTRIES) });
    }
  }
  public static getDerivedStateFromProps(nextProps: ICountriesProps, prevState: ICountriesState) {
    if (nextProps.value !== prevState.value) {
      let single: null | IvalueInterface = null;
      let multi: IvalueInterface[] = [];
      if (isEmpty(nextProps.value) || nextProps.value.includes('EMPTY')) {
        single = null;
        multi = [];
      } else if (Array.isArray(nextProps.value)) {
        nextProps.value.map((element) => {
          if (element !== 'EMPTY') {
            multi.push({ value: element, label: countryList[element].name });
          }
        });
      } else {
        single =  {value: nextProps.value, label: countryList[nextProps.value].name };
      }
      return {
        value: nextProps.value,
        single,
        multi,
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
    if (options.includes(action.action) && value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          this.props.onChange([ 'EMPTY' ]);
        } else {
          const finalValue: string[] = [];
          value.forEach((element) => finalValue.push(element.value));
          this.props.onChange(finalValue);
        }
      } else {
        this.props.onChange(value.value);
      }
    } else if (action.action === 'clear') {
      this.setState({
        single: null,
        multi: [],
      });
      this.props.onChange(this.props.multiple ? [ 'EMPTY' ] : '');
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
          options={this.Countries}
          textFieldProps={{
            label: this.props.label,
            InputLabelProps: {
              shrink: true,
            },
          }}
          required={this.props.required}
          components={components}
          value={this.props.multiple ? this.state.multi : this.state.single}
          onChange={this.onChange}
          isClearable={true}
          closeMenuOnSelect={this.props.multiple ? false : true}
          hideSelectedOptions={false}
          isMulti={this.props.multiple}
          maxMenuHeight={600}
          menuPlacement="bottom"
          menuPosition="fixed"
        />
      </div>
    );
  }
}

// @ts-ignore
export default hot(module)(withStyles(styles, { withTheme: true })(Countries));
