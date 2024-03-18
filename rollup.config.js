/**
 * config 文件：https://cn.rollupjs.org/command-line-interface/#configuration-files
 */

import rollupTypescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core'

export const config = {
    input: {
        utils: "src/index.ts",
    },
    // 必需 (可以是陣列，用於描述多個輸出)
    output: [
        {
            dir: 'dist',
            entryFileNames: '[name].mjs', // 将 bundle 保留为 ES 模块文件，适用于其他打包工具
            format: 'es',
            plugins: [terser()],
        },
        {
            name: 'RollupTsTemplate',
            dir: 'dist',
            entryFileNames: '[name].umd.js', // 通用模块定义规范，同时支持 amd，cjs 和 iife
            format: 'umd',
            plugins: [terser()],
        },
    ],
    plugins: [
        rollupTypescript({ tsconfig: "tsconfig.types.json" }),
        resolve(), // 使 Rollup 能解析 node_modules 模組
        commonjs(), // 使 Rollup 能將 CommonJS Module 轉換成 ES Module
        json(), // 使 Rollup 能解析 json
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            // babel 默认不支持 ts 需要手动添加
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
            ],
        }),
    ],
};

export default config;
