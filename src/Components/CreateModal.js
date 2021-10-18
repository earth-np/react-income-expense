import { css } from "@emotion/css";
import { DatePicker, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

export const CreateModal = (props) => {
  const { visible, onCreate, onClose } = props;
  const [category, setCategory] = useState("Shopping");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    setCategory("Shopping");
    setDate();
    setAmount();
  }, [visible]);

  return (
    <Modal
      title="Create Transaction"
      destroyOnClose
      visible={visible}
      onOk={() => {
        const incomeCategory = ["Salary"];
        const type = incomeCategory.includes(category) ? "income" : "expense";
        const newTx = {
          type,
          category,
          date,
          amount: type === "expense" ? amount * -1 : amount,
        };
        onCreate(newTx);
      }}
      onCancel={() => {
        onClose();
      }}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          height: 150px;
          justify-content: space-between;
        `}
      >
        <Select
          placeholder="Select your category"
          value={category}
          onChange={(e) => {
            setCategory(e);
          }}
        >
          <Select.Option value="Shopping">Shopping</Select.Option>
          <Select.Option value="Salary">Salary</Select.Option>
        </Select>
        <DatePicker
          onChange={(e) => {
            setDate(e.format("DD MMM YYYY"));
          }}
        />
        <Input
          placeholder="Input Amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
};
