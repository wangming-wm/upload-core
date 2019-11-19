import React, { ReactElement } from 'react';

export function T () { return true };

export interface UploadFile extends File {
  res?: object;
}

export interface UploadProps {
  name?: string;
  type?: Array<string>;
  children: ReactElement;
  beforeUpload: (file: Array<UploadFile>) => void;
  onChange: (file: Array<UploadFile>) => void;
}

export interface UploadState {
  files: Array<File>;
}
