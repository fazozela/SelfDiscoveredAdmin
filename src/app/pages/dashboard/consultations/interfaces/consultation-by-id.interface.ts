export interface ConsultationByIDResponse {
  id:        string;
  title:     string;
  content:   string;
  createdAt: Date;
  updatedAt: Date;
  isClosed:  boolean;
  user:      User;
  replies:   Reply[];
}

export interface Reply {
  id:        string;
  content:   string;
  createdAt: Date;
  user:      User;
}

export interface User {
  id:       string;
  email:    string;
  isActive: boolean;
  roles:    string[];
}
