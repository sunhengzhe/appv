# appv

[![NPM](https://nodei.co/npm/appv.png)](https://nodei.co/npm/appv/)

[![Build Status](https://travis-ci.org/sunhengzhe/appv.svg?branch=master)](https://travis-ci.org/sunhengzhe/appv)

操作 app 版本的方法库

## Install

```
npm i appv # or yarn install
```

## Usage

```js
const appv = require('appv');

appv.parseVersion('1.2.3') // { major: 1, minor: 2, patch: 3 }
```

## Feature

### parseVersion

格式化 xx.xx.xx 格式的版本，返回 major、minor 和 patch。

#### Example

```js
appv.parseVersion('1.2.3') // { major: 1, minor: 2, patch: 3 }
appv.parseVersion('1.2') // { major: 1, minor: 2, patch: 0 }
appv.parseVersion('1') // { major: 1, minor: 0, patch: 0 }
```

### valid

判断是否是合法版本号（x.x.x），提供 `isValidVersion` 方法。

#### Example

```js
appv.isValidVersion('1.2.3') // true
appv.isValidVersion('abc') // false
```

### compare

比较两个版本号，提供 `isEq`、`isGt`、`isGte`、`isLt`、`isLte` 等方法。

#### Example

参考 [appv.test.js](./test/appv.test.js)

```js
appv.isEq('1.2.3', '1.2.3') // true
appv.isEq('1.2.3', '3.2.1') // false
appv.isEq('1.2.0', '1.2') // true
appv.isGt('1.2.3', '1.2.2') // true
appv.isGte('1', '0.11.12') // true
appv.isLt('1.21.21', '2.1') // true
```

### range

判断版本是否在一个区间，提供 `isBetween` 方法。

#### Example

参考 [appv.test.js](./test/appv.test.js)

```js
appv.isBetween('1.2.3', ['1', '2']) // true
```

### compute

操作版本，提供 `patch`、`minor`、`major` 方法。

#### Example

参考 [appv.test.js](./test/appv.test.js)

```js
appv.patch('0.0.1') // 0.0.2
appv.minor('0.0.1') // 0.1.0
appv.major('0.0.1') // 1.0.0
```

## test

```js
npm test
```
