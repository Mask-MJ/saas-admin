declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
interface Window {
  $loadingBar: import('naive-ui').LoadingBarProviderInst;
  $dialog: import('naive-ui').DialogProviderInst;
  $message: import('naive-ui').MessageProviderInst;
  $notification: import('naive-ui').NotificationProviderInst;
}
