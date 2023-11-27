import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { callDistrict, callProvince, callWard } from "../../services/api-ghn";
import { useDispatch } from "react-redux";
import { doCreateBill, handleStepOrder } from "../../redux/orderSlice";
import TextArea from "antd/es/input/TextArea";

const Checkout = () => {
  const dispatch = useDispatch();

  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);

  const [provinceID, setProvinceID] = useState(0);
  const [districtID, setDistrictID] = useState(0);

  const [provinceLabel, setProvinceLabel] = useState("");
  const [districtLabel, setDistrictLabel] = useState("");
  const [wardLabel, setWardLabel] = useState("");

  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values) => {
    const dataBill = {
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
      province: provinceLabel,
      district: districtLabel,
      ward: wardLabel,
      note: values.note,
    };
    dispatch(doCreateBill(dataBill));
    message.success("Đơn đặt hàng đã thành công.");
    dispatch(handleStepOrder("next"));
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const fetchApiGhn = async () => {
      const res = await callProvince();
      if (res?.data && res.data.data.length > 0) {
        const newDataProvince = res?.data?.data.map((values) => {
          return {
            value: values.ProvinceID,
            label: values.ProvinceName,
          };
        });

        setDataProvince(newDataProvince);
      }
    };

    fetchApiGhn();
  }, []);

  useEffect(() => {
    const fetchApiGhn = async () => {
      const res = await callDistrict(provinceID);
      if (res?.data && res.data.data.length > 0) {
        const newDataDistrict = res?.data?.data.map((values) => {
          return {
            value: values.DistrictID,
            label: values.DistrictName,
          };
        });
        setDataDistrict(newDataDistrict);
      }
    };
    fetchApiGhn();
  }, [provinceID]);

  useEffect(() => {
    const fetchApiGhn = async () => {
      const res = await callWard(districtID);
      if (res?.data && res.data.data.length > 0) {
        const newDataWard = res?.data?.data.map((values) => {
          return {
            value: values.WardCode,
            label: values.WardName,
          };
        });
        setDataWard(newDataWard);
      }
    };
    fetchApiGhn();
  }, [districtID]);

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      action="#"
      className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
    >
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ và tên!",
          },
        ]}
      >
        <Input
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
          placeholder="Nguyen Van A"
        />
      </Form.Item>
      <Form.Item
        className="text-left"
        label="Số điện thoại"
        name="phone"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại!",
          },
        ]}
      >
        <Input
          placeholder="0345678910"
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 "
        />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ, số nhà!",
          },
        ]}
      >
        <Input
          placeholder="Địa chỉ, số nhà"
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
        />
      </Form.Item>
      <Form.Item
        label="Tỉnh, Thành phố"
        name="province"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn tỉnh, thành phố!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="-----Chọn tỉnh, thành phố----"
          optionFilterProp="children"
          onChange={(value, option) => {
            setProvinceLabel(option.label);
            setProvinceID(value);
          }}
          filterOption={filterOption}
          options={dataProvince}
        />
      </Form.Item>
      <Form.Item
        label="Quận, Huyện"
        name="district"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn quận, huyện!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="-----Chọn quận, huyện----"
          optionFilterProp="children"
          onChange={(value, option) => {
            setDistrictLabel(option.label);
            setDistrictID(value);
          }}
          filterOption={filterOption}
          options={dataDistrict}
        />
      </Form.Item>
      <Form.Item
        label="Phường, Xã"
        name="ward"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập phưởng, xã!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="-----Chọn phường, xã----"
          optionFilterProp="children"
          onChange={(value, option) => {
            setWardLabel(option.label);
          }}
          filterOption={filterOption}
          options={dataWard}
        />
      </Form.Item>
      <Form.Item label="Ghi chú" name="note">
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item>
        <Checkbox
          onChange={() => {
            // console.log("Line: 211 - Here", value);
          }}
          checked
        >
          Thanh toán khi nhận hàng
        </Checkbox>
      </Form.Item>
      <Form.Item className="text-sm font-medium text-gray-700">
        <Button
          size="large"
          type="primary"
          danger
          className="w-full"
          htmlType="submit"
        >
          Mua hàng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Checkout;
