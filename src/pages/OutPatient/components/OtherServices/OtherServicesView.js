import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { alpha, styled } from "@mui/material/styles";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaDotCircle, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

function OtherServicesView({ otherServices }) {
  const services = useSelector((state) => state.healthCareServices);

  const dataRender = {};
  for (const key of Object.keys(otherServices)) {
    dataRender[key] = {
      title: services[key].name,
      subData: otherServices[key].map((item) => {
        return services[key].data.find((obj) => obj.id === item).name;
      }),
    };
  }

  const renderTreeView = (data) => {
    const result = [];
    for (const key of Object.keys(data)) {
      const subData = data[key].subData;
      result.push(
        <StyledTreeItem nodeId={key} key={key} label={data[key].title}>
          {subData.map((item) => (
            <StyledTreeItem
              nodeId={item}
              key={item}
              label={item}
            ></StyledTreeItem>
          ))}
        </StyledTreeItem>
      );
    }
    return result;
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <TreeView
            defaultCollapseIcon={<FaMinusSquare className="text-primary" />}
            defaultExpandIcon={<FaPlusSquare className="text-primary" />}
            defaultEndIcon={<FaDotCircle className="text-success" />}
            sx={{ width: "100%" }}
          >
            {renderTreeView(dataRender)}
          </TreeView>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(OtherServicesView);

// Custom tree view
const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 12,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  })
);
