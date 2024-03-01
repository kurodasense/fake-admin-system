import useLoginStore from "@/stores/login/login";

export function usePermission(pageName: string, handleName: string) {
  const loginStore = useLoginStore();
  const permissions = loginStore.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  // name = 'coderwhy'
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission);
}
