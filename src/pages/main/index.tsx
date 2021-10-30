import { Api } from "Api";
import DataTable from "components/DataTable";
import GenderSelector from "components/forms/GenderSelector";
import SearchInput from "components/forms/SearchInput";
import * as React from "react";

export interface IMainProps {}

export interface IMainState {
  data: Array<any>;
  keyword: string;
  gender: string;
  page: number;
}

const DEFAULT_QUERY_PARAMS = { page: 1, pageSize: 10, results: 10 };

export default class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      data: [],
      keyword: "",
      gender: "",
      page: 1,
    };
  }

  componentDidMount() {
    this.loadTableContent(DEFAULT_QUERY_PARAMS);
  }

  componentDidUpdate(prevProps: IMainProps, prevState: IMainState) {
    const normalizedVal = (val: string) => (val !== "" ? val : null);

    if (normalizedVal(prevState.keyword) !== normalizedVal(this.state.keyword)) {
        this.loadTableContent({
            ...DEFAULT_QUERY_PARAMS,
            keyword: this.state.keyword,
            });
    }
      
    if (normalizedVal(prevState.gender) !== normalizedVal(this.state.gender)) {
        this.loadTableContent({
            ...DEFAULT_QUERY_PARAMS,
            gender: this.state.gender,
            });
    }

    if (prevState.page !== this.state.page) {
        this.loadTableContent({
            ...DEFAULT_QUERY_PARAMS,
            page: this.state.page,
        });
    }
  }

  loadTableContent(params: any) {
    Api.getUsers(params).then((res) => {
      this.setState({ data: res.data.results });
    });
  }

  public render() {
    const { data, page } = this.state;
    return (
      <>
        <SearchInput
          callback={(val: string) => this.setState({ keyword: val })}
        />
        <GenderSelector
          callback={(val: string) => this.setState({ gender: val })}
        />
        <DataTable
          data={data}
          handlePage={(pageNumber: number) =>
            this.setState({ page: pageNumber })
          }
          pagination={{
            handleChangePage: (pageNumber: number) =>
              this.setState({ page: pageNumber }),
            currentPage: page,
          }}
        />
      </>
    );
  }
}
