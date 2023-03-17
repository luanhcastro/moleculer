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

  const closeCard = () => {
    setData(data);
    setVisible(false);
  }

  return (
    <Row class="body" style={{ display: "flex", justifyContent: "center" }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 80,
          padding: 10
        }}
        // xs={8}
        sm={16}
        md={24}
      >
        <img
          sm={8}
          md={24}
          class="logo"
          alt="Logo"
          style={{ width: "100" }}
          src={logo}
        />
      </Col>

      {!visible ? (
        <>
          <Col
            xs={16}
            sm={16}
            md={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Input
              className="inputSearch"
              style={{ padding: 10, width: 800, marginTop: 100, marginBottom: 15 }}
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
            style={{ padding: 10, display: "flex", justifyContent: "center" }}
          >
            <Row
              gutter={50}
              style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}
            >
              {filteredData.map((item) => (
                <Col>
                  <div onClick={() => showCard(item)}>
                    <Card
                      className="hoverableCard"
                      hoverable
                      bordered
                      style={{ maxWidth: 300, minWidth: 100, marginTop: 30 }}
                      cover={<img alt="Logo" src={item.Link} />}
                    >
                      <Divider />
                      <p>
                        <Meta className="cardText" title={item.Compound} />
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
          // xs={16}
          // sm={16}
          md={24}
          style={{ display: "flex", justifyContent: "center", opacity: "100%" }}
        >
          <Card sm={16}
            extra={
              <Button type="link" danger onClick={() => closeCard()}>
                <CloseCircleOutlined />
              </Button>
            }
            title={item.Compound}
            style={{
              marginTop: "10px",
              marginBottom: "100px",
              width: "70%",
              // minWidth: "700px",
              display: "table",
            }}
          >
            <p>
              <Col sm={16} md={24}>
                <Descriptions  sm={16} md={24} bordered column={1}>
                  <Descriptions.Item
                    label={
                      <img
                        style={{ width: "100%" }}
                        src={item.Link}
                        alt="imagem"
                      />
                    }
                  >
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
              </Col>
            </p>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default App;
