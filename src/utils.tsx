
/**
 * 依据文件名返回后缀
 * @param name 文件名
 * @return 后缀名
 */
export const getFileSuffix = (name: string = '') => {
  const index = name.lastIndexOf('.');
  if (index < 0) {
    console.warn('未找到有效的后缀名');
    return name;
  } else {
    return name.slice(index + 1);
  }
}