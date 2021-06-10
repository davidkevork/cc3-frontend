import React, { Component } from 'react';
import axios from 'axios';
import HomeNav from '../HomeNav/HomeNav';
import { IUserReducerState } from '../../reducers/reducer_user';
import { API_URL } from '../../constants/const';
import {
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Select,
} from '@material-ui/core';
import './QuickSight.css';

interface IQuickSightProps {
  user: IUserReducerState;
}

interface IQuickSightState {
  quickSightUrl?: string;
  dashboardId: string;
}

class QuickSightComponent extends Component<
  IQuickSightProps,
  IQuickSightState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      quickSightUrl: undefined,
      dashboardId: 'select',
    };
  }
  private fetchQuickSightUrl = async (dashboardId: string): Promise<void> => {
    try {
      if (dashboardId === 'select') {
        return;
      }
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/quicksight/${dashboardId}`,
        headers: {
          Authorization: `Bearer ${this.props.user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      this.setState({ quickSightUrl: response.data.url });
    } catch (error) {
      console.log(error);
    }
  };
  private handleChange = async (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const dashboardId = event.target.value as string;
    this.setState({
      dashboardId,
    });
    await this.fetchQuickSightUrl(dashboardId);
  };
  render() {
    return (
      <React.Fragment>
        <HomeNav />
        <Container className="quicksight-container">
          <Grid container={true} justify="flex-end">
            <Grid item={true}>
              <Select
                value={this.state.dashboardId}
                onChange={this.handleChange}
              >
                <MenuItem value="select">Select a dashboard to view</MenuItem>
                <MenuItem value="7dc34161-994b-4c05-a0de-07bf7da429c7">
                  Accident Event Analysis
                </MenuItem>
                <MenuItem value="e4feba5b-2039-4d9c-bb21-0643f14b6f82">
                  Accident Location Analysis
                </MenuItem>
                <MenuItem value="b40fa29a-b4a3-4efe-832d-b9a1c8614fd0">
                  Accident Chainage Analysis
                </MenuItem>
                <MenuItem value="6aac7fc3-f3f5-47b3-951c-953bde2a1fd8">
                  Atmospheric Condition Analysis
                </MenuItem>
                <MenuItem value="fc1c50f1-2204-4476-9c3b-dadf721b10d5">
                  Road Surface Condition Analysis
                </MenuItem>
                <MenuItem value="32ffdadb-2f5a-4321-ac48-64735173da2e">
                  Vehicle Analysis
                </MenuItem>
                <MenuItem value="7d831755-a241-4144-a0d5-b641593e80d9">
                  Person Analysis
                </MenuItem>
                <MenuItem value="ad27d1d5-abef-4c1e-b208-8f157b456abb">
                  Subdca Analysis
                </MenuItem>
                <MenuItem value="b18550ae-7809-4588-be28-6699366326fc">
                  Node Analysis
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
          {this.state.quickSightUrl && (
            <CardMedia
              className="quicksight-iframe"
              component="iframe"
              src={this.state.quickSightUrl}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default QuickSightComponent;
