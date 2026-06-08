export default {
  // 使用 ts-jest 预设
  preset: 'ts-jest',
  // 测试环境：node 或 browser
  testEnvironment: 'node',
  // 支持的文件扩展名
  moduleFileExtensions: ['ts', 'js', 'json'],
  // 收集覆盖率的文件
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'  // 排除类型声明文件
  ]
};