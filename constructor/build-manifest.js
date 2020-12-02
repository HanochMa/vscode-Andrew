import fs from "fs";
import path from "path";

import jsonFormat from "json-format";

import env from "./env.js";

const PATH_MANIFEST_DIRECTORY = path.resolve(env.path.source, "manifest");

function build() {
    let files = fs.readdirSync(PATH_MANIFEST_DIRECTORY);
    let manifest = {};
    files.forEach((fileName) => {
        let filePath = path.resolve(PATH_MANIFEST_DIRECTORY, fileName);
        let fileContent = JSON.parse(fs.readFileSync(filePath).toString());
        Object.assign(manifest, fileContent);
    });
    fs.writeFileSync(path.resolve(env.path.dist, "package.json"), jsonFormat(manifest, { type: "space", size: 4 }));
}

function watch() {
    build();
    fs.watch(PATH_MANIFEST_DIRECTORY, { recursive: true }, (evt) => {
        build();
    });
}

export default {
    build,
    watch
}