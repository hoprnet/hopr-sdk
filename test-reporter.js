class TestReporter {
    constructor(globalConfig, options) {
        this.globalConfig = globalConfig;
        this.options = options;
    }

    onRunComplete(_, results) {
        const { threshold } = this.options;


        const relevantTestPaths = results.testResults
            .filter(testResult =>
                testResult.testFilePath.includes('/e2e/account.spec.ts') || testResult.testFilePath.includes('/e2e/aliases.spec.ts')
            );

        if (results.numFailedTests === 0 && results.numPendingTests === 0) {
            const duration = results.endTime - results.startTime;
            if (duration > threshold && relevantTestPaths.length > 0) {
                console.log(`Tests took ${duration / 1000} seconds.`);
            }
        }
    }
}

module.exports = TestReporter;
