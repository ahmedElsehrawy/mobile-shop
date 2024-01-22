import { Select } from "antd";

interface Props {
  data: any;
  onChange: any;
  placeHolder: string;
}

const CustomSelect = ({ data, onChange, placeHolder }: Props) => {
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      showSearch
      placeholder={placeHolder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={data?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }))}
      allowClear
    />
  );
};

export default CustomSelect;
