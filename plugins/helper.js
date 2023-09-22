// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
import fs from 'fs'
import Stream, { Readable } from 'stream'

 // @ts-ignore
const __filename = function filename(pathURL = import.meta, rmPrefix = os.platform() !== 'win32') { const path = (pathURL).url || (pathURL);return rmPrefix ? /file:\/\/\//.test(path) ? fileURLToPath(path) : path : /file:\/\/\//.test(path) ? path : pathToFileURL(path).href}

 // @ts-ignore
const __dirname = function dirname(pathURL) { const dir = __filename(pathURL, true); const regex = /\/$/; return regex.test(dir) ? dir : fs.existsSync(dir) && fs.statSync(dir).isDirectory() ? dir.replace(regex, '') : path.dirname(dir)}

 // @ts-ignore
const __require = function require(dir = import.meta) { const path = (dir).url || (dir); return createRequire(path)}
const checkFileExists = (file) => fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = global.Prefijo

// @ts-ignore
const saveStreamToFile = (stream, file) => new Promise((resolve, reject) => { const writable = stream.pipe(fs.createWriteStream(file)); writable.once('finish', () => { resolve(); writable.destroy()}); writable.once('error', () => { reject(); writable.destroy()})})

const kDestroyed = Symbol('kDestroyed');
const kIsReadable = Symbol('kIsReadable');
const isReadableNodeStream = (obj, strict = false) => { return !!( obj && typeof obj.pipe === 'function' && typeof obj.on === 'function' && ( !strict || (typeof obj.pause === 'function' && typeof obj.resume === 'function')) && (!obj._writableState || obj._readableState?.readable !== false) && (!obj._writableState || obj._readableState))}

const isNodeStream = (obj) => { return ( obj && ( obj._readableState || obj._writableState || (typeof obj.write === 'function' && typeof obj.on === 'function') || (typeof obj.pipe === 'function' && typeof obj.on === 'function')))}

const isDestroyed = (stream) => { if (!isNodeStream(stream)) return null; const wState = stream._writableState; const rState = stream._readableState; const state = wState || rState; return !!(stream.destroyed || stream[kDestroyed] || state?.destroyed)}

const isReadableFinished = (stream, strict) => { if (!isReadableNodeStream(stream)) return null; const rState = stream._readableState; if (rState?.errored) return false; if (typeof rState?.endEmitted !== 'boolean') return null; return !!( rState.endEmitted || (strict === false && rState.ended === true && rState.length === 0))}

const isReadableStream = (stream) => { if (typeof Stream.isReadable === 'function') return Stream.isReadable(stream); if (stream && stream[kIsReadable] != null) return stream[kIsReadable]; if (typeof stream?.readable !== 'boolean') return null; if (isDestroyed(stream)) return false; return ( isReadableNodeStream(stream) && !!stream.readable && !isReadableFinished(stream)) || stream instanceof fs.ReadStream || stream instanceof Readable;}

export default {
    __filename,
    __dirname,
    __require,
    checkFileExists,
    saveStreamToFile,
    isReadableStream,
    opts,
    // @ts-ignore
    prefix,
}