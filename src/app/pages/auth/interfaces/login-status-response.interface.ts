export interface LoginStatusResponse {
  id:       string;
  email:    string;
  password: string;
  roles:    string[];
  token:    string;
}
