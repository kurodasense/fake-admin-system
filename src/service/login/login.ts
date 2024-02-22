import hyRequest from "../index";
import type { IAccount, IDataType, ILoginResult } from "./type";
enum LoginAPI {
  AccountLogin = "/login",
  GetUserInfo = "/users/",
  GetUserMenu = "/role/"
}
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requsetUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.GetUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.GetUserMenu + id + "/menu",
    showLoading: false
  });
}
