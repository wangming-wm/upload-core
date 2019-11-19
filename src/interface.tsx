import React, { ReactElement } from 'react';

export interface UploadFile extends File {
  res?: object;
}

export interface UploadProps {
  name?: string;
  children: ReactElement;
  beforeUpload: (file: UploadFile) => void;
}

export interface UploadState {
  files: Array<File>;
}
