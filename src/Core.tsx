
import React, { Component } from 'react';

interface File {
  name?: string;
}

interface UploadProps {
  name?: string;
}

interface UploadState {
  files: Array<File>;
}

class Upload extends Component<UploadProps, UploadState> {

  triggerUpload = () => {
    console.log('trigger upload');
  }

  render() {
    const { children } = this.props;
    return (
      <>
        {
          children && React.Children.map(children, (child) => (
            React.cloneElement(child, {
              onClick: this.triggerUpload
            })
          ))
        }
        <input type="file" />
      </>
    )
  }
}

export default Upload;
