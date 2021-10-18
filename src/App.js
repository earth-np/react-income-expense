import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { css } from "@emotion/css";
import { Modal, Button, Input, Select, DatePicker } from "antd";
import { TransactionRow } from "./Components/TransactionRow";
import { useState } from "react";
import { CreateModal } from "./Components/CreateModal";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;
  padding-top: 32px;
`;

const PageContent = styled.div`
  width: 80%;
  margin: auto;
  max-width: 500px;
`;

const FlexBox = styled.div`
  display: flex;
`;

function App() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const onDeleteItem = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const filteredTransaction = transactions.filter((tx) =>
    tx.category.includes(search)
  );

  return (
    <PageContainer>
      <PageContent>
        <FlexBox>
          <Input
            placeholder="Search by text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button onClick={() => setCreateModalVisible(true)}>Create</Button>
        </FlexBox>
        {transactions.length === 0 ? (
          <FlexBox
            className={css`
              padding-top: 3rem;
              justify-content: center;
            `}
          >
            <h1>No data</h1>
          </FlexBox>
        ) : (
          ""
        )}
        {filteredTransaction.map((tx) => (
          <TransactionRow tx={tx} onDeleteItem={onDeleteItem} />
        ))}
      </PageContent>
      <CreateModal
        visible={createModalVisible}
        onCreate={(tx) => {
          tx.id = transactions.length + 1;
          setTransactions([...transactions, tx]);
          setCreateModalVisible(false);
        }}
        onClose={() => setCreateModalVisible(false)}
      />
    </PageContainer>
  );
}

export default App;
