const COMPARE_TYPE = {
  EQ: 'isEq',
  GT: 'isGt',
  GTE: 'isGte',
  LT: 'isLt',
  LTE: 'isLte',
};

/**
 * 格式化版本号，如 ‘1.1.1’
 * @param {*} str 版本号
 */
const parseVersion = (str = '') => {
  const verArr = (str.split('.') || []).slice(0, 3);

  const [major = 0, minor = 0, patch = 0] = verArr.map(item => parseInt(item, 10));

  return {
    major,
    minor,
    patch,
  };
};

class AppVersion {
  constructor() {
    // 对外暴露比较方法
    Object.values(COMPARE_TYPE).forEach((method) => {
      this[method] = (a, b) => this.compare(method, a, b);
    });
  }

  /**
   * 通用比较方法
   * @param {*} type 比较类型 COMPARE_TYPE 中定义
   * @param {*} a 基准版本
   * @param {*} b 对比版本
   */
  compare(type, a, b) {
    const aVer = this.parseVersion(a);
    const bVer = this.parseVersion(b);

    // 等于
    if (type === COMPARE_TYPE.EQ) {
      return aVer.major === bVer.major &&
        aVer.minor === bVer.minor &&
        aVer.patch === bVer.patch;
    }

    // 大于
    if (type === COMPARE_TYPE.GT) {
      return (aVer.major > bVer.major) ||
        (aVer.major === bVer.major && aVer.minor > bVer.minor) ||
        (aVer.major === bVer.major && aVer.minor === bVer.minor && aVer.patch > bVer.patch);
    }

    // 小于
    if (type === COMPARE_TYPE.LT) {
      return !(this.compare(COMPARE_TYPE.EQ, a, b) || this.compare(COMPARE_TYPE.GT, a, b));
    }

    // 大于等于
    if (type === COMPARE_TYPE.GTE) {
      return !this.compare(COMPARE_TYPE.LT, a, b);
    }

    // 小于等于
    if (type === COMPARE_TYPE.LTE) {
      return !this.compare(COMPARE_TYPE.GT, a, b);
    }

    return false;
  }
}

AppVersion.prototype.parseVersion = parseVersion;

module.exports = new AppVersion();
