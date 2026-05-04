import emailjs from '@emailjs/browser';

const TO_EMAIL = 'alansan96.cy@gmail.com';
const LOCATION_ENDPOINT = 'https://ipapi.co/json/';
const LOCATION_TIMEOUT = 3000;

let isSendingVisitNotification = false;
let wasVisitNotificationSent = false;

const fallback = (value) => value || 'No disponible';

const getConnectionInfo = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    return 'No disponible';
  }

  return [
    connection.effectiveType ? `tipo: ${connection.effectiveType}` : '',
    connection.downlink ? `bajada: ${connection.downlink} Mbps` : '',
    connection.rtt ? `rtt: ${connection.rtt} ms` : '',
  ].filter(Boolean).join(' | ') || 'No disponible';
};

const getBrowserData = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    visited_at: new Date().toLocaleString('es-AR', { timeZoneName: 'short' }),
    page_url: window.location.href,
    page_title: document.title || 'Portfolio',
    referrer: document.referrer || 'Directo / sin referrer',
    browser_language: fallback(navigator.language),
    browser_languages: navigator.languages ? navigator.languages.join(', ') : 'No disponible',
    browser_timezone: fallback(timezone),
    platform: fallback(navigator.platform),
    user_agent: fallback(navigator.userAgent),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen_size: `${window.screen.width}x${window.screen.height}`,
    connection: getConnectionInfo(),
  };
};

const getApproximateLocation = async () => {
  if (!window.fetch || !window.AbortController) {
    return {};
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), LOCATION_TIMEOUT);

  try {
    const response = await fetch(LOCATION_ENDPOINT, {
      signal: controller.signal,
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.warn('No se pudo obtener la ubicacion aproximada de la visita.', error);
    return {};
  } finally {
    window.clearTimeout(timeout);
  }
};

const buildVisitParams = (browserData, locationData) => {
  const city = fallback(locationData.city);
  const region = fallback(locationData.region);
  const country = fallback(locationData.country_name || locationData.country);
  const visitorLocation = `${city}, ${region}, ${country}`;
  const coordinates = locationData.latitude && locationData.longitude
    ? `${locationData.latitude}, ${locationData.longitude}`
    : 'No disponible';

  const message = [
    'Recibiste una nueva visita en el portfolio.',
    '',
    `Fecha: ${browserData.visited_at}`,
    `URL: ${browserData.page_url}`,
    `Titulo: ${browserData.page_title}`,
    `Referrer: ${browserData.referrer}`,
    `Ubicacion aproximada: ${visitorLocation}`,
    `IP: ${fallback(locationData.ip)}`,
    `ISP/Org: ${fallback(locationData.org)}`,
    `Coordenadas aproximadas: ${coordinates}`,
    `Zona horaria por IP: ${fallback(locationData.timezone)}`,
    `Zona horaria del navegador: ${browserData.browser_timezone}`,
    `Idioma: ${browserData.browser_language}`,
    `Idiomas: ${browserData.browser_languages}`,
    `Plataforma: ${browserData.platform}`,
    `Pantalla: ${browserData.screen_size}`,
    `Viewport: ${browserData.viewport}`,
    `Conexion: ${browserData.connection}`,
    `User Agent: ${browserData.user_agent}`,
  ].join('\n');

  return {
    to_email: TO_EMAIL,
    subject: 'Nueva visita en el portfolio',
    name: 'Notificacion de visita',
    email: TO_EMAIL,
    message,
    visited_at: browserData.visited_at,
    page_url: browserData.page_url,
    page_title: browserData.page_title,
    referrer: browserData.referrer,
    visitor_location: visitorLocation,
    visitor_ip: fallback(locationData.ip),
    visitor_org: fallback(locationData.org),
    visitor_coordinates: coordinates,
    visitor_timezone: fallback(locationData.timezone),
    browser_timezone: browserData.browser_timezone,
    browser_language: browserData.browser_language,
    browser_languages: browserData.browser_languages,
    platform: browserData.platform,
    screen_size: browserData.screen_size,
    viewport: browserData.viewport,
    connection: browserData.connection,
    user_agent: browserData.user_agent,
  };
};

export const notifyVisit = async () => {
  if (isSendingVisitNotification || wasVisitNotificationSent) {
    return;
  }

  const serviceId = process.env.VUE_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.VUE_APP_EMAILJS_TEMPLATE_ID_VISIT || process.env.VUE_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VUE_APP_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.log(templateId);
    console.warn('Faltan variables de EmailJS para notificar visitas.');
    return;
  }

  isSendingVisitNotification = true;

  try {
    const browserData = getBrowserData();
    const locationData = await getApproximateLocation();
    const templateParams = buildVisitParams(browserData, locationData);

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    wasVisitNotificationSent = true;
  } catch (error) {
    console.error('No se pudo enviar la notificacion de visita.', error);
  } finally {
    isSendingVisitNotification = false;
  }
};
