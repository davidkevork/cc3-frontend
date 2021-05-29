import React from 'react';
import { hot } from 'react-hot-loader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import localesList from '../../schemas/localesList';

interface ILanguagesProps extends SelectProps {
  required: boolean;
  value: string;
  label: string;
  inputProps: {
    id: string;
    [arbitrary: string]: any;
  };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, child?: React.ReactNode) => void;
}

class Languages extends React.Component<ILanguagesProps> {
  constructor(props: ILanguagesProps) {
    super(props);
  }
  private onChange = (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => {
    this.props.onChange(event, child);
  }
  public render() {
    return (
      <FormControl required={this.props.required} fullWidth={this.props.fullWidth} margin="normal">
        <InputLabel htmlFor={this.props.inputProps.id}>{this.props.label}</InputLabel>
        <Select
          value={this.props.value}
          onChange={this.onChange}
          inputProps={this.props.inputProps}
          {...this.props}
        >
          {
            Object.keys(localesList).map(element =>
              <MenuItem value={element} key={element}>
                {localesList[element]}
              </MenuItem>,
            )
          }
        </Select>
      </FormControl>
    );
  }
}

export default hot(module)(Languages);
