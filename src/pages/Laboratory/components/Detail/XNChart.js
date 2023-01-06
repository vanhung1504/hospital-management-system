import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { format } from "date-fns";
import { memo, PureComponent, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function XNChart({ setChart, data }) {
  const cls = useSelector((state) => state.healthCareServices.clsXN.data);
  const dataSelect = data.clsXN.map((item) => ({
    ...item,
    name: ((id) => cls.find((xn) => xn.id === id).name)(item.serviceId),
  }));

  const patientId = data.patientId;
  const [selected, setSelected] = useState(0);

  let allResults = [];
  const labo = useSelector((state) => state.laboratory.data);
  labo
    .filter((item) => item.patientId === patientId)
    .forEach((item) => {
      item.clsXN.forEach((xn) => {
        if (xn.serviceId === selected)
          allResults.push({
            time: new Date(item.receiptDate).getTime(),
            receiptDate: format(new Date(item.receiptDate), "yy/MM/dd hh:mm"),
            result: xn.result,
            resultAsNumber: ((rs) => {
              if (rs === null || isNaN(Number(rs))) return null;
              return Number(rs);
            })(xn.result),
          });
      });
    });

  allResults.sort((a, b) => b.time - a.time);

  return (
    <Modal
      show={true}
      onHide={() => setChart(false)}
      backdrop="static"
      keyboard={false}
      size="lg"
      fullscreen="xl-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>Lịch sử KQXN</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Select
                defaultValue={0}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value={0} disabled>
                  --Lựa chọn dịch vụ--
                </option>
                {dataSelect.map((item) => (
                  <option value={item.serviceId} key={item.serviceId}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Timeline>
                {allResults.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                      {item.receiptDate}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{item.result}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Col>
            <Col xs={9}>
              <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={allResults.reverse()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="receiptDate"
                      padding={{ left: 20, right: 20 }}
                      height={90}
                      tick={<CustomizedAxisTick />}
                    />
                    <YAxis padding={{ top: 20, bottom: 20 }} />
                    <Tooltip />
                    <Line
                      // connectNulls
                      type="linear"
                      name="Kết quả"
                      dataKey="resultAsNumber"
                      stroke="#8884d8"
                      activeDot={{ r: 6 }}
                      label={<CustomizedLabel />}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default memo(XNChart);

// Custom chart
class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={14} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
