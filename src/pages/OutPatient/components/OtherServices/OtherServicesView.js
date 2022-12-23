import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { alpha, styled } from "@mui/material/styles";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { FaDotCircle, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getClsXNbyVisitId } from "~/store/features/laboratory/laboratorySlice";

function OtherServicesView({ otherServices, visitId }) {
  const services = useSelector((state) => state.healthCareServices);
  const result = useSelector(getClsXNbyVisitId(visitId));

  const dataRender = {};
  for (const key of Object.keys(otherServices)) {
    dataRender[key] = {
      title: services[key].name,
      subData: otherServices[key].map((item) => {
        return {
          name: services[key].data.find((obj) => obj.id === item).name,
          result: ((key, id) => {
            if (key === "clsXN")
              return result.find((rs) => rs.serviceId === id)?.result;
          })(key, item),
        };
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
              nodeId={item.name}
              key={item.name}
              label={
                item.result
                  ? `${item.name}- Kết quả: ${item.result}`
                  : item.name
              }
            ></StyledTreeItem>
          ))}
        </StyledTreeItem>
      );
    }
    return result;
  };

  return (
    <div>
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
    </div>
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
