// This file is used to enable local backend for Decap CMS
// It's not required for production, but helps with local development

window.CMS_MANUAL_INIT = true;

// Initialize the CMS manually with a custom config
window.initCMS = function() {
  window.CMS.init({
    config: {
      backend: {
        name: 'git-gateway',
      },
      local_backend: true,
      // The rest of the config is loaded from config.yml
    },
  });
};

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.initCMS();
});
