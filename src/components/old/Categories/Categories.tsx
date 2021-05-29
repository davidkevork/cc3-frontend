import React from 'react';
import { hot } from 'react-hot-loader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import categoriesList from '../../schemas/categoriesList';

interface ICategoriesProps extends SelectProps {
  required: boolean;
  value: string;
  label: string;
  inputProps: {
    id: string;
    [arbitrary: string]: any;
  };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, child?: React.ReactNode) => void;
}

class Categories extends React.PureComponent<ICategoriesProps> {
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
            Object.keys(categoriesList).map((element) =>
              <ListItem className="select" value={element} key={element}>{categoriesList[element].name}</ListItem>,
            )
          }
        </Select>
      </FormControl>
    );
  }
}

export default hot(module)(Categories);
