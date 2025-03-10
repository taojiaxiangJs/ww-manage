  /**
   * 加法
   * @param arg1
   * @param arg2
   * @returns {Number}
   */
  export const accAdd = (arg1, arg2)=> {
    var r1, r2, m, c;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        }
        else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    }
    else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m
  }
  /**
  * 减法
  * @param arg1
  * @param arg2
  * @returns
  */
  export const accSub = (arg1,arg2)=> {
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
  }
  /**
  * 乘法
  * @param arg1
  * @param arg2
  * @returns
  */
  export const accMul = (arg1, arg2)=> {
    var r1 = arg1.toString(), // 将传入的数据转化为字符串
    r2 = arg2.toString(),
    m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0); // 获取两个数字的小数位数的和
    // 乘积的算法就是去掉小数点做整数相乘然后除去10的所有小数位的次方
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);

    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
  }
  /**
   * 除法
   * @param arg1
   * @param arg2
   * @returns {Number}
   */
  export const accDiv = (arg1, arg2)=> {
    let e = 0
    let f = 0
    try {
      e = arg1.toString().split('.')[1].length
    } catch (g) {}
    try {
      f = arg2.toString().split('.')[1].length
    } catch (g) {}
    const c = Number(arg1.toString().replace('.', ''))
    const d = Number(arg2.toString().replace('.', ''))
    return accMul(c / d, Math.pow(10, f - e))
  }