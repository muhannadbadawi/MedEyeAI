// src/components/admin/RecommendationsManagement.tsx

import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Row, Col, Typography } from "antd";
import { editRecommendations, getRecommendations } from "../../../api/adminService";

const { TextArea } = Input;
const { Title } = Typography;

const defaultRecommendations = {
  glaucoma: `You may be at risk for glaucoma
This is a condition where high pressure in the eye can damage your vision slowly over time. 
It usually doesn’t hurt, so many people don’t know they have it. 
Please see an eye doctor soon to check your eye pressure and protect your vision.`,

  diabeticRetinopathy: `You may have signs of diabetic retinopathy
This is an eye problem caused by diabetes that can harm your vision if not treated early. You might not feel anything at first, but it can get worse over time. 
Please visit an eye doctor soon to check your retina and protect your sight.`,

  cataracts: `You may have signs of cataracts
This means the lens inside your eye is getting cloudy, which can make your vision blurry or dim. 
Cataracts usually get worse slowly. 
The good news is they can be treated with a simple surgery. Please talk to an eye doctor to see what’s best for you.`,

  normal: `Your eyes appear to be normal based on the analysis.
Keep maintaining good eye health and have regular checkups with your eye doctor.`
};

const RecommendationsManagement = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // fetch recommendations when component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await editRecommendations(values);
      message.success("Recommendations saved successfully!");
    } catch (error) {
      message.error("Failed to save recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ padding: "40px", width: "100%" }}>
      <Col xs={24} sm={22} md={20} lg={16} xl={14}>
        <Card
          title={<Title level={3} style={{ marginBottom: 0 }}>Manage Medical Recommendations</Title>}
          bordered={false}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="glaucoma" label={<strong>Glaucoma</strong>}>
              <TextArea rows={5} placeholder="Enter recommendation for glaucoma..." />
            </Form.Item>

            <Form.Item name="diabeticRetinopathy" label={<strong>Diabetic Retinopathy</strong>}>
              <TextArea rows={5} placeholder="Enter recommendation for diabetic retinopathy..." />
            </Form.Item>

            <Form.Item name="cataracts" label={<strong>Cataracts</strong>}>
              <TextArea rows={5} placeholder="Enter recommendation for cataracts..." />
            </Form.Item>

            <Form.Item name="normal" label={<strong>Normal (No Disease Detected)</strong>}>
              <TextArea rows={4} placeholder="Enter recommendation for normal diagnosis..." />
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginTop: "32px" }}>
              <Button type="primary" htmlType="submit" size="large">
                Save Recommendations
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RecommendationsManagement;
