export const contentTableConfig = {
  title: "类别列表",
  propList: [
    { prop: "name", label: "类别名称", minWidth: "100" },
    { prop: "createAt", label: "创建时间", minWidth: "200", slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", minWidth: "200", slotName: "updateAt" },
    { label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true
};
