module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: ['html'],
  // add your custom rules here
  'rules': {
    // 分号
    'semi': 0,
    //引号
    'quotes': 0,
    // 最大长度100
    'max-len': 1,
    //省略逗号
    'comma-dangle': 0,
    // { obj }
    'object-curly-spacing': 0,
    'space-before-function-paren': 0,
    //缩进
    'indent': 0,
    // 未定义
    'no-undef': 1,
    //声明后未使用变量
    'no-unused-vars': 0,

    'import/no-extraneous-dependencies': 0,
    // 三元嵌套
    'no-nested-ternary': 1,
    //箭头函数
    // 'arrow-body-style': 1,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 2
      : 0
  }
}
