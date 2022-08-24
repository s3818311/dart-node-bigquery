// Import the Google Cloud client library using default credentials
const { BigQuery } = require("@google-cloud/bigquery");

const auth = {
  keyFilename: "micro-enigma-359206-1dd3be2aaa78.json",
  projectId: "micro-enigma-359206",
};

const bigquery = new BigQuery(auth);
async function query() {
  const query = `SELECT * 
  FROM \`micro-enigma-359206.test_dataset.chirps_2022\` 
  WHERE \`date\` BETWEEN "2022.01.01" AND "2022.02.01" 
  ORDER BY \`date\``;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log("Rows:");
  rows.forEach((row) => console.log(row));
}

query();
