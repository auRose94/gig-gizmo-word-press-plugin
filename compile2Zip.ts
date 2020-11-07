import aZip from "adm-zip";
import * as fs from "fs";
import * as path from "path";

let blacklist = [
  /node_modules\/(?!bootstrap)/,
  /.git/,
  /.vscode/,
  /gig-gizmo-plugin.zip/,
  /compile2Zip.ts/,
  /package.json/,
  /package-lock.json/,
  /tsconfig.json/,
  /webpack.config.js/
];

type callback = (err: any, found: string[]) => void

function filewalker(dir: string, done: callback) {
  let results: string[] = [];

  fs.readdir(dir, (err: any, list: string[]) => {
    if (err) return done(err, []);

    var pending = list.length;

    if (!pending) return done(null, results);

    list.forEach(function (file: string) {
      file = path.resolve(dir, file);

      fs.stat(file, (_errr: any, stat: fs.Stats) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array [comment if you need to remove the directories from the array]
          //results.push(file);

          filewalker(file, (_err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);

          if (!--pending) done(null, results);
        }
      });
    });
  });
};

let rel = process.cwd() + "/";
console.log(rel);
filewalker(rel, (err, found) => {
  if (err) throw err;
  //console.log(found);

  var zip = new aZip();

  found.forEach((file) => {
    let match: RegExp | undefined = blacklist.find((item) => {
      return item.test(file);
    });
    if (!match) {
      let rPath = path.relative(rel, file);
      let rDir = path.dirname(rPath)
      if (rDir == ".") rDir = "";
      console.log(file, " -> ", rPath);
      zip.addLocalFile(file, rDir, path.basename(file));
    }
  });
  zip.writeZip("./gig-gizmo-plugin.zip");
});