import useLoginStore from "@/stores/login/login";

export function usePermission(pageName: string, handleName: string) {
  const loginStore = useLoginStore();
  const permissions = loginStore.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  // !! -> ts中强行转换为boolean
  return !!permissions.find((item) => item === verifyPermission);
}
