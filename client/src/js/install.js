// Get reference to the install button element
const butInstall = document.getElementById('buttonInstall');

// Handle the `beforeinstallprompt` event to prepare for PWA installation
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior which shows the install prompt automatically
  event.preventDefault();
  // Store the event for later use when the user clicks the install button
  window.deferredPrompt = event;
  // Make the install button visible by removing the 'hidden' class
  butInstall.classList.toggle('hidden', false);
});

// Add a click event listener to the install button
butInstall.addEventListener('click', async () => {
  // Retrieve the deferred install prompt event
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;  // If there's no event stored, exit the function
  }
  // Show the install prompt to the user
  promptEvent.prompt();
  // Clear the deferred prompt as it can only be used once
  window.deferredPrompt = null;
  // Hide the install button after the prompt is shown
  butInstall.classList.toggle('hidden', true);
});

// Listen for the `appinstalled` event, which is triggered when the app is installed
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt since the app has now been installed
  window.deferredPrompt = null;
  console.log('PWA was installed successfully');
});
