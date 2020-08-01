import React from "react";
import "../../App.css";
import "../../styles/layout.css";
import "../../styles/style.css";
import { PowerBIEmbed } from "powerbi-client-react";

import { models } from "powerbi-client";
import "powerbi-report-authoring";

const ColumnsNumber = {
  One: 1,
  Two: 2,
  Three: 3,
};

const LayoutShowcaseConsts = {
  margin: 0,
  minPageWidth: 270,
};

var LayoutShowcaseState = {
  columns: ColumnsNumber.Three,
  layoutVisuals: null,
  layoutReport: null,
  layoutPageName: null,
  ref: null,
};

var xCoordinates = 0;
var yCoordinates = 0;

function ShowVisuals() {
  let EMBED_URL =
    "https://app.powerbi.com/reportEmbed?reportId=43522fc4-19b1-4ff4-b6b3-8bb22e1ad757&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d";
  let REPORT_ID = "43522fc4-19b1-4ff4-b6b3-8bb22e1ad757";
  let EMBED_TOKEN =
    "H4sIAAAAAAAEAB2StxKrWAJE_-Wld6uwArFVE-CdxMW7DC9AeM_U_vtqJu-g-_T5-4-ZXN8hyf_8949aQxvXoJ_KNe8p2Du2JLXuoozCri2FFTPD-am4V_jNpiHOGN7p08gGW5SLyObXWu34_ZwE1-6bVgH9VSzPTQ_GI0-At1SzNBKENnVPHj4OgnvvgkMP22yeiGMmpOPw79BMgrHzP71k4c_DUxaPctAdt1zOb5jrVap03ez2rCCG9whofekSMOnHxCbxspGTmUk4jyTNCUjBjbyTeEpsmHzm6ZUajr75hjGxL1DeGl9YIQPYdN9roF3Wr0HTfU9OFXjZW76y_Ehk47V_ePVkYgSLk2Z4BbXIerd_XQJi-MtrxVeTt0XBPDn7yarTycn4fW9wCi5XFhJoxeM9TqdVf9BW0sBFqW9CeGAGQnFpnPmekZ1cCzGDBKk6HG9lu-33mfP5EepGkKALDkrAoU9CTnta3_N3Dq6cBmb-oKx7LhtuWOa-DgOfv8EnGc7zdjrd7A9eXv00a_rwtxffhEa_rjPmabvZPs01fkyH8ljUljNBegSrJvRPDRUkl6DgkDOOu0v-exJaCuhFmSPYaqv68tUE-wFIUI1yxtZCGciH3OFq5OS-k3wpyqCzsbZ6VLLKmY4PfCcfMvpI9Kwy4KNlkTZJSzgU7Fg6ozRysZbVXsYtq3YZse5A8QcP7FEUynXhwsoWqK-E07jg4UvLnMhHORRHREQ8BiKlrYMmDc-b5z_5dZ6sRrtdYsSp2MRApWqsN1zkz3_-8PM1roNeXD-dSRgT1iyVxzA9-nqKXG-tRrvOHFpfv5wmrovHqKVHd7z8ujP1eJV5G7HUKprFnE1XKyH303rsUFaRPCnsENaICxVZuW8e184jIiurtpfJBrQxWcNRx0f2O87p-oWXnuuH7O5zOecMigVAjYrkMFW83J5kiaIkLmlxx1COl9CjWnKDX6o3omIIvnwZ3M9q_PBAK2PC1PB1RBVLf_Lyu77Cvqq-k4V9FSU7WaJXlP7ZvKsm9LHvwJYSuCZrNyYOoFiS4bGe0r2DCSREfHVlJw5NSmWXPGNqbI-Tn7E3mygL66_M3tfthucZFTioIKHtRRayHL1W9Hg3g7ZaB0Ixqi7sbFn99dc_mH8-FbPq_yhb1lSi4ZZgqLqUH66Rl3bZ2H9TTl31ybrNxS8mneajsDIr1Gy_SHE-5ZK2bDcA8RnxGbxhReJsNI5MaTbR39wL83AVDZ2KIISfrA15dMEUFi8km3fg4jCKB-ZyAiYgabwzkEZF6agddJomNIAGPnMon3n8qUe255uA-JaM3cpEKSVaV_U2eYkkqQcS7TLG3N1rumMGwaFsh7fYt4iivRe7_vyYjB7HY5Y2GhnP1yXpE0zB69BDJS1tnTwZBqA0BVsyUcDWuYCzAb8oOsvDPlWiVa0F6FhQEOIlol19IQPM1TvxsQMgubOJMB9mRazFW6wZ0jNiOFrnfFsyf_CXumelFqcSqjSEzojPxDXINs1L5DwWb9go_4Ai4Anc-mH-3_8BAS8VTMIFAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19";

  function handlePageLoad() {
    LayoutShowcaseState.layoutReport.getPages().then(function (pages) {
      let activePage = pages[0];
      let activePageName = activePage.name;
      let jsonArray = [
        {
          topic: "123",
          chartType: "pieChart",
          isVisible: true,
          isEditable: false,
          dataRoles: [
            {
              dataRole: "Legend",
              field: { column: "State", table: "Geo", schema: schemas.column },
            },
            {
              dataRole: "Values",
              field: {
                measure: "Total Units",
                table: "SalesFact",
                schema: schemas.measure,
              },
            },
          ],
        },
        {
          topic: "123",
          chartType: "columnChart",
          isVisible: true,
          isEditable: false,
          dataRoles: [
            {
              dataRole: "Axis",
              field: { column: "Region", table: "Geo", schema: schemas.column },
            },
            {
              dataRole: "Values",
              field: {
                measure: "Total Units",
                table: "SalesFact",
                schema: schemas.measure,
              },
            },
          ],
        },
      ];

      jsonArray.map((visualJson) =>
        // let visualTypeName = visualJson["chartType"];
        activePage
          .createVisual(visualJson["chartType"], getVisualLayout())
          .then(function (createdVisual) {
            let vis = createdVisual.visual;
            vis.setProperty(propertyToSelector("legend"), {
              schema: schemas.property,
              value: true,
            });
            vis.setProperty(propertyToSelector("titleSize"), {
              schema: schemas.property,
              value: 14,
            });
            vis.setProperty(propertyToSelector("titleColor"), {
              schema: schemas.property,
              value: "#000000",
            });
            vis.getCapabilities().then(function (capabilities) {
              visualJson["dataRoles"].forEach((dataRole) => {
                let roleDisplayName = dataRole["dataRole"];
                let field = dataRole["field"];
                // Getting the data role name
                let dataRoleName = capabilities.dataRoles.filter(function (dr) {
                  return dr.displayName === roleDisplayName;
                })[0].name;
                vis.addDataField(dataRoleName, field);
              });
            });
          })
      );

      // Retrieve active page visuals.
      activePage.getVisuals().then(function (visuals) {
        LayoutShowcaseState.layoutVisuals = visuals.map(function (visual) {
          return {
            name: visual.name,
            title: visual.title ? visual.title : visual.name,
            checked: true,
            pageName: activePageName,
          };
        });

        // Create visuals array from the visuals of the active page
        renderVisuals();
      });
    });
  }

  function getVisualLayout() {
    // Get embedContainer width and height
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;

    // Calculating the overall width of the visuals in each row
    let visualsTotalWidth =
      pageWidth -
      LayoutShowcaseConsts.margin * (LayoutShowcaseState.columns + 1);

    // Calculate the width of a single visual, according to the number of columns
    // For one and three columns visuals width will be a third of visuals total width
    let width =
      LayoutShowcaseState.columns === ColumnsNumber.Two
        ? visualsTotalWidth / 2
        : visualsTotalWidth / 3;

    // For one column, set page width to visual's width with margins
    if (LayoutShowcaseState.columns === ColumnsNumber.One) {
      pageWidth = width + 2 * LayoutShowcaseConsts.margin;

      // Check if page width is smaller than minimum width and update accordingly
      if (pageWidth < LayoutShowcaseConsts.minPageWidth) {
        pageWidth = LayoutShowcaseConsts.minPageWidth;

        // Visuals width is set to fit minimum page width with margins on both sides
        width =
          LayoutShowcaseConsts.minPageWidth - 2 * LayoutShowcaseConsts.margin;
      }
    }

    // Set visuals height according to width - 9:16 ratio
    const height = width * (9 / 16);

    if (xCoordinates !== 0) {
      xCoordinates += width + LayoutShowcaseConsts.margin;
      if (xCoordinates + width > pageWidth) {
        xCoordinates = LayoutShowcaseConsts.margin;
        xCoordinates += height + LayoutShowcaseConsts.margin;
      }
    } else {
      xCoordinates = 1;
    }

    return {
      width: width,
      height: height,
      x: xCoordinates,
      y: yCoordinates,
      displayState: {
        // Change the selected visuals display mode to visible
        mode: models.VisualContainerDisplayMode.Visible,
      },
    };
  }

  function propertyToSelector(propertyName) {
    switch (propertyName) {
      case "title":
        return { objectName: "title", propertyName: "visible" };
      case "xAxis":
        return { objectName: "categoryAxis", propertyName: "visible" };
      case "yAxis":
        return { objectName: "valueAxis", propertyName: "visible" };
      case "legend":
        return { objectName: "legend", propertyName: "visible" };
      case "titleText":
        return { objectName: "title", propertyName: "titleText" };
      case "titleAlign":
        return { objectName: "title", propertyName: "alignment" };
      case "titleSize":
        return { objectName: "title", propertyName: "textSize" };
      case "titleColor":
        return { objectName: "title", propertyName: "fontColor" };
      default:
        return { objectName: "title", propertyName: "fontColor" };
    }
  }

  const schemas = {
    column: "http://powerbi.com/product/schema#column",
    measure: "http://powerbi.com/product/schema#measure",
    property: "http://powerbi.com/product/schema#property",
    hierarchy: "http://powerbi.com/product/schema#hierarchy",
  };

  // eslint-disable-next-line no-unused-vars
  function renderVisuals() {
    // render only if report and visuals initialized
    if (!LayoutShowcaseState.layoutReport || !LayoutShowcaseState.layoutVisuals)
      return;

    // Get embedContainer width and height
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;

    // Calculating the overall width of the visuals in each row
    let visualsTotalWidth =
      pageWidth -
      LayoutShowcaseConsts.margin * (LayoutShowcaseState.columns + 1);

    // // Calculate the width of a single visual, according to the number of columns
    // // For one and three columns visuals width will be a third of visuals total width
    let width =
      LayoutShowcaseState.columns === ColumnsNumber.Two
        ? visualsTotalWidth / 2
        : visualsTotalWidth / 3;

    // For one column, set page width to visual's width with margins
    if (LayoutShowcaseState.columns === ColumnsNumber.One) {
      pageWidth = width + 2 * LayoutShowcaseConsts.margin;

      // Check if page width is smaller than minimum width and update accordingly
      if (pageWidth < LayoutShowcaseConsts.minPageWidth) {
        pageWidth = LayoutShowcaseConsts.minPageWidth;

        // Visuals width is set to fit minimum page width with margins on both sides
        width =
          LayoutShowcaseConsts.minPageWidth - 2 * LayoutShowcaseConsts.margin;
      }
    }

    // // Set visuals height according to width - 9:16 ratio
    const height = width * (9 / 16);

    // Filter the visuals list to display only the checked visuals
    let checkedVisuals = LayoutShowcaseState.layoutVisuals.filter(function (
      visual
    ) {
      return visual.checked;
    });

    // Calculate the number of lines
    const lines = Math.ceil(
      checkedVisuals.length / LayoutShowcaseState.columns
    );

    // Calculate page height with margins
    pageHeight = Math.max(
      pageHeight,
      lines * height + (lines + 1) * LayoutShowcaseConsts.margin
    );

    // Building visualsLayout object
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Custom-Layout
    let visualsLayout = {};
    for (let i = 0; i < checkedVisuals.length; i++) {
      visualsLayout[checkedVisuals[i].name] = {
        x: checkedVisuals[i].xCoordinates,
        y: checkedVisuals[i].yCoordinates,
        width: width,
        height: height,
        displayState: {
          // Change the selected visuals display mode to visible
          mode: models.VisualContainerDisplayMode.visible,
        },
      };
    }

    //Building pagesLayout object
    let pagesLayout = {};
    pagesLayout[LayoutShowcaseState.layoutPageName] = {
      defaultLayout: {
        displayState: {
          // Default display mode for visuals is hidden
          mode: models.VisualContainerDisplayMode.Hidden,
        },
      },
      visualsLayout: visualsLayout,
    };

    // Building settings object
    let settings = {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        pageSize: {
          type: models.PageSizeType.Custom,
          width: pageWidth - 10,
          height: pageHeight - 20,
        },
        displayOption: models.DisplayOption.FitToPage,
        pagesLayout: pagesLayout,
      },
    };

    // If pageWidth or pageHeight is changed, change display option to actual size to add scroll bar
    if (pageWidth !== window.innerWidth || pageHeight !== window.innerHeight) {
      settings.customLayout.displayOption = models.DisplayOption.ActualSize;
    }

    // Change page background to transparent on Two / Three columns configuration
    settings.background =
      LayoutShowcaseState.columns === ColumnsNumber.One
        ? models.BackgroundType.Default
        : models.BackgroundType.Transparent;

    // Call updateSettings with the new settings object
    LayoutShowcaseState.layoutReport.updateSettings(settings);
  }

  return (
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
          ["loaded", handlePageLoad],
          [
            "rendered",
            function () {
              console.log("Report rendered");
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
        console.log(
          `Embedded object of type "${embedObject.embedtype}" received`
        );
        LayoutShowcaseState.layoutReport = embedObject;
      }}
    />
  );
}

export default ShowVisuals;
