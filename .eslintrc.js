module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 强制使用一致的缩进 [强制 switch 语句中的 case 子句的缩进级别, 强制 var 声明的缩进级别, 强制多行属性链的缩进]
    'indent': ['error', 4, { SwitchCase: 1, VariableDeclarator: 'first', MemberExpression: 'off' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
