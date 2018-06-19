const COMPARE_TYPE = {
  EQ: 'isEq',
  GT: 'isGt',
  GTE: 'isGte',
  LT: 'isLt',
  LTE: 'isLte',
};

/**
 * 是否是合法的版本号
 * @param {String} version 版本
 */
const isValidVersion = (version) => {
  if (typeof version !== 'string') {
    return false;
  }

  return /\d+(\.\d+)?(\.\d+)?/.test(version);
};

/**
 * 格式化版本号，如 ‘1.1.1’
 * @param {*} str 版本号
 */
const parseVersion = (str) => {
  if (!isValidVersion(str)) {
    throw new Error(`${str} is not a valid version`);
  }

  const verArr = str.split('.').slice(0, 3);

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
    if (!isValidVersion(a)) {
      throw new Error(`${a} is not a valid version`);
    }

    if (!isValidVersion(b)) {
      throw new Error(`${b} is not a valid version`);
    }

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

  /**
   * 返回 version 是否在闭合 range 之间。
   * @param {String} version 版本
   * @param {Array} range 版本区间
   */
  isBetween(version, range = []) {
    if (!isValidVersion(version)) {
      throw new Error(`${version} is not a valid version`);
    }

    if (range.length === 1) {
      return this.isGte(version, range[0]);
    }

    if (range.length === 2) {
      return this.isGte(version, range[0]) && this.isLte(version, range[1]);
    }

    return false;
  }

  /**
   * 添加 patch
   * @param {String} version 版本号
   */
  patch(version) {
    if (!isValidVersion(version)) {
      throw new Error(`${version} is not a valid version`);
    }

    const { major, minor, patch } = this.parseVersion(version);

    return `${major}.${minor}.${parseInt(patch, 10) + 1}`;
  }

  /**
   * 添加 minor
   * @param {String} version 版本号
   */
  minor(version) {
    if (!isValidVersion(version)) {
      throw new Error(`${version} is not a valid version`);
    }

    const { major, minor } = this.parseVersion(version);

    return `${major}.${parseInt(minor, 10) + 1}.0`;
  }

  /**
   * 添加 major
   * @param {String} version 版本号
   */
  major(version) {
    if (!isValidVersion(version)) {
      throw new Error(`${version} is not a valid version`);
    }

    const { major } = this.parseVersion(version);

    return `${parseInt(major, 10) + 1}.0.0`;
  }
}

AppVersion.prototype.parseVersion = parseVersion;
AppVersion.prototype.isValidVersion = isValidVersion;

module.exports = new AppVersion();
