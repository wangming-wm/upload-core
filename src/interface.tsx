import React, { ReactElement } from 'react';

export function T () { return true };

export interface fileType {
  accept: Array<string>;
  size: number;
}

export interface UploadFile extends File {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  res?: object;
}

export interface UploadProps {
  multiple: boolean;
  name?: string;
  children: ReactElement;
  typeTip: (fileName: string) => string;
  sizeTip: (fileName: string, size: number) => string;
  beforeUpload: (file: Array<UploadFile>) => void;
  completeUpload: (file?: Array<UploadFile>) => void;
  onChange: (file: Array<UploadFile>) => void;
  toast: (params: any) => void;
  filter: {
    image?: fileType;
    audio?: fileType;
    video?: fileType;
    paper?: fileType;
  };
}

export interface UploadState {
  files: Array<File>;
}
