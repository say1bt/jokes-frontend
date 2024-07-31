export interface Joke {
  _id?: string;
  content: string;
  typeId: string;
  approved: boolean;
  type?: string;
}

export interface JokeType {
  type: string;
}

export interface LoginModalProps {
  visible: boolean;
  onClose: any;
  onLoginSuccess: any;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface EditJokeModalProps {
  joke: Joke | null;
  visible: boolean;
  onClose: () => void;
  onSave: (updatedJoke: Joke) => void;
}

export interface JokeDetails {
  content: string;
  type: string;
}

export interface ChangeCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onChangeCategory: (category: string) => void;
  currentCategory: string;
}
