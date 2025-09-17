const fs = require('fs').promises;
const path = require('path');

async function detectFlakiness() {
  const reportDir = path.join(__dirname, '../allure-results');
  let flakyTests = {};

  try {
    const files = await fs.readdir(reportDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const report = JSON.parse(await fs.readFile(path.join(reportDir, file)));
        const testName = report.name;
        const status = report.status;

        if (!flakyTests[testName]) {
          flakyTests[testName] = { passes: 0, fails: 0 };
        }
        if (status === 'passed') {
          flakyTests[testName].passes += 1;
        } else if (status === 'failed') {
          flakyTests[testName].fails += 1;
        }
      }
    }

    console.log('Flakiness Report:');
    for (const [testName, stats] of Object.entries(flakyTests)) {
      const totalRuns = stats.passes + stats.fails;
      const failRate = (stats.fails / totalRuns * 100).toFixed(2);
      if (stats.fails > 0) {
        console.log(`${testName}: ${failRate}% failure rate (${stats.fails} fails, ${stats.passes} passes)`);
      }
    }
  } catch (error) {
    console.error('Error analyzing flakiness:', error);
  }
}

detectFlakiness();