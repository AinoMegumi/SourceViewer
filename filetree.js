const fs = require('fs');

module.exports = directory => {
    const listFiles = dir =>
        fs
            .readdirSync(dir, { withFileTypes: true })
            .flatMap(dirent =>
                dirent.isFile()
                    ? [`${dir}/${dirent.name}`]
                    : listFiles(`${dir}/${dirent.name}`)
            );
    return {
        files: listFiles(directory),
    };
};
