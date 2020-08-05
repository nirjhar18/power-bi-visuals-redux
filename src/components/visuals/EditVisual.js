import React from "react";
import { connect } from "react-redux";
import * as chartsActions from "../../redux/actions/chartActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../../App.css";
import { debounce } from "lodash";

class EditVisual extends React.Component {
  componentDidMount() {}

  render() {
    return <></>;
  }
}

EditVisual.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    report: state.report,
    numberOfColumns: state.LayoutShowcaseState,
    columns: state.columns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      handleLoadCharts: bindActionCreators(
        chartsActions.handleLoadCharts,
        dispatch
      ),
      loadCharts: bindActionCreators(chartsActions.loadCharts, dispatch),
      getEmbeddedReport: bindActionCreators(
        chartsActions.getEmbeddedReport,
        dispatch
      ),
      updateLayoutColumns: bindActionCreators(
        chartsActions.updateLayoutColumns,
        dispatch
      ),
      removeVisualsState: bindActionCreators(
        chartsActions.removeVisualsState,
        dispatch
      ),
      renderVisualsResize: bindActionCreators(
        chartsActions.renderVisualsResize,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVisual);
