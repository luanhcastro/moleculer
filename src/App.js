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
import { DownloadOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
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
        style={{ display: "flex", justifyContent: "center", marginTop: 80, justifyItems: "center" }}
        span={24}
      >
        <img class="logo" alt="Logo" src={logo} />
      </Col>

      {!visible ? (
        <>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Input
              style={{ width: 800, marginTop: 100 }}
              onChange={(e) => filterData(e.target.value)}
              allowClear={true}
              placeholder="Search for molecules"
              suffix={<SearchOutlined style={{ color:"green", size:"large"}}/>}
              // enterButton="Search"
              size="large"
            />
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <List
              class="list"
              grid={{ gutter: 10 }}
              dataSource={filteredData}
              // pagination={{
              //   onChange: (page) => {
              //     console.log(page);
              //   },
              //   align: "center",
              //   showTotal: false,
              //   pageSize: 4,
              //   size: "small",
              //   simple: true,
              // }}
              style={{
                marginTop: "30px",
                display: "flex",
                justifySelf: "center",
                marginLeft: 32,
                justifyContent: "center",
              }}
              renderItem={(item) => (
                <List.Item>
                  <Col span={6}>
                    {" "}
                    <div onClick={() => showCard(item)}>
                      <Card
                        hoverable
                        bordered
                        style={{ width: 350, marginTop: 30 }}
                        cover={<img alt="Logo" src={item.Link} />}
                      >
                        <Divider />
                        <p>
                          <Meta
                            title={item.Compound}
                            description={<div></div>}
                          />
                        </p>
                      </Card>
                    </div>
                  </Col>
                </List.Item>
              )}
            />
          </Col>
        </>
      ) : (
        <Card
          extra={
            <Button type="link" danger onClick={() => setVisible(false)}>
              <CloseCircleOutlined />
            </Button>
          }
          title={item.Compound}
          style={{ marginTop: "10px", marginBottom: "100px", width: "70%" }}
        >
          <p>
            <Descriptions bordered column={1}>
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
      )}
    </Row>
  );
}

export default App;
