import { spawn } from 'child_process';

const showHiddenFiles = () => {
  spawn('defaults write com.apple.finder AppleShowAllFiles YES', [], { shell: true });
  spawn('killall Finder', [], { shell: true });
};

const hideHiddenFiles = () => {
  spawn('defaults write com.apple.finder AppleShowAllFiles NO', [], { shell: true });
  spawn('killall Finder', [], { shell: true });
};

document.getElementById('show').addEventListener('click', showHiddenFiles);
document.getElementById('hide').addEventListener('click', hideHiddenFiles);
