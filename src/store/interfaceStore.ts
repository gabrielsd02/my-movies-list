export interface UserState {
    authenticated: boolean;
    user: string;
}
  
export interface Action {
    type: string;
    payload?: string;
}
  