import fs from 'fs';
import path from 'path';

export default function build(options = { dist: './dist/assets/', target: './dist/'}){
    return {
        closeBundle(){
            fs.readdir(options.dist, (err, files) => {
                if(err) throw err;
                files.forEach(file => {
                  fs.copyFileSync(options.dist + file,options.target + 'artty.js');
                  fs.copyFileSync(options.dist + file,'C:\\Users\\ASUS\\Desktop\\lib\\artty.js');
                });
            });
        }
    }
}