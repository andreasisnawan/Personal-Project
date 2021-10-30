import * as React from 'react';

export interface IGenderSelectorProps {
    callback: any
}

export interface IGenderSelectorState {
    val: string
}

export default class GenderSelector extends React.PureComponent<IGenderSelectorProps, IGenderSelectorState> {
    constructor(props: IGenderSelectorProps) {
        super(props);
        this.state = {val: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event: any) {
        this.setState({val: event.target.value});
        this.props.callback(event.target.value)
        event.preventDefault();
      }
    
      render() {
        return (
          <form>
            <label>
              Gender:
              <select value={this.state.val} onChange={this.handleChange}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </form>
        );
      }
}
