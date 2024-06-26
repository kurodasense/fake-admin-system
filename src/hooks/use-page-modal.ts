import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>(); // PageModal的引用
  const defaultInfo = ref({}); // 用来记录modal的值
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true;
    newCb && newCb();
  };

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true;
    editCb && editCb(item);
  };
  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
