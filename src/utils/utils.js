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
  * @param a
  * @param b
  * @returns
  */
  export const accMul = (a, b)=> {
    // 将数字转换为字符串以分析小数位数
    const strA = a.toString();
    const strB = b.toString();
    
    // 获取小数点后的位数
    const decimalPlacesA = strA.includes('.') ? strA.split('.')[1].length : 0;
    const decimalPlacesB = strB.includes('.') ? strB.split('.')[1].length : 0;
    
    // 计算总的小数位数
    const totalDecimals = decimalPlacesA + decimalPlacesB;
    
    // 将数字转换为整数进行计算
    const factor = Math.pow(10, Math.max(decimalPlacesA, decimalPlacesB));
    const numA = Math.round(a * factor);
    const numB = Math.round(b * factor);
    
    // 执行乘法并调整结果
    const result = (numA * numB) / (factor * factor);
    
    // 返回固定精度的结果，避免浮点误差
    return Number(result.toFixed(totalDecimals));
}
  /**
   * 除法
   * @param a
   * @param b
   * @returns {Number}
   */
  export const accDiv = (a, b)=> {
    // 检查除数是否为0
    if (b === 0) {
        throw new Error('除数不能为0');
    }
    
    // 将数字转换为字符串以分析小数位数
    const strA = a.toString();
    const strB = b.toString();
    
    // 获取小数点后的位数
    const decimalPlacesA = strA.includes('.') ? strA.split('.')[1].length : 0;
    const decimalPlacesB = strB.includes('.') ? strB.split('.')[1].length : 0;
    
    // 计算需要放大的倍数
    const maxDecimals = Math.max(decimalPlacesA, decimalPlacesB);
    const factor = Math.pow(10, maxDecimals);
    
    // 将数字转换为整数进行计算
    const numA = Math.round(a * factor);
    const numB = Math.round(b * factor);
    
    // 执行除法
    const result = numA / numB;
    
    // 计算结果应该保留的小数位数
    // 这里我们取一个合理的最大精度（比如15位），避免无限小数
    const precision = Math.min(15, decimalPlacesA + 6);
    
    // 返回固定精度的结果
    return Number(result.toFixed(precision));
}