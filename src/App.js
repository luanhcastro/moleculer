import React, { useState } from "react";
import "./App.css";
import {
  List,
  Col,
  Row,
  Button,
  Descriptions,
  Divider,
  Card,
  Input,
} from "antd";
import data from "./dataset/data.json";
import {
  DownloadOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import background from "./background.jpg";
import logo from "./images/logo.png";

function App() {
  const { Meta } = Card;
  const [item, setItem] = useState(null);
  const [visible, setVisible] = useState(null);
  const [filteredData, setData] = useState(data);

  const { Search } = Input;

  const showCard = (item) => {
    setItem(item);
    setVisible(true);
  };

  const filterData = (value) => {
    if (!value) setData(data);
    else {
      setData(
        data.filter((data) => data.Compound.toLowerCase().includes(value))
      );
    }
  };

  return (
    <Row class="body" style={{ display: "flex", justifyContent: "center" }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 80,
        }}
        // xs={8}
        sm={16}
        md={24}
      >
        <img class="logo" alt="Logo" src={logo} />
      </Col>

      {!visible ? (
        <>
          <Col
            // xs={8}
            sm={16}
            md={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Input
              style={{ width: 800, marginTop: 100 }}
              onChange={(e) => filterData(e.target.value)}
              allowClear={true}
              placeholder="Search for molecules"
              suffix={
                <SearchOutlined style={{ color: "green", size: "large" }} />
              }
              // enterButton="Search"
              size="large"
            />
          </Col>
          <Col
            // xs={8}
            sm={16}
            md={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Row
              gutter={15}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {filteredData.map((item) => (
                <Col>
                  <div onClick={() => showCard(item)}>
                    <Card
                      hoverable
                      bordered
                      style={{ width: 350, marginTop: 30 }}
                      cover={<img alt="Logo" src={item.Link} />}
                    >
                      <Divider />
                      <p>
                        <Meta title={item.Compound} />
                      </p>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Col
          // xs={8}
          sm={16}
          md={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            extra={
              <Button type="link" danger onClick={() => setVisible(false)}>
                <CloseCircleOutlined />
              </Button>
            }
            title={item.Compound}
            style={{
              marginTop: "10px",
              marginBottom: "100px",
              width: "70%",
              minWidth: "700px",
            }}
          >
            <p>
              <Descriptions sm={16} md={24} bordered column={1}>
                <Descriptions.Item label={<img src={item.Link} alt="imagem" />}>
                  {item.Compound}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {item.Compound}
                </Descriptions.Item>
                <Descriptions.Item label="Smiles">
                  {item.Smiles}
                </Descriptions.Item>
                <Descriptions.Item label="Mol weight">
                  {item.Molweight}
                </Descriptions.Item>
                <Descriptions.Item label="MOL">
                  <Button type="primary" icon={<DownloadOutlined />}>
                    Download Mol
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </p>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default App;
