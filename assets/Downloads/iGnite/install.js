const { exec } = require('child_process');

module.exports = (sdks) => {
  // Install Homebrew
  exec('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', (error) => {
    if (error) {
      console.error(`Error installing Homebrew: ${error.message}`);
      return;
    }

    // Install selected SDKs
    sdks.forEach(sdk => {
      switch (sdk) {
        case 'anaconda':
          exec('brew install --cask anaconda', handleExec);
          break;
        case 'vscode':
          exec('brew install --cask visual-studio-code', handleExec);
          break;
        case 'xcode':
          exec('xcode-select --install', handleExec);
          break;
        // Add more cases for other SDKs
      }
    });
  });
};

function handleExec(error, stdout, stderr) {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}
