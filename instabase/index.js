import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";

// const app = express()

// app.use(cors())
const port = 4000;

// app.listen(port,()=>{
//     console.log(`port : ${port}`);
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

// // app.get('/api', (req, res) => {
// //     res.json({ message: 'Hello World!' });
// // })
const APP_NAME = "DocChain";
const API_TOKEN = "ZYUHL9YfHIcfW6jAalFFKQ87rn0aax";

const API_BASE_URL = "https://aihub.instabase.com/api";
const API_HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
};

const FILENAMES =
  "/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase/lo.jpeg";
const IB_INPUT_FILE_DIR =
  "lpskawork_gmail.com/my-repo/fs/Instabase Drive/eruk/";

const read_input_file = (filePath) => {
  try {
    fs.readFile(filePath, null, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      return data.toString();
    });
  } catch (err) {
    console.log("error read_input_file");
  }
};

const upload_input_file = (
  input_file_dir,
  input_file_data,
  input_file_name
) => {
  console.log(`Uploading File ${input_file_name} ...`);
  const url = `${API_BASE_URL}/v2/files/${IB_INPUT_FILE_DIR}${input_file_name}`;
  const upload_resp = axios
    .put(url, input_file_data, { headers: API_HEADERS })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error("Errorrrrrrr");
    });

  if (upload_resp.status_code >= 200 && upload_resp.status_code < 300) {
    console.log(`File successfully uploaded at ${input_file_dir}`);
  }
  return upload_resp;
};

// input_filepaths = FILENAMES;

// for (input_filepath in input_filepaths){
//     input_file_data = read_input_file(input_filepath)
//     upload_input_file(IB_INPUT_FILE_DIR, input_file_data, input_filepath)
// }

const run_app = (input_file_dir, app_name) => {
  console.log("runnning app");
  const run_app_payload = {
    input_dir: input_file_dir,
    name: app_name,
  };
  fs.writeFileSync(
    "/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase/lo.json",
    JSON.stringify(run_app_payload, null, 2),
    "utf8"
  );
  const url = `${API_BASE_URL}/v2/zero-shot-idp/projects/app/run`;
  axios
    .post(url, run_app_payload, { headers: API_HEADERS })
    .then((res) => {
      const jobId = res.data.job_id;

      console.log("Job ID:", jobId);

      fs.writeFileSync(
        "/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase",
        JSON.stringify(res.data, null, 2),
        "utf8"
      );
      return jobId;
    })
    .catch((error) => {
      console.error("Errorrrrrrr");
    });
};

const get_results = (job_id) => {
  const url = `${API_BASE_URL}/v1/jobs/status?type=flow&job_id=${job_id}`;
  const job_status = "";
  while (job_status != "DONE") {
    axios
      .get(url, { headers: API_HEADERS })
      .then((res) => {
        const _state = res.data.state;
        console.log("State: ", _state);
        fs.writeFileSync(
          "/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase",
          JSON.stringify(res.data, null, 2),
          "utf8"
        );
        return _state;
      })
      .catch((error) => {
        console.error("Errorrrrrrr");
      });
  }

  console.log("Downloading Results");

  /////////////////////////////////////////////////

  // code left

  /////////////////////////////////////////////
};

const input_filepaths = FILENAMES
for (var input_filepath in input_filepaths){
    const input_file_data = read_input_file("/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase/lo.jpeg")
    upload_input_file(IB_INPUT_FILE_DIR, input_file_data, input_filepath)
}
const job_id = run_app(IB_INPUT_FILE_DIR, APP_NAME)
const results = get_results(job_id)
print(results)




// read_input_file(
//   "/home/ubuntu/project/e-suraksha/esuraksha-cu/instabase/lo.jpeg"
// );
