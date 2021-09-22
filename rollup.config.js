import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve("./src/index.ts"),
  output: [
    { file: "./dist/bundle.cjs.js", format: "cjs" },
    { file: "./dist/bundle.esm.js", format: "esm" },
    { file: "./dist/bundle.umd.js", format: "umd", name: "myCanvas" },
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};
