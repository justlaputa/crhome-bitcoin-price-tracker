// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
    input: 'background.js',
    output: {
        file: 'dist/background.js',
        format: 'iife'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
}