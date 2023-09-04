export interface IInfoModal {
  open: boolean;
  onClose: () => void;
  message: string;
}

export interface IPasswordModal {
  open: boolean;
  onClose: () => void;
  onFormSubmit: (data: IPasswords) => void;
}

export interface IPasswords {
  currentPassword: string;
  newPassword: string;
}
