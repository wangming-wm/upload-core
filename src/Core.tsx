
import React, { Component, ChangeEvent, RefObject } from 'react';
import { UploadProps, UploadState, T } from './interface';

class Upload extends Component<UploadProps, UploadState> {

  $input: RefObject<any> = React.createRef();

  static defaultProps = {
    beforeUpload: T,
    onChange: T,
  }

  triggerUpload = () => {
    console.log('trigger upload');
    this.$input.current.click();
  }

  change = (event: ChangeEvent<HTMLInputElement>) => {
    const { beforeUpload } = this.props;
    const rawFileLists: FileList = event.target.files;
    const files = Array.from(rawFileLists);
    beforeUpload && beforeUpload(files);

  }

  render() {
    const { children } = this.props;
    return (
      <>
        {
          children && React.Children.map(children, (child: React.ReactElement<any>) => (
            React.cloneElement(child, {
              onClick: this.triggerUpload
            })
          ))
        }
        <input
          ref={this.$input}
          type="file"
          onChange={this.change}
        />
      </>
    )
  }
}

export default Upload;
