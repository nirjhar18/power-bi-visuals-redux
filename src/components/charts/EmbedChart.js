import React from "react";
import { connect } from "react-redux";
import * as chartsActions from "../../redux/actions/chartActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../../App.css";
import { debounce } from "lodash";

let state = null;
let EMBED_URL =
  "https://app.powerbi.com/reportEmbed?reportId=43522fc4-19b1-4ff4-b6b3-8bb22e1ad757&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d";
let REPORT_ID = "43522fc4-19b1-4ff4-b6b3-8bb22e1ad757";
let EMBED_TOKEN =
  "H4sIAAAAAAAEACWUtwrsCBYF_-WlWpA3vTCBvPdemaSW994M--_bw4QXKjlFcf_-Y6VPP6XfP__903j3ysLhQU3AoOFW6F60YN3NWL92hpgOTuVS0yhIOpATnSuryVjDfECtGMpn8fomJ0ACrhmghg5j3euVqPbjEwZpRb1XVtuPBKi3rJRECZFnSFd9mCdXZiUsx3P3lg62uXVpctMRYwjsXPDdZDZT76DNu5q551W5gBYJqdto31dSYm8pHj3Kl0ZX6omkzF79Tpb7p0Qvcyg-wuu7DEqh0RWSJ3egBu04XpEUSD59zEAyA4QnksT9rWHowFLf4Q6ZQSxyCR28CJO4GVo8lXTRvsGMlayzuPbcDsp6sTh1VxFI3SAVZSO7w2rh1spmmSq_OCThER2w3Xxsyhu_TRP2PhCL2kvt3-2jcNjnUIyz7oEynDXbCmRlwdpFDVMQzCQV_r5BcczceojO8rZqd8LR6hS2swUopNqLzAd96TkkfYsDWMwjl8H-o9sxIzNxXmJI8vA9kD51MbMHhC3SSd-Q0PnayFQxOSNXfOSfShLsgjo3VrZO1jB1_egs_5PFKNl7uAx1JAFk5c5Ve8hhMUOgVt49XfIqDnVojPFlhDc8idReJZeSqoFl67kEbG_Jnc-4pPGA1jGeDsJwc--OXxrM6NdgSqMOaSlHf9dqNXn9sbep_d2-avYLV_FYDPfSmpgtKtU5Jmd3rzmz7GtCNIf4EvBFPbrlL5Qat7AT1GqwHnasASOBCoMb8ZsKw4yjR53I4__85w-7PvM-qcXzy9niCf9RHwOoQcFOyoF67-jbL7QqahkJI1C3kKaLJkrYxBHTjuE0TZeKYtGzdiJCIyn9GKjbaNlHlRkOOyu_Uj9hBpFFcnvjYq-X5KzEuuBEezIqXKUF-lq8mr8M0HqnIBPZ5qLCHhiLAxyHrec7RG2hWh3qtsOhAsq-qouZCSZqjFhYgAv6UG9QBIOt_7k-7otVQ6ILxDCntf-jrmNw7a_ReNnU-QCF1AA7sOKg1T7xixNk1xj3xmw8YjEQvUkMw7JZVvooJ6MohwfCxchfwFwoXwF4kk_aVlb4eE3LfegSb5q4qiUN3WqqjfQUVQep8tXpouZ4nJcOnGFMUXmuGO7r-uuvfzQ_c12scvCz_ClPlk3xXg4z4BnXejCghPiXcptqTPdjLX4YGzF-67_RC48lEIcEAMy2LaHzFQ3Khief7ok2A6e-m2TYhYSp2MXv9aTVtzAS9BZ9vVHhCCLOWtGseNeZadzyfoa81ze0HOHmMppkA9Pf3Ii8ANGltreYdy0is8si2GzYm0T8MCLp-KIe8GBGYvPySr4zBJL3blav3XakUtbcbD014mAkqcOma092rrFRfKumEAs6hr7dJHplFOIEtQDmjHgMJH8vnrCNBwdr4CR7_Vszdp3MY6lcOaGuvndAuZ0oI9dP1BY07JScltUS8BBWGgyv-HIIRloCJAd4sQ8I3AAdDfV7L8SgmTus2vEtJ9_vEfersSwTIVtK5xbVRNb5aNA_zf_7Px3lOdDCBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19";
class EmbedChart extends React.Component {
  componentDidMount() {
    state = this.props.actions.getReduxStore();

    if (state.charts.Token_Expiry != null) {
      //Check if Token is about to expire
      var utc_current_seconds = Date.parse(new Date().toUTCString());
      var expiration_time_seconds = Date.parse(state.charts.Token_Expiry);
      if (utc_current_seconds + 900000 >= expiration_time_seconds)
        this.props.actions.getAccessToken();
    }
    //setInterval(this.getToken(), 900000);

    window.addEventListener(
      "resize",
      debounce((e) => {
        this.updateDimensions();
      }, 1000)
    );
  }

  getToken = () => {
    let tokenInfo = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "9ea200b1-f838-4d71-a815-3cce93d65d25",
      resource: "https://analysis.windows.net/powerbi/api",
      client_secret: "E7a0u0_c_8ak0IJV6xly.5qY1kh7~F_FHR",
    });
    this.props.actions.getAccessToken(tokenInfo);
  };

  updateDimensions = () => {
    //Force Update will update the CSS Prop
    //this.forceUpdate();
    //this.props.actions.handleLoadCharts();
    //window.location.reload();
    this.props.actions.renderVisualsResize();
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
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
                  visible: true,
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
              ["rendered", () => {}],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={
            window.innerWidth > 1000
              ? "report-style-class"
              : "report-style-class-2"
          }
          getEmbeddedComponent={(embedObject) => {
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
      renderVisualsResize: bindActionCreators(
        chartsActions.renderVisualsResize,
        dispatch
      ),
      getReduxStore: bindActionCreators(chartsActions.getReduxStore, dispatch),
      getAccessToken: bindActionCreators(tokenActions.getAccessToken, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmbedChart);
