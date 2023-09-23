export const DIALOG_MODE = {
  NEW: 'new',
  VIEW: 'view',
  EDIT: 'edit',
  CONFIRMATION: 'confirmation',
} as const;

export declare namespace APP {
  type DialogMode = typeof DIALOG_MODE[keyof typeof DIALOG_MODE];
}