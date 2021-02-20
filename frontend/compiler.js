import { promises as fs } from "fs"
import fse from "fs-extra"
import pug from "pug"
import { Options } from "pug"
import path from "path"
import glob from "glob"

let src = "./src/index.pug"
let dist = "./dist/index.html"

/**
 * pug -> html
 * @param {String} file
 * @param {String} dist
 * @param {Options} option
 */
export const pug_compiler = async (
  file = "./src/index.pug",
  dist = "./dist",
  option
) => {
  try {
    const input_pug = await fse.readFile(file, "utf-8")
    const output_html = pug.render(input_pug, option)
    await fse.outputFile(dist, output_html)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 拡張子を確認してpugファイルかどうかを判定
 * @param {string} file
 */
export const is_pug_file = (file) => {
  const regexp_pug = /.*\.pug$/
  return regexp_pug.test(file)
}

/**
 * パスを適当なdist配下のディレクトリパスに変換する
 * ./src/index.pug -> ./dist/index.pug
 * ./src/pug/pages/blog.pug -> ./dist/pages/blog.pug
 * @param {String} path
 * @param {String} src_root
 * @param {String} dist_root
 * @return {String}
 */
export const src2dist = (path, src_root = "src", dist_root = "dist") => {
  return path.replace(src_root, dist_root)
}

export const pug2html = (file) => {
  return file.replace(".pug", ".html")
}

export const get_dist = (path, src_root, dist_root) => {
  path = src2dist(path, src_root, dist_root)
  path = pug2html(path)
  return path
}

const test = async () => {
  console.log("start 🚀")
  /**
   * @type Options
   */
  const option = { pretty: true }

  glob("./src/pug/**/*.pug", (err, files) => {
    files.forEach((file) => {
      if (file.match(/(components|layouts)/)) return
      const dir = src2dist(file, "src/pug", "dist")
      pug_compiler(file, dir, option)
    })
  })
  console.log("completed 🎉")
}
