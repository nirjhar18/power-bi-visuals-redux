import React from "react";
import { connect } from "react-redux";
import * as chartsActions from "../../redux/actions/chartActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../../App.css";

let EMBED_URL =
  "https://app.powerbi.com/reportEmbed?reportId=43522fc4-19b1-4ff4-b6b3-8bb22e1ad757&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d";
let REPORT_ID = "43522fc4-19b1-4ff4-b6b3-8bb22e1ad757";
let EMBED_TOKEN =
  "H4sIAAAAAAAEACXSx66DVgAE0H95WyKZcmmRsqD33tldDDbNdDAQ5d_zokizGWlWR_P3jwuvfoTlz58_ThFd2skcvoeBXMpYGkNqKe9UHYLAsXKxLJEkRzhYFjkn0eRZvHeFM7pE25_sA2yLuOC3kK7UUwm3OAhx9sXtL5krPSjA7_XtxAR20lgsReJCAWsxAu1AQDTZNQTBa-lhYPezLwoT7EXB6cEVGAReGS4U1eI8bYigm4iQg1yh-4zYsqvkalSFgNQPXt3pW6VKlkwZEHNtqpWFXfddaAof6B0VhIlFg0s9GMSl68gmEHPvTbjRUcnqaDU8aHoYeKnstEfSuV6iqgv7UHmVbGU998t4LR77FUbnvRY52n8Kkp1uWQlypc_uxNV1xuzpLn6iPOnjmX4GB_9ipIhr99lLbNNmB8ORdvj5TTeWp0QmRHvxalV1hQUKku4iamKTC3ysEqMpA1o9Vb95hIdfiJ7tfQY6j51WwV9ymCx0uHrPY3eJfX30H4X8LIrzZfkqzyVnYlYqc1oTGzUaarwXfodlozvgG_2A68hORGnhjLc9rAxYwPwILJ7-alMNEU22RG5GzlA3vnw3REb4wFHnZa5kKvNUSz5m2WlXkF7eVmOaq4LjuWnvayjsqCQI51SJ07s7H2MrYmR0fArrdt_wSoGOR2mUbzmxDqrUIwVrjm35cVcbZx_vNcsvAQy-d_pZIzmY9OrsxjUckqV9zUIeKdCSYouN70hmjU0V2KreLfoCJ2RUZbENFApV2xsj5OAdUsTPHz_Cck3baFTX753d9KaqD-lZayHfTvqN4YcbgtUglkYM00WodBan-ie5IjKxGG5qvwZ8Kj5HxDrRfpxdOtdepgjWRTY2tqd5QaaxOgQ-rSniKW9zMt-FFazpNV-_akIUF5RsWVXF7R8lHTE8nsY2OMrVr2jy2Llzeg-MV5S12d02cB1h-2qsazfJIIvPKUjtYnxEYkc19Lxb1ZvUm5rx_MmsRnOsXcDIOcfD11ZTLoUVtLXXkqDrnNw9T-sRsCDk-O5Eg8iTDJfh0xiVyaXvbP9b1Jcb4mSXptGwZDHX53e_sX2IsLrURmstqTqV5HxQb0dgBij2PriWFbZKcarydTh5Exl2r4iOGYRL9vD--us_5muqq0WLf5XTjEkCyfTqF_l09SOcu7D2_l8FzXuA275UvzNplU1FV-VFAwYk2-bKOlu1OabgG28bw3AiPkCaubboGl3ObWbsw_YdiMcdn3JTPdeaoC5FaRDB_fjFqhiVE-cO77ba58MHnQvQuK4USkJrzJVVup65R_4UBv-8upTWLDkN3erXgEFwk3Qm985gexP5pCR5Y8mMgCkBuAeeXTI5wW_Z01kF_NbTEXffFmr8AEC_hjzFS26PBAWGrTYUG14iDdVLyItlBc33zbqBgDA_blUUrCSLm_NNRQqlzsRjJeMcqyZ_n5mV9CFmAOQzv4R7NBllnM70iMq6tG6JL-fhgTCqT5NZPJUS6bzutwn456iha5NWNbLshO-Lnim2wAr-Y_7nX0Gp-LrCBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19";

class EmbedChart extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <>
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: REPORT_ID,
            embedUrl: EMBED_URL,
            accessToken: EMBED_TOKEN,
            tokenType: models.TokenType.Embed,
            permissions: models.Permissions.All,
            viewMode: models.ViewMode.viewMode,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                () => {
                  this.props.actions.loadCharts();
                },
              ],
              [
                "rendered",
                () => {
                  console.log("rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"report-style-class"}
          getEmbeddedComponent={(embedObject) => {
            console.log("Embedded object  received");
            this.props.actions.getEmbeddedReport(embedObject);
          }}
        />
      </>
    );
  }
}

EmbedChart.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    report: state.report,
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmbedChart);
