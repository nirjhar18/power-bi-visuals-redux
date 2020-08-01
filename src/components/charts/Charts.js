import React from "react";
import { connect } from "react-redux";
import * as chartsActions from "../../redux/actions/chartActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ChartsList from "./ChartsList";

class Charts extends React.Component {
  componentDidMount() {
    const { charts, actions } = this.props;

    if (charts.length === 0) {
      actions.loadCharts().catch((error) => {
        alert("Loading charts failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Charts</h2>
        <ChartsList charts={this.props.charts} />
      </>
    );
  }
}

Charts.propTypes = {
  charts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    charts: state.charts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCharts: bindActionCreators(chartsActions.loadCharts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
