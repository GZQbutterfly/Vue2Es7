let glob = require('glob'),
    path = require('path');

function getEntry(globPath) {
    let basename,
        tmp,
        pathname,
        jsMap = {},
        htmlMap = {};

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(3);
        tmp.pop();
        pathname = tmp.join('/') + '/' + basename;
        jsMap[pathname] = entry;//path.join(__dirname, '.'+ entry); //path.join(__dirname, '../dist/'+ pathname + '.js');
        htmlMap[pathname] = path.join(__dirname, '../dist/'+ pathname + '.html');
    });

    return {
        jsMap,
        htmlMap
    };
}

// let webEntries = getEntry('./src/page/app/*/*.js');
// let cmsEntries = getEntry('./src/page/cms/*/*.js');
//
// console.log('webEntries  ', webEntries);
// console.log('cmsEntries  ', cmsEntries);



module.exports = {getEntry}
