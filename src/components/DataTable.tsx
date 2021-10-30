import * as React from "react";
import { Table, Tag, Space } from "antd";

export interface IDataTableProps {
  data: Array<object>
  handlePage: any
  pagination: any
}

export interface IDataTableState {}

export default class DataTable extends React.Component<
  IDataTableProps,
  IDataTableState
> {
  constructor(props: IDataTableProps) {
    super(props);

    this.state = {};
  }

  columns = [
    {
      title: "Username",
      dataIndex: "login",
      key: "login",
      render: (val: any, record: any) => <span>{record.login.username}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val: any, record: any) => <span>{record.name.first + ' ' + record.name.last}</span>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Registered Date",
      dataIndex: "registered",
      key: "registered",
      render: (val: any, record: any) => <span>{new Date(record.registered.date).toLocaleString()}</span>
    },
  ];

  public render() {
    const pageSize = this.props.data.length

    return <Table columns={this.columns} 
        dataSource={this.props.data} 
        pagination={{
            position: ['bottomRight'],
            pageSize: pageSize/2,
            current: this.props.pagination.currentPage,
            total: pageSize,
            size: 'default',
            onChange: (current) => {
                this.setState({current})
                this.props.pagination.handleChangePage(current)
            }
          }}
    />;
  }
}
