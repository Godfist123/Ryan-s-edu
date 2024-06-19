import { useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { FIND, UPDATE } from "./graphql/demo";
import { Button, Form, Input } from "antd-mobile";

function App() {
  const { loading, data } = useQuery(FIND, {
    variables: { id: "44c3ce3d-551e-4211-8c84-ac709cd0c86c" },
  });

  const [update] = useMutation(UPDATE);
  const updateHandler = (data: object) => {
    update({
      variables: {
        id: "44c3ce3d-551e-4211-8c84-ac709cd0c86c",
        params: {
          ...data,
        },
      },
    }).catch((error) => {
      console.error("GraphQL Error:", error.graphQLErrors);
      console.error("Network Error:", error.networkError);
    });
  };

  const submitButton = (
    <Button type="submit" color="primary" size="large">
      submit
    </Button>
  );

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <li>data:{JSON.stringify(data)}</li>
      <img
        src="http://localhost:3000/aws/file/IMG_5695.JPG"
        alt="Streamed Image"
      />
      <Form footer={submitButton} onFinish={updateHandler} layout="horizontal">
        <Form.Item name="name" label="name">
          <Input></Input>
        </Form.Item>
        <Form.Item name="desc" label="desc">
          <Input></Input>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
