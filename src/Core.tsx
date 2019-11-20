
import React, { Component, ChangeEvent, RefObject } from 'react';
import { UploadProps, UploadState, T, UploadFile } from './interface';
import { getFileSuffix } from './utils';

const TYPES = ['image', 'audio', 'video', 'paper'];

const STL = {
  display: 'none',
}
class Upload extends Component<UploadProps, UploadState> {

  $input: RefObject<any> = React.createRef();
  accepts: string = '*';

  static defaultProps = {
    multiple: false,
    name: 'file',
    beforeUpload: T,
    completeUpload: T,
    onChange: T,
    toast: console.log,
    typeTip: (fileName: string) => `${fileName}格式不正确`,
    sizeTip: (fileName: string, size: number) => `${fileName}大小超出限制`,
    image: {
      accept: [],
      size: 10,
    }
  }

  constructor(props: UploadProps) {
    super(props);
    this.state = {
      files: [],
    }
    this.initial();
  }

  initial = () => {
    // 设置初始格式
    const { filter = {} } = this.props;
    let _arr: Array<any> = [];
    TYPES.forEach(v => {
      // 定义的filetype不知为何具有隐式类型
      const { accept = [] } = filter[v] || {};
      _arr = _arr.concat(accept);
    })

    this.accepts = _arr.map(v => `.${v.toLowerCase()}`).join(',') || '*';
  }

  triggerUpload = () => {
    console.log('trigger upload');
    this.$input.current.click();
  }

  change = (event: ChangeEvent<HTMLInputElement>) => {
    const { beforeUpload, completeUpload, onChange, toast, typeTip, sizeTip } = this.props;
    const rawFileLists: FileList = event.target.files;
    let files = Array.from(rawFileLists);
    console.log(files);
    beforeUpload && beforeUpload(files);
    // 校验
    files.forEach((v, i) => {
      const { name, size } = v;
      const suffix = getFileSuffix(name).toLowerCase();
      // 校验
      if (this.accepts !== '*') {
        // 校验格式
        let isSuffixPass = new RegExp(suffix).test(this.accepts);
        !isSuffixPass && (toast(typeTip(name)) ,files.splice(i, 1));
      }
      // 校验大小
      !this.validateFileSize(suffix, size) && (toast(sizeTip(name, size)), files.splice(i, 1));
    })
    // 置空input, 解决不能连续上传同一个文件的尴尬
    this.$input.current.value = '';
    // 不通过校验结束上传
    if(files.length <= 0) {
      completeUpload && completeUpload(files);
      return;
    }
    onChange && onChange(files);
  }

  validateFileSize = (fileSuffix: string, fileSize: number) => {
    const { filter = {} } = this.props;
    let isPass = true;
    Object.keys(filter).forEach(v => {
      const { size = 0, accept = [] } = filter[v];
      let lowerCaseAccept = accept.map((v: string) => v.toLowerCase());
      if (lowerCaseAccept.includes(fileSuffix)) {
        console.log('validate size');
        size > 0 && (isPass = size * 1024 *1024 >= fileSize);
      }
    })
    return isPass;
  }

  render() {
    const { children, multiple, name } = this.props;
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
          style={STL}
          ref={this.$input}
          type="file"
          accept={this.accepts}
          onChange={this.change}
          multiple={!!multiple}
        />
      </>
    )
  }
}

export default Upload;
