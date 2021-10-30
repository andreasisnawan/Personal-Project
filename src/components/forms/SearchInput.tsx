import * as React from "react";

export interface ISearchInputProps {
  callback: any;
}

export interface ISearchInputState {
  val: string;
}

export default class SearchInput extends React.PureComponent<
  ISearchInputProps,
  ISearchInputState
> {
  constructor(props: ISearchInputProps) {
    super(props);
    this.state = {
      val: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ val: event.target.value });
  }

  handleSubmit(event: any) {
    this.props.callback(this.state.val)
    event.preventDefault();
  }

  public render() {
    const { val } = this.state;
    const { callback } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={val} onChange={this.handleChange} placeholder="keyword"/>
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
}
