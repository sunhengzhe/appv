# appv
操作 app 版本的方法库

## Feature

### parseVersion

格式化 xx.xx.xx 格式的版本，返回 major、minor 和 patch。

#### Example

```js
appv.parseVersion('1.2.3') // { major: 1, minor: 2, patch: 3 }
appv.parseVersion('1.2') // { major: 1, minor: 2, patch: 0 }
appv.parseVersion('1') // { major: 1, minor: 0, patch: 0 }
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

## test

```js
npm test
```