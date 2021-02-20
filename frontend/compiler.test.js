import { pug2html, src2dist, is_pug_file } from "./compiler"

test("replace src to dist", () => {
  let path = "./src/index.pug"
  let output = "./dist/index.pug"
  let src_root = "src"
  let dist_root = "dist"
  expect(src2dist(path, src_root, dist_root)).toBe(output)

  path = "./src/pug/index.pug"
  output = "./dist/index.pug"
  src_root = "src/pug"
  dist_root = "dist"
  expect(src2dist(path, src_root, dist_root)).toBe(output)
})

test("replace pug to html", () => {
  let pug_file = "index.pug"
  let html_file = "index.html"
  expect(pug2html(pug_file)).toBe(html_file)
})

test("is this filePath pug or not ?", () => {
  let pug_files = [
    "index.pug",
    "./src//pug/index.pug",
    "./src/pug/components/input.pug",
    "./src/pug/layouts/common.pug",
  ]
  pug_files.forEach((pug_file) => {
    expect(is_pug_file(pug_file)).toBeTruthy()
  })

  let other_files = ["index.html", "./src/js/main.js", "./src/style/style.scss"]
  other_files.forEach((other_file) => {
    expect(is_pug_file(other_file)).toBeFalsy()
  })
})
