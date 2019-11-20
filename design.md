### 主旨
  只关注上传部分，包括上传的格式、校验、单多上传。
  不关心上传后。
### API设计
#### 格式部分
  {
    image: { accept: ['png'], size: 10 },
    paper: { accept: ['xls'], size: 12 },
    ...
  }
  