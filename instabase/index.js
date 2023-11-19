import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()

// app.use(cors())
// const port=4000;

// app.listen(port,()=>{
//     console.log(`port : ${port}`);
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

// // app.get('/api', (req, res) => {
// //     res.json({ message: 'Hello World!' });
// // })

API_TOKEN = 'ZYUHL9YfHIcfW6jAalFFKQ87rn0aax'

API_BASE_URL = 'https://aihub.instabase.com/api'
API_HEADERS = {
    'Authorization': `Bearer ${API_TOKEN}`
}

FILENAMES = ["/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase/lo.jpeg"];
IB_INPUT_FILE_DIR = 'lpskawork_gmail.com/my-repo/fs/Instabase Drive/eruk/' 

const read_input_file=(filePath)=>{
    try{
       
        fs.readFile(filePath, null, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
          
            return(data);
          });
    }
    catch(err){
        console.log("error read_input_file");
    }
}

const upload_input_file=(input_file_dir, input_file_data, input_file_name)=>{
    console.log(`Uploading File ${input_file_name} ...`);
    url = `${API_BASE_URL}/v2/files/${IB_INPUT_FILE_DIR}${input_file_name}`;
    axios.put(url,)

}

Axios.get(`https://excuser-three.vercel.app/v1/excuse/${random}/`).then((res)=>{
            console.log(res.data[0]);
            setDataGet(res.data[0]);
        })