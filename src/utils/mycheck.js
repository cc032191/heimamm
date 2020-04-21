// 把自定义的校验方法抽取出来
// 自定义验证邮箱
export function verifyemall(rule, value, callback) {
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱格式"));
  }
}
// 自定义验证手机号
export function phonecodetest(rule, value, callback) {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号码格式不正确"));
  }
}
// 自定义验证密码
export function passwordtest(rule, value, callback) {
  let reg = /^\w+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("不能有特殊字符"));
  }
}
export function graphiccodetest(rule, value, callback) {
  let reg = /^\d{4}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入数字"));
  }
}