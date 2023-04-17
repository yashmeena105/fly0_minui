export const openInNewTab = (url) => {
  window.open(url, '', 'noreferrer');
};

export const getStage = () => {
  const currentUrl = window.location.href;
  if (currentUrl.includes('dev')) {
    return 'dev';
  }
  if (currentUrl.includes('localhost')) {
    return 'local';
  }
  return 'prod';
};

export const getHostUrl = () => {
  const currentUrl = window.location.origin;
  return currentUrl;
}