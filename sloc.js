import fs from 'fs'
import path from 'path'
import sloc from 'sloc'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const include = [
    path.resolve(__dirname, 'packages', '_docs-control/src'),
    path.resolve(__dirname, 'packages', 'control-app/src'),
    path.resolve(__dirname, 'packages', 'control-docs/src'),
    path.resolve(__dirname, 'packages', 'control-docs-ts/src'),
    path.resolve(__dirname, 'packages', 'control-kit/src'),
    path.resolve(__dirname, 'packages', 'control-md/src'),
    path.resolve(__dirname, 'packages', 'control-routes/src'),
]

let scannner = function(dir, root, fileList = []) {
    let files = fs.readdirSync(dir)
    files.forEach(function(file) {
        let abs = path.join(dir, file)
        if(fs.statSync(abs).isDirectory()) {
            if(abs.indexOf('node_modules') === -1) {
                fileList = scannner(abs, root, fileList)
            }
        } else {
            let included = false
            include.forEach(allowed => {
                if(abs.indexOf(allowed) !== -1) {
                    included = true
                }
            })

            if(included) {
                fileList.push(abs)
            }
        }
    })
    return fileList
}

const directoryPath = path.join(__dirname, 'packages')
const files = scannner(directoryPath, directoryPath, [])
const stats = {
    files: 0,
    total: 0,
    source: 0,
    comment: 0,
    single: 0,
    block: 0,
    mixed: 0,
    empty: 0,
    todo: 0,
    blockEmpty: 0,
}
files.forEach((file) => {
    const code = fs.readFileSync(file, 'utf8')
    let fileStats = sloc(code, 'js')
    stats.files++
    stats.total += fileStats.total
    stats.source += fileStats.source
    stats.comment += fileStats.comment
    stats.single += fileStats.single
    stats.block += fileStats.block
    stats.mixed += fileStats.mixed
    stats.empty += fileStats.empty
    stats.todo += fileStats.todo
    stats.blockEmpty += fileStats.blockEmpty
})
console.log(stats)
