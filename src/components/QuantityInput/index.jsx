import { Button, InputNumber, Space } from "antd";
import { useState } from "react";

const Quantity = (Props) => {
  const { type, onChange } = Props;
  const [quantity, setQuantity] = useState(1);
  onChange(quantity);

  return (
    <div className={type == "vertical" ? "flex flex-col" : "flex"}>
      <h3>Số lượng: </h3>

      <Space className="border-2 !gap-0 w-[120px]">
        <Button
          onClick={() => setQuantity(() => quantity - 1)}
          disabled={quantity <= 0}
          className="w-1/4 ml-1 flex justify-center items-center"
        >
          -
        </Button>
        <InputNumber
          className="w-12 flex justify-center items-center"
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
        />
        <Button
          onClick={() => setQuantity(() => quantity + 1)}
          className="w-1/4 ml-1 flex justify-center items-center"
        >
          +
        </Button>
      </Space>
    </div>
  );
};

export default Quantity;
