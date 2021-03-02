/**
 * 型定義
 * @typedef {import('pug').Options} Options
 */
import { promises as fs } from "fs"
import fse from "fs-extra"
import pug from "pug"
import glob from "glob"

/**
 * pug -> html
 *
 * @param {String} input_file path to the input file
 * @param {String} output_file path to the output file
 * @param {Options} options options of pug
 * @example
 * // example without options
 * pug_compiler("./src/index.pug", "./dist/index.html")
 * // example with options
 * pug_compiler("./src/pug/index.pug", "./dist/index.html", { pretty: true })
 */
export const pug_compiler = async (input_file, output_file, options = {}) => {
  try {
    const file_status = await fs.lstat(input_file)
    if (file_status.isFile() && is_pug_file(input_file)) {
      const input_pug = await fs.readFile(input_file, "utf-8")
      const html = pug.render(input_pug, options)
      await fse.outputFile(output_file, html)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * 拡張子を確認してpugファイルかどうかを判定
 *
 * @param {string} file
 * @returns {boolean}
 */
export const is_pug_file = (file) => {
  const regexp_pug = /.*\.pug$/
  return regexp_pug.test(file)
}

/**
 *
 * @param {String} path
 * @param {String} src_root
 * @param {String} dist_root
 * @return {String}
 * @example
 * src2dist("./src/index.pug")
 * // => ./dist/index.pug
 * src2dist("./src/pug/pages/blog.pug")
 * // => ./dist/pages/blog.pug
 */
export const src2dist = (path, src_root = "src", dist_root = "dist") => {
  return path.replace(src_root, dist_root)
}

/**
 * 拡張子をpugからhtmlに変更
 * @param {string} file
 */
export const pug2html = (file) => {
  return file.replace(".pug", ".html")
}

export const get_dist_file_path = (path, src_root, dist_root) => {
  path = src2dist(path, src_root, dist_root)
  path = pug2html(path)
  return path
}

const main = async () => {
  console.log("start 🚀")

  glob("./src/pug/**/*.pug", (err, files) => {
    files.forEach((file) => {
      if (file.match(/(components|layouts)/)) return
      const dist_file = get_dist_file_path(file, "src/pug")
      /**
       * @type Options
       */
      const options = { pretty: true, filename: file }
      console.log(`${file} -> ${dist_file}`)
      pug_compiler(file, dist_file, options)
    })
  })
  console.log("completed 🎉")
}

main()
