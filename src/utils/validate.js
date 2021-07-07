export function validator(type, data) {
  const phoneValidator = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
  const inputvalidator = /[`~!@#$%^&*()_+<>?:"{},.\/;·！#￥（——）：；“”‘、，|《。》？、【】'[\]]/im;
  const emailvalidator = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  let result = true;
  if (type === "input") {
    result = inputvalidator.test(data);
  } else if (type === "email") {
    result = emailvalidator.test(data);
  } else if (type === "phone") {
    result = phoneValidator.test(data);
  } else {
    return;
  }
  return result;
}
