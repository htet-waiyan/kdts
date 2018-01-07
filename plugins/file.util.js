const fs = require('fs');
const path = require('path')

// convert to promise
exports.createCtrls = () => {
  const dir = '/app/out';
  fs.readdir(dir, (err,files) => {
      if(err) throw err;

      files.forEach((f) => {
          console.log(f.endsWith('.ctrl'))
          if(!f.endsWith('.ctrl')) {

            const filename = path.join(dir,f);
            console.log('Writing control files of '+filename);

            fs.writeFile(filename+'.ctrl','',(err) => {
                if(err) throw err;
            })
          }
      })
  })
}
