import { type IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 40px"
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: "id",
      type: "input",
      label: "id",
      rules: [],
      placeholder: "请输入id"
    },
    {
      field: "name",
      type: "input",
      label: "分类名称",
      rules: [],
      placeholder: "请输入分类名称"
    }
  ]
};
