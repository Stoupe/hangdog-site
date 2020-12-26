import React from "react";
import { Container } from "../components/BasicComponents/BasicComponents";

const test: React.FC = () => {
  return (
    <Container fullPage invisible>
      <Container>some content</Container>
      <Container>some content</Container>
    </Container>
  );
};

export default test;
