import fs from 'fs';
import path from 'path';

export default function build(options = { dist: './dist/assets/', target: './dist/', test: 'C:\\Users\\ASUS\\Desktop\\lib\\artty.js'}){
    return {
        closeBundle(){
            fs.readdir(options.dist, (err, files) => {
                if(err) throw err;
                files.forEach(file => {
                  fs.copyFileSync(options.dist + file,options.target + 'artty.js');
                  try{
                    if(fs.existsSync(options.test)) fs.unlinkSync(options.test);
                    fs.copyFileSync(options.dist + file,options.test);
                  }catch(e){ console.log("No test output specified!"); console.error(e)}
                });
            });
        }
    }
}